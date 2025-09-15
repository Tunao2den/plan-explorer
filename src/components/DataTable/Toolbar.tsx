'use client';

import React from 'react';

type Props = {
  className: string;
  searchBarClass: string;
  searchInputClass: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortButtonClass: string;
  sortIconClass: string;
  sortLabelClass: string;
  sortOrder: 'asc' | 'desc';
  onToggleSort: () => void;
  filterWrapperClass: string;
  filterButtonClass: string;
  filterLabelClass: string;
  filterMenuClass: string;
  filterItemClass: string;
  filterItemActiveClass: string;
  filterOpen: boolean;
  typeFilter: 'all' | 'meal' | 'training';
  onToggleFilterOpen: () => void;
  onSelectType: (t: 'all' | 'meal' | 'training') => void;
};

export default function Toolbar(props: Props) {
  const {
    className,
    searchBarClass,
    searchInputClass,
    searchValue,
    onSearchChange,
    sortButtonClass,
    sortIconClass,
    sortLabelClass,
    sortOrder,
    onToggleSort,
    filterWrapperClass,
    filterButtonClass,
    filterLabelClass,
    filterMenuClass,
    filterItemClass,
    filterItemActiveClass,
    filterOpen,
    typeFilter,
    onToggleFilterOpen,
    onSelectType,
  } = props;

  return (
    <div className={className}>
      <div className={searchBarClass}>
        <input
          type="text"
          className={searchInputClass}
          placeholder="Search by title..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search items by title"
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          type="button"
          className={sortButtonClass}
          onClick={onToggleSort}
          aria-label={`Sort by kcal ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          title={`Sort kcal: ${sortOrder === 'asc' ? 'Low → High' : 'High → Low'}`}
        >
          <span className={sortIconClass} aria-hidden>
            {sortOrder === 'asc' ? '▲' : '▼'}
          </span>
          <span className={sortLabelClass}>Kcal</span>
        </button>

        <div className={filterWrapperClass}>
          <button
            type="button"
            className={filterButtonClass}
            onClick={onToggleFilterOpen}
            aria-haspopup="menu"
            aria-expanded={filterOpen}
            aria-label={`Current filter: ${typeFilter}`}
            title={`Filter: ${typeFilter}`}
          >
            <span className={filterLabelClass}>{typeFilter[0].toUpperCase() + typeFilter.slice(1)}</span>
          </button>
          {filterOpen && (
            <div role="menu" className={filterMenuClass}>
              {(['all','meal','training'] as const).map((t) => (
                <button
                  key={t}
                  role="menuitemradio"
                  aria-checked={typeFilter === t}
                  className={typeFilter === t ? filterItemActiveClass : filterItemClass}
                  onClick={() => onSelectType(t)}
                >{t[0].toUpperCase() + t.slice(1)}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


