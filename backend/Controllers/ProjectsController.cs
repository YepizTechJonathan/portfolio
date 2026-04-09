using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProjectsController(AppDbContext db) => _db = db;

    [HttpGet("views")]
    public async Task<ActionResult<List<ProjectView>>> GetViews()
    {
        return await _db.ProjectViews.ToListAsync();
    }

    [HttpPost("{slug}/view")]
    public async Task<ActionResult> TrackView(string slug)
    {
        var view = await _db.ProjectViews.FirstOrDefaultAsync(v => v.Slug == slug);
        if (view == null)
        {
            view = new ProjectView { Slug = slug, Count = 1 };
            _db.ProjectViews.Add(view);
        }
        else
        {
            view.Count++;
        }
        await _db.SaveChangesAsync();
        return Ok(new { slug = view.Slug, count = view.Count });
    }
}
