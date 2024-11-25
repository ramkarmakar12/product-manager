import React , {useState,useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProductCard from "./ProductCard";

function ProductList({ products, setProducts , onClick}) {

  // const []
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(products);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setProducts(reordered);
  };

  const updateProduct = (index, updatedProduct) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts);
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="products">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {products.map((product, index) => (
              <Draggable
                key={product.id}
                draggableId={String(product.id)}
                index={index}
              >
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      background: "#f9f9f9",
                      padding: "10px",
                      borderRadius: "5px",
                      gap: "10px", // Ensures consistent spacing between handle and content
                    }}
                  >
                    <span
                      {...provided.dragHandleProps}
                      style={{ cursor: "grab", marginRight: "10px" ,     alignSelf: "center", // Ensures alignment within flex container
                      }}
                    >
                      ☰
                    </span>
                    <div style={{ flex: 1 }}>
                    <ProductCard
                      product={product}
                      onUpdate={(updatedProduct) =>
                        updateProduct(index, updatedProduct)
                      }
                      onRemove={() => removeProduct(index)}
                    />
                      </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ProductList;
