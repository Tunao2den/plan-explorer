'use client';

import React from 'react';

type Props = {
  className: string;
  inputClassName: string;
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ className, inputClassName, value, onChange }: Props) {
  return (
    <div className={className}>
      <input
        type="text"
        className={inputClassName}
        placeholder="Search by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search items by title"
      />
    </div>
  );
}


