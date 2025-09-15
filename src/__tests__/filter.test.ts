import { describe, it, expect } from 'vitest';
import { filterItems } from '../lib/filter';
import type { Item } from '../types/Item';

const items: Item[] = [
  { id: 1, type: 'meal', title: 'Chicken & Rice', kcal: 650, tags: ['high-protein', 'simple'] },
  { id: 2, type: 'training', title: 'Intervals 6x400m', kcal: 450, tags: ['running', 'track'] },
  { id: 3, type: 'meal', title: 'Oats & Berries', kcal: 420, tags: ['breakfast', 'fiber'] },
  { id: 4, type: 'training', title: 'Tempo 30 min', kcal: 500, tags: ['running', 'tempo'] },
];

describe('filterItems', () => {
  it('returns all items when query empty and filter all', () => {
    const result = filterItems(items, '', 'all');
    expect(result).toHaveLength(4);
  });

  it('filters by title substring case-insensitively', () => {
    const result = filterItems(items, 'chicken', 'all');
    expect(result.map(i => i.id)).toEqual([1]);
  });

  it('filters by type when filter is not all', () => {
    const result = filterItems(items, '', 'meal');
    expect(result.map(i => i.type)).toEqual(['meal', 'meal']);
  });

  it('combines title and type filters', () => {
    const result = filterItems(items, 'oats', 'meal');
    expect(result.map(i => i.id)).toEqual([3]);
  });

  it('returns empty when no matches', () => {
    const result = filterItems(items, 'pizza', 'meal');
    expect(result).toHaveLength(0);
  });
});


