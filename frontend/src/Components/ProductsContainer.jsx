import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
  handleEditProduct,
  handleDeleteProduct,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => {
        const q = productQuantity.find((p) => p.id === product.id)?.quantity || 0;

        return (
          <ProductCard
            key={product.id}
            {...product}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            productQuantity={q}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        );
      })}
    </div>
  );
}
