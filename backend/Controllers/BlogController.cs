using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly AppDbContext _db;
    public BlogController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<BlogPost>>> GetAll()
    {
        return await _db.BlogPosts
            .OrderByDescending(p => p.PublishedAt)
            .Select(p => new BlogPost
            {
                Id = p.Id,
                Title = p.Title,
                Excerpt = p.Excerpt,
                Category = p.Category,
                PublishedAt = p.PublishedAt
            })
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BlogPost>> GetById(int id)
    {
        var post = await _db.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        return post;
    }
}
