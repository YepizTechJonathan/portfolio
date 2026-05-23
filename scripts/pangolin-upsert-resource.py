#!/usr/bin/env python3
"""Create or update Pangolin public resources for this site.

This script is intentionally dependency-free so GitHub Actions can run it with
the stock Python install. It uses Pangolin's Integration API.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any


class PangolinError(RuntimeError):
    pass


def env(name: str, default: str | None = None, *, required: bool = False) -> str:
    value = os.environ.get(name, default)
    if required and not value:
        raise PangolinError(f"Missing required environment variable: {name}")
    return value or ""


def truthy(value: str, default: bool = False) -> bool:
    if value == "":
        return default
    return value.strip().lower() in {"1", "true", "yes", "y", "on"}


class PangolinClient:
    def __init__(self, api_url: str, api_key: str, *, timeout: int = 30) -> None:
        self.api_url = api_url.rstrip("/")
        self.api_key = api_key
        self.timeout = timeout

    def request(self, method: str, path: str, body: dict[str, Any] | None = None) -> dict[str, Any]:
        url = f"{self.api_url}/{path.lstrip('/')}"
        data = None
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json",
        }
        if body is not None:
            data = json.dumps(body).encode("utf-8")
            headers["Content-Type"] = "application/json"

        req = urllib.request.Request(url, data=data, headers=headers, method=method.upper())
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as response:
                raw = response.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as exc:
            raw = exc.read().decode("utf-8", "replace")
            raise PangolinError(f"{method.upper()} {path} failed with HTTP {exc.code}: {raw[:1200]}") from exc
        except urllib.error.URLError as exc:
            raise PangolinError(f"{method.upper()} {path} failed: {exc}") from exc

        if not raw:
            return {}
        try:
            parsed = json.loads(raw)
        except json.JSONDecodeError as exc:
            raise PangolinError(f"{method.upper()} {path} returned non-JSON: {raw[:1200]}") from exc

        if parsed.get("error") is True or parsed.get("success") is False:
            raise PangolinError(f"{method.upper()} {path} returned an API error: {json.dumps(parsed)[:1200]}")
        return parsed


def data(payload: dict[str, Any]) -> Any:
    return payload.get("data", payload)


def first_list(payload: dict[str, Any], preferred_keys: tuple[str, ...]) -> list[dict[str, Any]]:
    wrapped = data(payload)
    if isinstance(wrapped, list):
        return [item for item in wrapped if isinstance(item, dict)]
    if isinstance(wrapped, dict):
        for key in preferred_keys:
            value = wrapped.get(key)
            if isinstance(value, list):
                return [item for item in value if isinstance(item, dict)]
        for value in wrapped.values():
            if isinstance(value, list):
                return [item for item in value if isinstance(item, dict)]
    return []


def api_data(payload: dict[str, Any]) -> dict[str, Any]:
    wrapped = data(payload)
    return wrapped if isinstance(wrapped, dict) else {}


def get_id(item: dict[str, Any], *keys: str) -> Any:
    for key in keys:
        if key in item and item[key] not in (None, ""):
            return item[key]
    return None


def domain_base_candidates(full_domain: str) -> list[str]:
    parts = full_domain.split(".")
    return [".".join(parts[i:]) for i in range(len(parts))]


def find_domain(
    client: PangolinClient,
    org_id: str,
    full_domain: str,
    explicit_domain_id: str,
    explicit_base_domain: str,
) -> tuple[str, str, str | None]:
    response = client.request("GET", f"/org/{org_id}/domains?limit=1000&offset=0")
    domains = first_list(response, ("domains",))
    if not domains:
        raise PangolinError("No Pangolin domains returned by the API.")

    selected: dict[str, Any] | None = None
    if explicit_domain_id:
        selected = next((d for d in domains if str(get_id(d, "domainId", "id")) == explicit_domain_id), None)
        if not selected:
            raise PangolinError(f"PANGOLIN_DOMAIN_ID={explicit_domain_id} was not found in this org.")
    elif explicit_base_domain:
        selected = next((d for d in domains if d.get("baseDomain") == explicit_base_domain), None)
        if not selected:
            raise PangolinError(f"PANGOLIN_DOMAIN_BASE={explicit_base_domain} was not found in this org.")
    else:
        bases = set(domain_base_candidates(full_domain))
        matches = [d for d in domains if d.get("baseDomain") in bases]
        matches.sort(key=lambda d: len(d.get("baseDomain", "")), reverse=True)
        selected = matches[0] if matches else None
        if not selected:
            available = ", ".join(sorted(str(d.get("baseDomain")) for d in domains if d.get("baseDomain")))
            raise PangolinError(
                f"No Pangolin domain matches {full_domain}. Set PANGOLIN_DOMAIN_ID explicitly. Available: {available}"
            )

    domain_id = str(get_id(selected, "domainId", "id"))
    base_domain = str(selected.get("baseDomain"))
    domain_type = str(selected.get("type", ""))
    subdomain = None if full_domain == base_domain else full_domain[: -(len(base_domain) + 1)]

    if domain_type == "cname" and full_domain != base_domain:
        raise PangolinError(
            f"Domain {base_domain} is a CNAME domain, so it can only route itself. "
            f"Use a wildcard/NS domain for {full_domain}, or create/select a CNAME domain for that exact FQDN."
        )

    return domain_id, base_domain, subdomain or None


def find_site(client: PangolinClient, org_id: str, site_id: str, site_name: str) -> int:
    site_query = site_id or site_name
    if site_id:
        try:
            return int(site_id)
        except ValueError:
            # Bitwarden/GitHub may provide a Pangolin niceId/name instead of the
            # numeric siteId. Fall through to API lookup rather than failing.
            site_query = site_id

    if not site_query:
        raise PangolinError("Set PANGOLIN_SITE_ID or PANGOLIN_SITE_NAME so the script knows which Pangolin site owns the target.")

    response = client.request(
        "GET",
        f"/org/{org_id}/sites?{urllib.parse.urlencode({pageSize: 100, page: 1, query: site_query})}",
    )
    sites = first_list(response, ("sites",))
    selected = next(
        (
            s
            for s in sites
            if s.get("name") == site_query
            or s.get("niceId") == site_query
            or str(s.get("siteId")) == site_query
            or str(s.get("id")) == site_query
        ),
        None,
    )
    if not selected:
        raise PangolinError(f"Pangolin site {site_query!r} was not found. Use PANGOLIN_SITE_ID if names are ambiguous.")
    return int(get_id(selected, "siteId", "id"))

def list_resources(client: PangolinClient, org_id: str, query: str) -> list[dict[str, Any]]:
    params = urllib.parse.urlencode({"pageSize": 100, "page": 1, "query": query})
    response = client.request("GET", f"/org/{org_id}/resources?{params}")
    return first_list(response, ("resources",))


def find_resource(client: PangolinClient, org_id: str, full_domain: str) -> dict[str, Any] | None:
    for resource in list_resources(client, org_id, full_domain):
        if resource.get("fullDomain") == full_domain or resource.get("full_domain") == full_domain:
            return resource
    return None


def upsert_resource(
    client: PangolinClient,
    org_id: str,
    full_domain: str,
    resource_name: str,
    domain_id: str,
    subdomain: str | None,
    ssl: bool,
    dry_run: bool,
) -> int:
    resource = find_resource(client, org_id, full_domain)

    if resource:
        resource_id = int(get_id(resource, "resourceId", "id"))
        print(f"Updating Pangolin resource {full_domain} (resourceId={resource_id})")
        if not dry_run:
            client.request(
                "POST",
                f"/resource/{resource_id}",
                {"name": resource_name, "enabled": True, "ssl": ssl, "domainId": domain_id, "subdomain": subdomain},
            )
        return resource_id

    print(f"Creating Pangolin resource {full_domain}")
    if dry_run:
        return -1

    created = client.request(
        "PUT",
        f"/org/{org_id}/resource",
        {
            "name": resource_name,
            "http": True,
            "subdomain": subdomain,
            "domainId": domain_id,
            "protocol": "tcp",
        },
    )
    resource_id = int(get_id(api_data(created), "resourceId", "id"))
    client.request("POST", f"/resource/{resource_id}", {"enabled": True, "ssl": ssl})
    return resource_id


def upsert_target(
    client: PangolinClient,
    resource_id: int,
    site_id: int,
    target_host: str,
    target_port: int,
    target_method: str,
    dry_run: bool,
) -> None:
    if resource_id < 0:
        print(f"Would create target {target_method}://{target_host}:{target_port}")
        return

    response = client.request("GET", f"/resource/{resource_id}/targets")
    targets = first_list(response, ("targets",))
    matching = next(
        (
            t
            for t in targets
            if int(t.get("siteId", 0)) == site_id
            and str(t.get("ip")) == target_host
            and int(t.get("port", 0)) == target_port
        ),
        None,
    )

    body = {
        "siteId": site_id,
        "ip": target_host,
        "port": target_port,
        "method": target_method,
        "enabled": True,
        "path": "/",
        "pathMatchType": "prefix",
    }

    if matching:
        target_id = int(get_id(matching, "targetId", "id"))
        print(f"Updating target {target_method}://{target_host}:{target_port} (targetId={target_id})")
        if not dry_run:
            client.request("POST", f"/target/{target_id}", body)
        return

    print(f"Creating target {target_method}://{target_host}:{target_port}")
    if not dry_run:
        client.request("PUT", f"/resource/{resource_id}/target", body)


def verify_public_url(full_domain: str, timeout: int) -> None:
    url = f"https://{full_domain}/"
    req = urllib.request.Request(url, method="GET", headers={"User-Agent": "YepizTechDeployCheck/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as response:
        status = response.status
    if status < 200 or status >= 400:
        raise PangolinError(f"Public verification failed for {url}: HTTP {status}")
    print(f"Verified public URL {url}: HTTP {status}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Upsert Pangolin public HTTP resources and targets.")
    parser.add_argument("--dry-run", action="store_true", help="Resolve config and print intended changes without writing.")
    parser.add_argument("--verify", action="store_true", help="Verify each https://domain/ after the API changes.")
    args = parser.parse_args()

    try:
        api_url = env("PANGOLIN_API_URL", required=True)
        api_key = env("PANGOLIN_API_KEY", required=True)
        org_id = env("PANGOLIN_ORG_ID", required=True)
        resource_domains = [d.strip() for d in env("PANGOLIN_RESOURCE_DOMAINS", "yepiz.tech").split(",") if d.strip()]
        resource_name = env("PANGOLIN_RESOURCE_NAME", "Yepiz Tech")
        explicit_domain_id = env("PANGOLIN_DOMAIN_ID")
        explicit_base_domain = env("PANGOLIN_DOMAIN_BASE")
        site_id_raw = env("PANGOLIN_SITE_ID")
        site_name = env("PANGOLIN_SITE_NAME")
        target_host = env("PANGOLIN_TARGET_HOST", "yepiz-tech-prod-web")
        target_port = int(env("PANGOLIN_TARGET_PORT", "8083"))
        target_method = env("PANGOLIN_TARGET_METHOD", "http")
        ssl = truthy(env("PANGOLIN_ENABLE_SSL", "true"), default=True)
        verify = args.verify or truthy(env("PANGOLIN_VERIFY_PUBLIC", "false"))

        if not resource_domains:
            raise PangolinError("PANGOLIN_RESOURCE_DOMAINS must contain at least one domain.")

        client = PangolinClient(api_url, api_key)
        site_id = find_site(client, org_id, site_id_raw, site_name)

        for full_domain in resource_domains:
            domain_id, base_domain, subdomain = find_domain(
                client, org_id, full_domain, explicit_domain_id, explicit_base_domain
            )
            print(
                f"Resolved {full_domain}: domainId={domain_id}, baseDomain={base_domain}, "
                f"subdomain={subdomain if subdomain is not None else '<root>'}, siteId={site_id}"
            )
            resource_id = upsert_resource(
                client, org_id, full_domain, resource_name, domain_id, subdomain, ssl, args.dry_run
            )
            upsert_target(client, resource_id, site_id, target_host, target_port, target_method, args.dry_run)

            if verify and not args.dry_run:
                # Give Pangolin/Traefik a moment to reload routing after API writes.
                time.sleep(5)
                verify_public_url(full_domain, timeout=20)

        return 0
    except PangolinError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
