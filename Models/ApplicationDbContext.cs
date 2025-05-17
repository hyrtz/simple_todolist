using Microsoft.EntityFrameworkCore;
using TaskApp.Models;

public class ApplicationDbContext : DbContext
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
      : base(options)
  {
  }

  // Define your DbSet properties (tables) here
  public DbSet<TaskItem> TaskItems { get; set; }
  public DbSet<CompletedTaskItem> CompletedTaskItems { get; set; }

  public DbSet<HiddenTaskItem> HiddenTaskItems { get; set; }


  // protected override void OnModelCreating(ModelBuilder modelBuilder)
  // {
  //     modelBuilder.Entity<TaskItem>().ToTable("taskitems");
  // }

  
}


