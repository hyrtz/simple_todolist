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
}


// xampp db
/*
table name: taskitems
CREATE TABLE `taskitems` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `TaskName` varchar(255) DEFAULT NULL,
  `Priority` varchar(255) DEFAULT NULL,
  `Category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

*/
