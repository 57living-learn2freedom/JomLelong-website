import { PROPERTIES } from "./data";
import { PRICE_RANGES } from "./constants";
import type { FilterState } from "./filterState";

function matchesKeyword(
  property: (typeof PROPERTIES)[number],
  keyword: string
): boolean {
  const query = keyword.trim().toLowerCase();
  if (!query) return true;

  const searchable = [
    property.title,
    property.address,
    property.area,
    property.state,
    property.postcode,
    property.type,
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(query);
}

export function filterProperties(filters: FilterState) {
  const priceRange = PRICE_RANGES.find((r) => r.label === filters.priceRange);

  return PROPERTIES.filter((property) => {
    const stateMatch =
      filters.state === "All States" || property.state === filters.state;
    const typeMatch =
      filters.propertyType === "All Types" ||
      property.type === filters.propertyType;
    const priceMatch =
      !priceRange ||
      (property.reservePrice >= priceRange.min &&
        property.reservePrice <= priceRange.max);
    const keywordMatch = matchesKeyword(property, filters.keyword);

    return stateMatch && typeMatch && priceMatch && keywordMatch;
  });
}
