import { useMemo } from "react";
import useDebouncedValue from "./useDebouncedValue.js";

export default function useFilteredLocations(topic, query, filters = {}) {
  const debouncedQuery = useDebouncedValue(query, 150);
  return useMemo(() => {
    if (!topic) return [];
    const q = debouncedQuery.trim().toLowerCase();
    return topic.locations.filter((loc) => {
      if (q && !loc.name.toLowerCase().includes(q)) return false;
      if (filters.district?.length && !filters.district.includes(loc.district)) return false;
      if (filters.category?.length && !filters.category.includes(loc.category)) return false;
      return true;
    });
  }, [topic, debouncedQuery, filters]);
}