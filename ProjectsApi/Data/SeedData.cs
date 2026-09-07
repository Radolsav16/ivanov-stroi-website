using ProjectsApi.Models;

namespace ProjectsApi.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext context)
    {
        // Ако вече има проекти, не добавяме отново
        if (context.Projects.Any())
        {
            return;
        }

        var projects = new List<Project>
        {
            new Project
            {
                Title = "Ремонт на апартамент",
                Slug = "remont-na-apartament",
                Description = "Цялостен ремонт на апартамент.",
                Location = "София",
                Year = 2025,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                Images = new List<ProjectImage>
                {
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/apartment-1.jpg",
                        AltText = "Ремонтиран апартамент",
                        DisplayOrder = 1,
                        IsCover = true
                    },
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/apartment-2.jpg",
                        AltText = "Дневна стая",
                        DisplayOrder = 2,
                        IsCover = false
                    },
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/apartment-3.jpg",
                        AltText = "Кухня",
                        DisplayOrder = 3,
                        IsCover = false
                    }
                }
            },

            new Project
            {
                Title = "Ремонт на баня",
                Slug = "remont-na-banya",
                Description = "Модерен ремонт на баня.",
                Location = "София",
                Year = 2025,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                Images = new List<ProjectImage>
                {
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/bathroom-1.jpg",
                        AltText = "Ремонтирана баня",
                        DisplayOrder = 1,
                        IsCover = true
                    },
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/bathroom-2.jpg",
                        AltText = "Баня детайл",
                        DisplayOrder = 2,
                        IsCover = false
                    }
                }
            },

            new Project
            {
                Title = "Жилищна сграда",
                Slug = "zhilishtna-sgrada",
                Description = "Строителство и довършителни работи на жилищна сграда.",
                Location = "Пловдив",
                Year = 2024,
                IsFeatured = false,
                CreatedAt = DateTime.UtcNow,
                Images = new List<ProjectImage>
                {
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/building-1.jpg",
                        AltText = "Жилищна сграда",
                        DisplayOrder = 1,
                        IsCover = true
                    },
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/building-2.jpg",
                        AltText = "Фасада",
                        DisplayOrder = 2,
                        IsCover = false
                    },
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/building-3.jpg",
                        AltText = "Интериор",
                        DisplayOrder = 3,
                        IsCover = false
                    }
                }
            },

            new Project
            {
                Title = "Ремонт на офис",
                Slug = "remont-na-ofis",
                Description = "Цялостен ремонт и обновяване на офис пространство.",
                Location = "София",
                Year = 2024,
                IsFeatured = false,
                CreatedAt = DateTime.UtcNow,
                Images = new List<ProjectImage>
                {
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/office-1.jpg",
                        AltText = "Офис пространство",
                        DisplayOrder = 1,
                        IsCover = true
                    },
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/office-2.jpg",
                        AltText = "Офис интериор",
                        DisplayOrder = 2,
                        IsCover = false
                    }
                }
            },

            new Project
            {
                Title = "Ремонт на къща",
                Slug = "remont-na-kashta",
                Description = "Цялостен ремонт на къща и дворно пространство.",
                Location = "Банкя",
                Year = 2023,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                Images = new List<ProjectImage>
                {
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/house-1.jpg",
                        AltText = "Ремонтирана къща",
                        DisplayOrder = 1,
                        IsCover = true
                    },
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/house-2.jpg",
                        AltText = "Дневна",
                        DisplayOrder = 2,
                        IsCover = false
                    },
                    new ProjectImage
                    {
                        ImageUrl = "https://example.com/house-3.jpg",
                        AltText = "Двор",
                        DisplayOrder = 3,
                        IsCover = false
                    }
                }
            }
        };

        context.Projects.AddRange(projects);

        context.SaveChanges();
    }
}