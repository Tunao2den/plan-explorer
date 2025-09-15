'use client';

import { useMemo, useState } from "react";
import styles from "../page.module.css";
import data from "../lib/intern-case-2.json";

type Item = {
  id: number;
  type: string;
  title: string;
  kcal: number;
  tags: string[];
};

type SortOrder = 'asc' | 'desc';
type TypeFilter = 'all' | 'meal' | 'training';

export default function DataTable() {
  const items = (data as { items: Item[] }).items;
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [selected, setSelected] = useState<Item | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = items;
    if (q) {
      result = result.filter((it) => it.title.toLowerCase().includes(q));
    }
    if (typeFilter !== 'all') {
      result = result.filter((it) => it.type.toLowerCase() === typeFilter);
    }
    return result;
  }, [items, query, typeFilter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => sortOrder === 'asc' ? a.kcal - b.kcal : b.kcal - a.kcal);
    return copy;
  }, [filtered, sortOrder]);

  return (
    <div className={styles.tableSection}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search items by title"
        />
        <button
          type="button"
          className={styles.sortButton}
          onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          aria-label={`Sort by kcal ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          title={`Sort kcal: ${sortOrder === 'asc' ? 'Low → High' : 'High → Low'}`}
        >
          <span className={styles.sortIcon} aria-hidden>
            {sortOrder === 'asc' ? '▲' : '▼'}
          </span>
          <span className={styles.sortLabel}>kcal</span>
        </button>

        <div className={styles.filterWrapper}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => setFilterOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={filterOpen}
            aria-label={`Current filter: ${typeFilter}`}
            title={`Filter: ${typeFilter}`}
          >
            <span className={styles.filterLabel}>{typeFilter}</span>
          </button>
          {filterOpen && (
            <div role="menu" className={styles.filterMenu}>
              <button
                role="menuitemradio"
                aria-checked={typeFilter === 'all'}
                className={typeFilter === 'all' ? styles.filterItemActive : styles.filterItem}
                onClick={() => { setTypeFilter('all'); setFilterOpen(false); }}
              >All</button>
              <button
                role="menuitemradio"
                aria-checked={typeFilter === 'meal'}
                className={typeFilter === 'meal' ? styles.filterItemActive : styles.filterItem}
                onClick={() => { setTypeFilter('meal'); setFilterOpen(false); }}
              >Meal</button>
              <button
                role="menuitemradio"
                aria-checked={typeFilter === 'training'}
                className={typeFilter === 'training' ? styles.filterItemActive : styles.filterItem}
                onClick={() => { setTypeFilter('training'); setFilterOpen(false); }}
              >Training</button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>type</th>
              <th>title</th>
              <th>kcal</th>
              <th>tags</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <tr key={item.id} onClick={() => setSelected(item)} className={styles.rowClickable}>
                <td className={styles.cellType}>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.kcal}</td>
                <td>
                  <div className={styles.tags}>
                    {item.tags.map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableFooter} aria-live="polite">
            {sorted.length}/{items.length} items 
        </div>
      </div>

      {selected && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{selected.title}</div>
              <button className={styles.modalClose} aria-label="Close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalRow}><span className={styles.modalKey}>Type</span><span className={`${styles.modalVal} ${styles.modalTypeVal}`}>{selected.type}</span></div>
              <div className={styles.modalRow}><span className={styles.modalKey}>Kcal</span><span className={styles.modalVal}>{selected.type === 'meal' ? `You consumed ${selected.kcal} kcal` : `You burned ${selected.kcal} kcal`}</span></div>
              <div className={styles.modalRow}><span className={styles.modalKey}>Tags</span>
                <div className={styles.tags}>
                  {selected.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


