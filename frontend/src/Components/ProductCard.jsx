import QuantityCounter from "./QuantityCounter";
import { useNavigate } from "react-router-dom";
//Harshduggal

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  id,
  _id,
  handleDeleteProduct,
  isAdmin,
}) {
  const navigate = useNavigate();
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" />
      <h4>{brand}</h4>

      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />

      <h3>{price}</h3>
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>

      {/*This shows edit and add product button only if user is authenticated as admin" */}
      {isAdmin && (
  <>
     <button id="edit-button" onClick={() =>
    navigate("/edit-product", {
      state: { _id, productName }
    })
  }>Edit</button>

  
      <button className="RemoveButton" onClick={() => handleDeleteProduct(_id)}>
        Delete
      </button>
      </> )}
    </div>
  );
}
