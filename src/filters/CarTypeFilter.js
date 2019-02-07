import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export const CarTypeFilter = ({ filters, updateFilter, selected, className }) => {
  return (
    <div className={className}>
    <CheckboxGroup
      options={filters}
      value={selected}
      onChange={updateFilter}
    />
  </div>
  )
}