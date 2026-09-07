using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace backend.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        optionsBuilder.UseSqlServer(
            "Server=LENOVO-LOQ-2025\\SQLEXPRESS;Database=IvanStroiDb;Trusted_Connection=True;TrustServerCertificate=True;"
        );

        return new AppDbContext(optionsBuilder.Options);
    }
}