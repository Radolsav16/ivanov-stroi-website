import { describe, expect, it } from "vitest";
import { services as serviceCards } from "../components/services/data";
import { services as serviceDetails } from "../pages/service/data";
import { servicePaths, serviceSlugs } from "./serviceSlugs";
import { serviceGuides } from "../pages/service/guides";

describe("service catalog", () => {
  it("uses every canonical slug exactly once", () => {
    expect(Object.keys(serviceDetails)).toEqual(serviceSlugs);
    expect(servicePaths).toEqual(serviceSlugs.map((slug) => `/services/${slug}`));
  });

  it("keeps service cards aligned with their detail pages", () => {
    expect(serviceCards).toHaveLength(serviceSlugs.length);

    for (const card of serviceCards) {
      expect(card.title).toBe(serviceDetails[card.id].title);
      expect(card.href).toBe(`/services/${card.id}`);
    }
  });

  it("provides useful guide content and valid internal links for every service", () => {
    expect(Object.keys(serviceGuides)).toEqual(serviceSlugs);

    for (const slug of serviceSlugs) {
      const guide = serviceGuides[slug];

      expect(guide.decisions.length).toBeGreaterThanOrEqual(4);
      expect(guide.preparation.length).toBeGreaterThanOrEqual(4);
      expect(guide.faq.length).toBeGreaterThanOrEqual(2);
      expect(guide.related.length).toBeGreaterThanOrEqual(3);
      expect(guide.related).not.toContain(slug);

      for (const relatedSlug of guide.related) {
        expect(serviceSlugs).toContain(relatedSlug);
      }
    }
  });
});
