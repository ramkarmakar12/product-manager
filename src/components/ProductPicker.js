// src/components/ProductPicker.js
import React, { useState } from 'react';
import axios from 'axios';

const ProductPicker = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    const handleSearch = async () => {
        const response = await axios.get(`http://stageapi.monkcommerce.app/task/products/search?search=${searchTerm}&page=0&limit=10`, {
            headers: { 'x-api-key': '72njgfa948d9aS7gs5' }
        });
        console.log(response.data);
        
        setProducts(response.data.products);
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search products..." />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {products.map(product => (
                    <li key={product.id} onClick={() => onSelect(product)}>
                        {product.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPicker;