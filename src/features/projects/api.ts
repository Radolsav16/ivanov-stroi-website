import { requestJson } from "../../shared/api/http";

export type ProjectImage = {
  id: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isCover: boolean;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  year: number;
  isFeatured: boolean;
  createdAt: string;
  images: ProjectImage[];
};

type ProjectsResponse = {
  items: Project[];
};

export function getProjectsApiUrl() {
  const configured = import.meta.env.VITE_PROJECTS_API_URL?.trim();
  return configured ? configured.replace(/\/$/, "") : "";
}

export async function fetchProjects(signal?: AbortSignal) {
  const endpoint = getProjectsApiUrl();
  if (!endpoint) return [];

  const payload = await requestJson<ProjectsResponse>(`${endpoint}?page=1&pageSize=24`, {
    headers: { Accept: "application/json" },
    signal,
  });
  return Array.isArray(payload.items) ? payload.items : [];
}
