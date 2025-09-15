'use client';

import { useMemo, useState } from "react";
import { filterItems } from "../lib/filter";
import { sortItems } from "../lib/sort";
import type { TypeFilter } from "../types/TypeFilter";
import type { Item } from "../types/Item";
import type { SortOrder } from "../types/SortOrder";
import styles from "@/app/page.module.css";
import data from "@/data/intern-case-2.json";
import Toolbar from "./DataTable/Toolbar";
import TableView from "./DataTable/TableView";
import DetailsModal from "./DataTable/DetailsModal";


export default function DataTable() {
  const items = (data as { items: Item[] }).items;
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [selected, setSelected] = useState<Item | null>(null);

  const filtered = useMemo(() => {
    return filterItems(items, query, typeFilter);
  }, [items, query, typeFilter]);

  const sorted = useMemo(() => sortItems(filtered, sortOrder), [filtered, sortOrder]);

  return (
    <div className={styles.tableSection}>
      <Toolbar
        className={styles.searchBar}
        searchBarClass=""
        searchInputClass={styles.searchInput}
        searchValue={query}
        onSearchChange={setQuery}
        sortButtonClass={styles.sortButton}
        sortIconClass={styles.sortIcon}
        sortLabelClass={styles.sortLabel}
        sortOrder={sortOrder}
        onToggleSort={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        filterWrapperClass={styles.filterWrapper}
        filterButtonClass={styles.filterButton}
        filterLabelClass={styles.filterLabel}
        filterMenuClass={styles.filterMenu}
        filterItemClass={styles.filterItem}
        filterItemActiveClass={styles.filterItemActive}
        filterOpen={filterOpen}
        typeFilter={typeFilter}
        onToggleFilterOpen={() => setFilterOpen((v) => !v)}
        onSelectType={(t) => { setTypeFilter(t); setFilterOpen(false); }}
      />

      <div className={styles.tableWrapper}>
        <TableView
          className={styles.table}
          theadClass=""
          onRowClick={(item) => setSelected(item)}
          items={sorted}
          cellTypeClass={styles.cellType}
          tagsClass={styles.tags}
          tagClass={styles.tag}
        />
        <div className={styles.tableFooter} aria-live="polite">
            {sorted.length}/{items.length} items 
        </div>
      </div>

      {selected && (
        <DetailsModal
          item={selected}
          onClose={() => setSelected(null)}
          backdropClass={styles.modalBackdrop}
          modalClass={styles.modal}
          headerClass={styles.modalHeader}
          titleClass={styles.modalTitle}
          closeClass={styles.modalClose}
          bodyClass={styles.modalBody}
          rowClass={styles.modalRow}
          keyClass={styles.modalKey}
          valClass={`${styles.modalVal} ${styles.modalTypeVal}`}
          tagsClass={styles.tags}
          tagClass={styles.tag}
        />
      )}
    </div>
  );
}


