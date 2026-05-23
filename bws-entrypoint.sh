#!/bin/bash
set -e

echo "Fetching secrets from Bitwarden..."
export BWS_ACCESS_TOKEN="${BWS_ACCESS_TOKEN}"

export PPFS_JWT_KEY=$(bws secret get cd8c3ae4-30cc-4db9-b151-b39a000d526d --output json | jq -r '.value')
export PPFS_ADMIN_EMAIL=$(bws secret get 9666445c-d70f-4077-931d-b39a000d63c4 --output json | jq -r '.value')
export PPFS_ADMIN_PASSWORD=$(bws secret get 2d1087f3-6c40-426d-aebe-b39a000d73a6 --output json | jq -r '.value')
export PPFS_JWT_ISSUER=$(bws secret get d805e869-b71e-44ad-abef-b39a000dce77 --output json | jq -r '.value')
export PPFS_JWT_AUDIENCE=$(bws secret get eb2c4dd3-d20e-48ca-adc9-b39a000ddd99 --output json | jq -r '.value')

echo "Secrets loaded successfully!"
echo "Starting backend application..."
exec dotnet DotnetApi.dll