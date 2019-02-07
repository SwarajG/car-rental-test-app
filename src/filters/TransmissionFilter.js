import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export const TransmissionFilter = ({ filters, updateFilter, selected, className }) => (
  <div className={className}>
    <CheckboxGroup
      options={filters}
      value={selected}
      onChange={updateFilter}
    />
  </div>
)