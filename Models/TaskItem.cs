using System;

namespace TaskApp.Models;

public class TaskItem
{
  public int Id { get; set; }

  public string TaskName { get; set; }

  public string Priority { get; set; }

  public string Category { get; set; }

}
