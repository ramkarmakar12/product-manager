import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

export const ProductListItem = ({ product, onRemove, onDiscountChange }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'PRODUCT',
    item: product,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [discount, setDiscount] = useState({
    type: 'percentage', // or 'flat'
    value: 0,
  });

  const handleDiscountChange = (event) => {
    setDiscount({
      ...discount,
      value: event.target.value,
    });
    onDiscountChange(product.id, discount);
  };
  
  return (
    <li ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {product.name}
      {product.variants.length > 1 && (
        <button>Show/Hide Variants</button>
      )}
      <input
        type="number"
        placeholder="Discount"
        value={discount.value}
        onChange={handleDiscountChange}
      />
      <select
        value={discount.type}
        onChange={(event) =>
          setDiscount({ ...discount, type: event.target.value })
        }
      >
        <option value="percentage">Percentage</option>
        <option value="flat">Flat</option>
      </select>
      <button onClick={() => onRemove(product.id)}>X</button>
    </li>
  );
};

export default ProductListItem;