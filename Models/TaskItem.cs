using System.ComponentModel.DataAnnotations;

namespace TaskApp.Models;

public class TaskItem
{
  public int Id { get; set; }

  [Required]
  public string TaskName { get; set; }

  [Required]
  public string Priority { get; set; }

  [Required]
  public string Category { get; set; }
}