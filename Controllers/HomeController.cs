using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TaskApp.Models;

namespace TaskApp.Controllers;

public class HomeController : Controller
{

    public IActionResult Privacy()
    {
        return View();
    }

    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: Display the form to the user
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(TaskItem user)
    {
        if (ModelState.IsValid)
        {
            // Add to database
            _context.TaskItems.Add(user);
            _context.SaveChanges();
            
            // Redirect to a success page or index
            return RedirectToAction("Index");
        }
        // If validation fails, return the form again
        return View(user);
    }

    // GET: Display list of users
    public IActionResult Index()
    {
        ViewData["mydata"] = "Tasks";
        var users = _context.TaskItems.ToList();
        return View(users);
    }

    

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
