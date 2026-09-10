import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchProjects, getProjectsApiUrl } from "./api";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("projects API", () => {
  it("derives its URL from the contact endpoint", () => {
    vi.stubEnv("VITE_PROJECTS_API_URL", "");
    vi.stubEnv("VITE_CONTACT_FORM_ENDPOINT", "https://api.example.com/api/contact");

    expect(getProjectsApiUrl()).toBe("https://api.example.com/api/projects");
  });

  it("returns an empty collection when no endpoint is configured", async () => {
    vi.stubEnv("VITE_PROJECTS_API_URL", "");
    vi.stubEnv("VITE_CONTACT_FORM_ENDPOINT", "");

    await expect(fetchProjects()).resolves.toEqual([]);
  });
});
