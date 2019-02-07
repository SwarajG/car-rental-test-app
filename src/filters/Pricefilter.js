import React from 'react';
import { Icon } from 'antd';

export const Pricefilter = ({ togglePriceFilter, type, className }) => (
  <div onClick={togglePriceFilter} className={className} style={{ cursor: 'pointer' }}>
    Price {type === 'asc' ? (
      <Icon type="arrow-down" />
    ) : (
      <Icon type="arrow-up" />
    )}
  </div>
)