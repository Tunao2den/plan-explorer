'use client';

import React from 'react';
import type { Item } from '../../types/Item';

type Props = {
  className: string;
  theadClass: string;
  onRowClick: (item: Item) => void;
  items: Item[];
  cellTypeClass: string;
  tagsClass: string;
  tagClass: string;
};

export default function TableView({ className, theadClass, onRowClick, items, cellTypeClass, tagsClass, tagClass }: Props) {
  return (
    <table className={className}>
      <thead className={theadClass}>
        <tr>
          <th>type</th>
          <th>title</th>
          <th>kcal</th>
          <th>tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} onClick={() => onRowClick(item)}>
            <td className={cellTypeClass}>{item.type}</td>
            <td>{item.title}</td>
            <td>{item.kcal}</td>
            <td>
              <div className={tagsClass}>
                {item.tags.map((t) => (
                  <span key={t} className={tagClass}>{t}</span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


