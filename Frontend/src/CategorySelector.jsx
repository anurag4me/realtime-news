import React from 'react';

const categories = [
  'general',
  'world',
  'nation',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health'
];

const CategorySelector = ({ selected, onChange }) => (
  <select value={selected} onChange={(e) => onChange(e.target.value)}>
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat.charAt(0).toUpperCase() + cat.slice(1)}
      </option>
    ))}
  </select>
);

export default CategorySelector;
