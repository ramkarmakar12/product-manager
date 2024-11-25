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
        background: disabled ? "#ccc" : "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        marginTop: "10px",

      }}
    >
      Add Product
    </button>
    </div>
  );
}

export default AddProductButton;
