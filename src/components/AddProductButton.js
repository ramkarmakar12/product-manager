import React from "react";

function AddProductButton({ onAddProduct, disabled }) {
  return (
    <div style={{        display: "flex",
      justifyContent: "center",
      alignItems: "center",}}>
    <button
      onClick={onAddProduct}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        background: disabled ? "#ccc" : "#fff",
        color: "#00c04b",
        border: "2px solid #00c04b",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        marginTop: "10px",
        fontWeight: "bold"
      }}
    >
      Add Product
    </button>
    </div>
  );
}

export default AddProductButton;
