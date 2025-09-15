'use client';

import React from 'react';
import type { Item } from '../../types/Item';

type Props = {
  item: Item;
  onClose: () => void;
  backdropClass: string;
  modalClass: string;
  headerClass: string;
  titleClass: string;
  closeClass: string;
  bodyClass: string;
  rowClass: string;
  keyClass: string;
  valClass: string;
  tagsClass: string;
  tagClass: string;
};

export default function DetailsModal(props: Props) {
  const { item, onClose, backdropClass, modalClass, headerClass, titleClass, closeClass, bodyClass, rowClass, keyClass, valClass, tagsClass, tagClass } = props;
  return (
    <div className={backdropClass} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        <div className={headerClass}>
          <div className={titleClass}>{item.title}</div>
          <button className={closeClass} aria-label="Close" onClick={onClose}>×</button>
        </div>
        <div className={bodyClass}>
          <div className={rowClass}><span className={keyClass}>Type</span><span className={valClass} style={{ textTransform: 'capitalize' }}>{item.type}</span></div>
          <div className={rowClass}><span className={keyClass}>Kcal</span><span className={valClass}>{item.type === 'meal' ? `You consumed ${item.kcal} kcal` : `You burned ${item.kcal} kcal`}</span></div>
          <div className={rowClass}><span className={keyClass}>Tags</span>
            <div className={tagsClass}>
              {item.tags.map((t) => (
                <span key={t} className={tagClass}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


