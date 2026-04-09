using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GuestbookController : ControllerBase
{
    private readonly AppDbContext _db;
    public GuestbookController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<GuestbookEntry>>> GetAll()
    {
        return await _db.GuestbookEntries
            .OrderByDescending(e => e.CreatedAt)
            .Take(50)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<GuestbookEntry>> Create([FromBody] GuestbookEntry entry)
    {
        if (string.IsNullOrWhiteSpace(entry.Name) || string.IsNullOrWhiteSpace(entry.Message))
            return BadRequest("Name and message are required.");

        entry.Id = 0;
        entry.Name = entry.Name.Trim()[..Math.Min(entry.Name.Trim().Length, 50)];
        entry.Message = entry.Message.Trim()[..Math.Min(entry.Message.Trim().Length, 500)];
        entry.CreatedAt = DateTime.UtcNow;

        _db.GuestbookEntries.Add(entry);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = entry.Id }, entry);
    }
}
