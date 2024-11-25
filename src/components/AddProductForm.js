import React, { useState } from 'react';

const AddProductForm = () => {
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);

  const handleAddProductClick = () => {
    setIsTextBoxVisible(true);
  };

  const handleTextBoxChange = (event) => {
    // Handle the textbox input here
    console.log(event.target.value);
  };

  return (
    <div>
      <button onClick={handleAddProductClick}>Add Product</button>
      {isTextBoxVisible && (
        <input type="text" placeholder="Enter product name" onChange={handleTextBoxChange} />
      )}
    </div>
  );
};

export default AddProductForm;