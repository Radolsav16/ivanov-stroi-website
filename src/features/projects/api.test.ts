import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchProjects, getProjectsApiUrl } from "./api";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("projects API", () => {
  it("normalizes the configured projects URL", () => {
    vi.stubEnv("VITE_PROJECTS_API_URL", "https://api.example.com/api/projects/");
    expect(getProjectsApiUrl()).toBe("https://api.example.com/api/projects");
  });

  it("returns an empty collection when no endpoint is configured", async () => {
    vi.stubEnv("VITE_PROJECTS_API_URL", "");
    await expect(fetchProjects()).resolves.toEqual([]);
  });
});
