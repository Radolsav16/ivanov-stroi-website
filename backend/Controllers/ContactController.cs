using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(ContactRequest request)
    {
        _context.ContactRequests.Add(request);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            message = "Contact request received successfully."
        });
    }
}