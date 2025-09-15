import type { Item } from "../types/Item";
import type { TypeFilter } from "../types/TypeFilter";

// Mirrors the filtered useMemo logic from DataTable
export function filterItems(items: Item[], query: string, typeFilter: TypeFilter): Item[] {
  const q = query.trim().toLowerCase();
  let result = items;
  if (q) {
    result = result.filter((it) => it.title.toLowerCase().includes(q));
  }
  if (typeFilter !== 'all') {
    result = result.filter((it) => it.type.toLowerCase() === typeFilter);
  }
  return result;
}


