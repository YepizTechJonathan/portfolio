using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Data;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _db;
    public ContactController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] ContactMessage msg)
    {
        if (string.IsNullOrWhiteSpace(msg.Name) || string.IsNullOrWhiteSpace(msg.Email) || string.IsNullOrWhiteSpace(msg.Message))
            return BadRequest("All fields are required.");

        msg.Id = 0;
        msg.Status = "new";
        msg.CreatedAt = DateTime.UtcNow;

        _db.ContactMessages.Add(msg);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Message received." });
    }
}
