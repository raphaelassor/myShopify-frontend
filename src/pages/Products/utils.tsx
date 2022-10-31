import React from 'react';
import { StatusWidget } from '../../cmps/StatusWidget';
import { Product } from './types';

export const buildTableRow = (product: Product) => ({
  id: product.id,
  product: <span className="product-title">{product.title}</span>,
  status: <StatusWidget status={product.status} />,
  inventory: product.inventory,
  type: product.type,
  vendor: product.vendor,
  image: (
    <div className="image-preview">
      <img
        src={
          product.imgUrls[0]
            ? product.imgUrls[0]
            : '/assets/img/icons/image.svg'
        }
        alt=""
      />
    </div>
  ),
});
