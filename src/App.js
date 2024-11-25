import React, { useState } from 'react';
import Navbar from './components/NavBar';
import ProductList from './components/ProductList';
import AddProductButton from './components/AddProductButton';
import ProductModal from './components/ProductModal';
function App() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const addProduct = () => {
    if (products.length < 4) {
      setProducts([...products, { id: Date.now(), name: '', discount: null }]);
    }
  };

  const updateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  return (
    <div className="App">
      <Navbar />
      <div style={{ padding: '20px 50px ', fontFamily: 'Arial' }}>
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Add Products
        </h1>
        <ProductList
          products={products}
          setProducts={updateProducts}
          onClick={handleOpenModal}
        />
        <AddProductButton
          onAddProduct={addProduct}
          disabled={products.length >= 4}
        />
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddProducts={(selectedProducts) => console.log(selectedProducts)}
      />
    </div>
  );
}
export default App;
