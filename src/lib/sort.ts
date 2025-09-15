import type { Item } from "../types/Item";
import type { SortOrder } from "../types/SortOrder";

export function sortItems(items: Item[], order: SortOrder): Item[] {
  const copy = [...items];
  copy.sort((a, b) => (order === 'asc' ? a.kcal - b.kcal : b.kcal - a.kcal));
  return copy;
}


