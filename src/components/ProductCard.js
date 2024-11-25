import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api'; // Import the fetch logic from api.js

function ProductCard({ product, onUpdate, onRemove }) {
  const [name, setName] = useState(product.name);
  const [discount, setDiscount] = useState(product.discount);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [products, setProducts] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(false); // Loading indicator
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [showVariants, setShowVariants] = useState({}); // Track toggled variants for each product
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products

  // Handle product selection
  const handleSelectProduct = (product) => {
    const alreadySelected = selectedProducts.some(
      (selected) => selected.id === product.id
    );

    if (!alreadySelected) {
      setSelectedProducts((prev) => [
        ...prev,
        { ...product, discount: '20', discountType: '% Off' },
      ]);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    /*
    if(searchQuery ==''){
      return true;
    }
    */
    console.log('searched for', e.target.value);

    setFilteredProducts(filtered);
    return;
  };
  // Toggle product selection
  const toggleProductSelection = (productId) => {
    setSelectedProducts(
      (prevSelected) =>
        prevSelected.includes(productId)
          ? prevSelected.filter((id) => id !== productId) // Remove if already selected
          : [...prevSelected, productId] // Add if not selected
    );
  };

  // Toggle variant selection
  const toggleVariantSelection = (variantId) => {
    setSelectedVariants(
      (prevSelected) =>
        prevSelected.includes(variantId)
          ? prevSelected.filter((id) => id !== variantId) // Remove if already selected
          : [...prevSelected, variantId] // Add if not selected
    );
  };

  // Handle "Add" button click
  const handleAddProducts = (product) => {
    console.log('Selected Products:', selectedProducts);
    console.log('Selected Variants:', selectedVariants); // Add your logic to handle the selected products here (e.g., submit to API)
    handleCloseModal(); // Close the modal after adding

    setSelectedProducts((prev) => [
      ...prev,
      { ...product, discount: '20', discountType: '% Off' },
    ]);
  };
  const handleUpdate = () => {
    onUpdate({ ...product, name, discount });
  };

  // Remove a product from the list
  const handleRemoveProduct = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle variants visibility
  const toggleVariants = (index) => {
    setShowVariants((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle discount updates
  const handleDiscountChange = (index, field, value) => {
    setSelectedProducts((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    await fetchAndSetProducts(); // Fetch products when opening the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchQuery('');
  };

  const handleProductSelect = (selectedProduct) => {
    setName(selectedProduct.name); // Update the input with the selected product name
    handleCloseModal();
  };

  const fetchAndSetProducts = async () => {
    setLoading(true);
    const data = await fetchProducts(); // Call fetchProducts from api.js
    setProducts(data);
    setFilteredProducts(data); // Initialize the filtered list
    setLoading(false);
  };
  /*
  useEffect( () => {
    fetchAndSetProducts(searchQuery,1,10); // Fetch products when the component mounts
  }, [searchQuery]);
  */

  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
      <input
        type="text"
        placeholder="Select Product"
        value={name}
        onClick={handleOpenModal} // Open modal on input click
        readOnly
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '20%',
          alignItems: 'center',
          cursor: 'pointer', // Indicate it's clickable
        }}
      />
      <button
        onClick={() => setDiscount((prev) => (prev ? null : '10%'))}
        style={{
          marginLeft: '10px',
          padding: '8px 12px',
          background: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {discount ? `Discount: ${discount}` : 'Add Discount'}
      </button>
      <button
        onClick={onRemove}
        style={{
          marginLeft: '10px',
          padding: '8px 12px',
          background: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Remove
      </button>

      

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              width: '600px',
              maxHeight: '80%',
              overflowY: 'auto',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <header
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #ccc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ fontSize: '18px', margin: 0 }}>Select Products</h2>

              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                ✕
              </button>
            </header>
            <input
              type="text"
              placeholder="Search Products"
              value={searchQuery}
              onChange={handleSearch}
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                flex: 1,
                marginLeft: '20px',
                marginTop: '10px',
                width: '80%',
              }}
            />
            <div style={{ padding: '16px' }}>
              {filteredProducts && filteredProducts.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {filteredProducts.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 0',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(item.id)}
                        onChange={() => toggleProductSelection(item.id)}
                        style={{
                          cursor: 'pointer',
                          marginRight: '10px',
                          alignSelf: 'flex-start',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          flex: 1,
                        }}
                      >
                        <img
                          src={
                            item.image?.src ||
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhaG2AttXH93ENiDs7yJPU6gzSLBHlkQ0QA&s'
                          }
                          alt={item.title}
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '4px',
                            objectFit: 'cover',
                            marginRight: '10px',
                          }}
                        />
                        <div>
                          <p style={{ margin: 0, fontWeight: 500 }}>
                            {item.title}
                          </p>
                          <ul
                            style={{
                              listStyle: 'none',
                              margin: '5px 0 0',
                              padding: 0,
                            }}
                          >
                            {item.variants.map((variant) => (
                              <li
                                key={variant.id}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between', // Aligns title and price
                                  alignItems: 'center',
                                  marginBottom: '4px',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedVariants.includes(
                                      variant.id
                                    )}
                                    onChange={() =>
                                      toggleVariantSelection(variant.id)
                                    }
                                    style={{
                                      cursor: 'pointer',
                                      marginRight: '10px',
                                    }}
                                  />
                                  <span
                                    style={{ fontSize: '14px', color: '#666' }}
                                  >
                                    {variant.title}{' '}
                                  </span>
                                </div>
                                <span
                                  style={{
                                    fontSize: '14px',
                                    color: '#666',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  ${variant.price}{' '}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products found</p>
              )}
            </div>
            <footer
              style={{
                padding: '16px 20px',
                borderTop: '1px solid #ccc',
                position: 'sticky', // Keep it always visible within the modal
                bottom: '0',
                background: 'white', // To ensure it doesn't inherit any transparent background
                display: 'flex',
                justifyContent: 'flex-end',
                zIndex: 10, // Keep it above the content
              }}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  padding: '8px 16px',
                  background: '#ccc',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddProducts}
                style={{
                  padding: '8px 16px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
