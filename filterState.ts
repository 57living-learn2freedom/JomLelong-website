export interface FilterState {
  keyword: string;
  state: string;
  propertyType: string;
  priceRange: string;
}

export const DEFAULT_FILTERS: FilterState = {
  keyword: "",
  state: "All States",
  propertyType: "All Types",
  priceRange: "Any Price",
};

export function filtersToSearchParams(
  filters: FilterState,
  page = 1
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.keyword.trim()) params.set("keyword", filters.keyword.trim());
  if (filters.state !== "All States") params.set("state", filters.state);
  if (filters.propertyType !== "All Types") {
    params.set("propertyType", filters.propertyType);
  }
  if (filters.priceRange !== "Any Price") {
    params.set("priceRange", filters.priceRange);
  }
  if (page > 1) params.set("page", String(page));

  return params;
}

export function searchParamsToFilters(
  params: URLSearchParams
): FilterState {
  return {
    keyword: params.get("keyword") ?? "",
    state: params.get("state") ?? "All States",
    propertyType: params.get("propertyType") ?? "All Types",
    priceRange: params.get("priceRange") ?? "Any Price",
  };
}

export function getPageFromSearchParams(params: URLSearchParams): number {
  const page = parseInt(params.get("page") ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}
