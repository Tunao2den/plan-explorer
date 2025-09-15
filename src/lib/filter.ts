export type Item = {
  id: number;
  type: string;
  title: string;
  kcal: number;
  tags: string[];
};

export type TypeFilter = 'all' | 'meal' | 'training';

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


