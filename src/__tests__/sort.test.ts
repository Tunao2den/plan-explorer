import { describe, it, expect } from 'vitest';
import { sortItems } from '../lib/sort';
import type { Item } from '../types/Item';

const mockItems: Item[] = [
  { id: 1, type: 'meal', title: 'A', kcal: 650, tags: [] },
  { id: 2, type: 'training', title: 'B', kcal: 450, tags: [] },
  { id: 3, type: 'meal', title: 'C', kcal: 420, tags: [] },
  { id: 4, type: 'training', title: 'D', kcal: 500, tags: [] },
];

describe('sortItems', () => {
  it('sorts ascending by kcal', () => {
    const result = sortItems(mockItems, 'asc');
    expect(result.map(i => i.kcal)).toEqual([420, 450, 500, 650]);
  });

  it('sorts descending by kcal', () => {
    const result = sortItems(mockItems, 'desc');
    expect(result.map(i => i.kcal)).toEqual([650, 500, 450, 420]);
  });

  it("should handle empty array", () => {
    const result = sortItems([], "asc");
    expect(result).toEqual([]);
  });

  it("should handle array with one element", () => {
    const single = [{ id: 1, type: 'meal', title: 'only item', kcal: 650, tags: [] }];
    const result = sortItems(single, "desc");
    expect(result).toEqual(single);
  });
});
