using Microsoft.EntityFrameworkCore;
using Portfolio.API.Models;

namespace Portfolio.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<GuestbookEntry> GuestbookEntries => Set<GuestbookEntry>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<ProjectView> ProjectViews => Set<ProjectView>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProjectView>()
            .HasIndex(p => p.Slug)
            .IsUnique();

        modelBuilder.Entity<BlogPost>().HasData(
            new BlogPost
            {
                Id = 1,
                Title = "Why I Built My Portfolio as a Full-Stack App",
                Excerpt = "Instead of a static HTML page, I used React, ASP.NET Core, and SQLite to make the portfolio itself a demonstration of my skills.",
                Content = "<p>Most developer portfolios are static sites. There is nothing wrong with that but I wanted mine to do more.</p><h2>The Idea</h2><p>If a portfolio is supposed to show what you can build, why not make the portfolio itself a full-stack application? That is exactly what I did.</p><h2>The Stack</h2><p>I chose <code>React + Vite</code> for the frontend because it is the industry standard for modern SPAs. For the backend, I went with <code>ASP.NET Core Web API</code> since C# is my strongest language. <code>SQLite</code> keeps the database simple and portable. And <code>Docker Compose</code> ties it all together.</p><h2>What It Demonstrates</h2><p>This portfolio has a working guestbook, a contact form that saves to a database, a blog served from an API, and project view tracking. Every feature is a real full-stack implementation not a mockup.</p><p>When an employer looks at this site, they are not just reading about what I can do. They are using it.</p>",
                Category = "Development",
                PublishedAt = new DateTime(2026, 4, 1)
            },
            new BlogPost
            {
                Id = 2,
                Title = "Containerizing a .NET + React App with Docker Compose",
                Excerpt = "A walkthrough of how I containerized this portfolio frontend and backend into a single Docker Compose setup.",
                Content = "<p>Docker makes deployment consistent and reproducible. Here is how I set up this portfolio.</p><h2>The Architecture</h2><p>Two containers: one for the React frontend served via Nginx, one for the ASP.NET Core API. Docker Compose orchestrates both.</p><h2>Why It Matters</h2><p>Anyone can clone the repo, run <code>docker-compose up</code>, and have the entire application running. No installing .NET, no installing Node just Docker.</p><p>This is exactly the kind of workflow that DevOps teams use in production. Building it into a personal project shows I understand real-world deployment practices.</p>",
                Category = "DevOps",
                PublishedAt = new DateTime(2026, 4, 5)
            },
            new BlogPost
            {
                Id = 3,
                Title = "Packet Analysis with Wireshark: What I Learned",
                Excerpt = "Notes from my cybersecurity lab work analyzing network traffic and identifying patterns with Wireshark.",
                Content = "<p>Wireshark is one of the most powerful tools for understanding what is happening on a network. Here is what I learned using it in my lab.</p><h2>Setting Up</h2><p>I set up a small lab network with virtual machines and captured traffic between them. This let me see real HTTP requests, DNS lookups, and TCP handshakes.</p><h2>Key Takeaways</h2><p>Seeing network protocols in action made them real. Reading about TCP three-way handshakes is one thing watching the SYN, SYN-ACK, ACK happen in real time is another.</p><p>I also learned to filter traffic effectively, identify suspicious patterns, and document findings all skills that translate directly to security and IT support roles.</p>",
                Category = "Cybersecurity",
                PublishedAt = new DateTime(2026, 4, 8)
            }
        );
    }
}
