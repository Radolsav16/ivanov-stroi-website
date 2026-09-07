import { describe, expect, it } from "vitest";
import { services as serviceCards } from "../components/services/data";
import { services as serviceDetails } from "../pages/service/data";
import { servicePaths, serviceSlugs } from "./serviceSlugs";

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
});
