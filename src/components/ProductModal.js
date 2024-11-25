import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";

function ProductModal({ isOpen, onClose, onAddProducts }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
        fetchProducts().then((data) => {
        console.log("Fetched Products:", data); // Ensure the data is fetched here
        setProducts(data); // Update the state with the fetched data
      });
    }
  }, [isOpen, fetchProducts]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(query)
      )
    );
  };

  const toggleSelectProduct = (productId, variantId) => {
    const alreadySelected = selectedProducts.find(
      (item) => item.productId === productId && item.variantId === variantId
    );
    if (alreadySelected) {
      setSelectedProducts(
        selectedProducts.filter(
          (item) => item.productId !== productId || item.variantId !== variantId
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, { productId, variantId }]);
    }
  };

  const isSelected = (productId, variantId) =>
    selectedProducts.some(
      (item) => item.productId === productId && item.variantId === variantId
    );

  if (!isOpen) {
    return null; // Don't render the modal if it is not open
  }

  return (
    <div id="modal-root"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "600px",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <h2>Select Products</h2>
      <input
        type="text"
        placeholder="Search product"
        value={searchQuery}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <div>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <img
                    src={product.image?.src || "https://via.placeholder.com/50"}
                    alt={product.title}
                    style={{ width: "50px", height: "50px", borderRadius: "4px" }}
                  />
                  <strong>{product.title}</strong>
                </div>
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px 10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input
                        type="checkbox"
                        checked={isSelected(product.id, variant.id)}
                        onChange={() => toggleSelectProduct(product.id, variant.id)}
                      />
                      <span>{variant.title}</span>
                    </div>
                    <div>
                      <span style={{ marginRight: "15px" }}>
                        {variant.inventory_quantity || "N/A"} available
                      </span>
                      <span>${variant.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          borderTop: "1px solid #ccc",
          paddingTop: "10px",
        }}
      >
        <span>
          {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""}{" "}
          selected
        </span>
        <div>
          <button
            onClick={onClose}
            style={{
              padding: "8px 15px",
              background: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAddProducts(selectedProducts);
              onClose();
            }}
            style={{
              padding: "8px 15px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
