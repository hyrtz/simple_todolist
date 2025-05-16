using Microsoft.AspNetCore.Mvc;

namespace TaskApp.Controllers;

public class TestController : Controller
{
    private readonly ApplicationDbContext _context;
    
    public TestController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public IActionResult Index()
    {
        // Test query
        var data = _context.TaskItems.ToList();
        return View(data);
    }
}