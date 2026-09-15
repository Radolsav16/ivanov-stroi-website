import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fetchProjects, type Project } from "./api";
import { CLOUDINARY_BASE_URL } from "../../utils/url";
import { OptimizedImage } from "../../shared/ui/OptimizedImage";
import Container from "../../shared/ui/Container";
import Slider from "../../components/slider/Slider";

function resolveImageUrl(imageUrl: string) {
  return imageUrl.startsWith("http") ? imageUrl : `${CLOUDINARY_BASE_URL}${imageUrl}`;
}

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchProjects(controller.signal)
      .then((items) => setProjects(items))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setProjects([]);
      });
    return () => controller.abort();
  }, []);

  if (projects === null) {
    return (
      <section aria-busy="true" aria-label="Зареждане на проекти" className="bg-gray-950 py-20 sm:py-28">
        <Container>
          <div className="h-10 w-72 max-w-full animate-pulse rounded-xl bg-white/10" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-80 animate-pulse rounded-3xl bg-white/5" />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (projects.length === 0) return <Slider showGalleryLink={false} />;

  return (
    <section className="bg-gray-950 py-20 sm:py-28">
      <Container>
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">Последни проекти</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Резултати, които остават</h2>
          </div>
          <Link to="/contact-us" className="group inline-flex items-center gap-2 font-bold text-amber-500">
            Свържете се с нас <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const cover = project.images.find((image) => image.isCover) ?? project.images[0];
            return (
              <article key={project.id} className="overflow-hidden rounded-3xl border border-white/10 bg-gray-900/80">
                {cover && (
                  <OptimizedImage
                    url={resolveImageUrl(cover.imageUrl)}
                    alt={cover.altText || project.title}
                    width={900}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="h-56 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">{project.location} · {project.year}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">{project.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
