FROM mcr.microsoft.com/dotnet/sdk:10.0 AS tests
WORKDIR /src

COPY ProjectsApi/ProjectsApi.csproj ProjectsApi/
COPY ProjectsApi.Tests/ProjectsApi.Tests.csproj ProjectsApi.Tests/
RUN dotnet restore ProjectsApi.Tests/ProjectsApi.Tests.csproj

COPY ProjectsApi/ ProjectsApi/
COPY ProjectsApi.Tests/ ProjectsApi.Tests/
RUN dotnet test ProjectsApi.Tests/ProjectsApi.Tests.csproj --no-restore --nologo
