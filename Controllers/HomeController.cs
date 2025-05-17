using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TaskApp.Models;

namespace TaskApp.Controllers;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        ViewData["mydata"] = "Tasks";
        ViewData["hiddenTask"] = "Hidden Tasks";
        var tasks = _context.TaskItems.ToList();
        return View(tasks);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(TaskItem task)
    {
        if (ModelState.IsValid)
        {
            _context.TaskItems.Add(task);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        var tasks = _context.TaskItems.ToList();
        return View("Index", tasks);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult CreateAjax(TaskItem task)
    {
        if (ModelState.IsValid && !string.IsNullOrEmpty(task.TaskName))
        {
            _context.TaskItems.Add(task);
            _context.SaveChanges();
            return Json(new { success = true, taskId = task.Id });
        }
        return Json(new { success = false, message = "Invalid task data" });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Delete(int id)
    {
        var task = _context.TaskItems.Find(id);
        if (task != null)
        {
            _context.TaskItems.Remove(task);
            _context.SaveChanges();
        }
        return RedirectToAction("Index");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Edit(TaskItem updatedTask)
    {
        var task = _context.TaskItems.Find(updatedTask.Id);
        if (task != null && ModelState.IsValid)
        {
            task.TaskName = updatedTask.TaskName;
            task.Priority = updatedTask.Priority;
            task.Category = updatedTask.Category;
            _context.SaveChanges();
        }
        return RedirectToAction("Index");
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult MarkAsComplete([FromBody] TaskIdModel model)
    {
        if (model == null || model.id <= 0)
        {
            return Json(new { success = false, message = "Invalid task ID" });
        }

        var task = _context.TaskItems.Find(model.id);
        if (task != null)
        {
            var completedTask = new CompletedTaskItem
            {
                TaskName = task.TaskName,
                Priority = task.Priority,
                Category = task.Category
            };

            try
            {
                _context.CompletedTaskItems.Add(completedTask);
                _context.TaskItems.Remove(task);
                _context.SaveChanges();
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        return Json(new { success = false, message = "Task not found" });
    }

    public IActionResult GetCompletedTasks()
    {
        var completedTasks = _context.CompletedTaskItems.ToList();
        return PartialView("_CompletedTasks", completedTasks);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult HideTask([FromBody] TaskIdModel model)
    {
        if (model == null || model.id <= 0)
        {
            return Json(new { success = false, message = "Invalid task ID" });
        }

        var task = _context.TaskItems.Find(model.id);
        if (task != null)
        {
            var hiddenTask = new HiddenTaskItem
            {
                TaskName = task.TaskName,
                Priority = task.Priority,
                Category = task.Category
            };

            try
            {
                _context.HiddenTaskItems.Add(hiddenTask);
                _context.TaskItems.Remove(task);
                _context.SaveChanges();
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        return Json(new { success = false, message = "Task not found" });
    }

    // Model for task ID
    public class TaskIdModel
    {
        public int id { get; set; }
    }

    public IActionResult GetHiddenTasks()
    {
        var hiddenTasks = _context.HiddenTaskItems.ToList();
        return PartialView("_HiddenTasks", hiddenTasks);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult RestoreHiddenTask(int id)
    {
        var hiddenTask = _context.HiddenTaskItems.Find(id);
        if (hiddenTask != null)
        {
            var task = new TaskItem
            {
                TaskName = hiddenTask.TaskName,
                Priority = hiddenTask.Priority,
                Category = hiddenTask.Category
            };
            _context.TaskItems.Add(task);
            _context.HiddenTaskItems.Remove(hiddenTask);
            _context.SaveChanges();
        }
        return RedirectToAction("Index");
    }


    // Task Filter
    [HttpPost]
    public IActionResult FilterTasks([FromBody] FilterModel filter)
    {
        if (filter == null)
        {
            return Json(new { success = false, message = "Invalid filter data" });
        }

        // Start with all tasks
        var query = _context.TaskItems.AsQueryable();

        // Apply priority filters if any are selected
        if (filter.Priorities != null && filter.Priorities.Count != 0)
        {
            query = query.Where(t => filter.Priorities.Contains(t.Priority));
        }

        // Apply category filters if any are selected
        if (filter.Categories != null && filter.Categories.Count != 0)
        {
            query = query.Where(t => filter.Categories.Contains(t.Category));
        }

        // Get the filtered tasks
        var filteredTasks = query.ToList();

        // Return partial view with filtered tasks
        return PartialView("_TaskList", filteredTasks);
    }

    // Add this model class for filtering tasks
    public class FilterModel
    {
        public List<string> Priorities { get; set; } = [];
        public List<string> Categories { get; set; } = [];
    }

}