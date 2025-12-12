import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// This is the Edit-ProductPage component

export default function EditProductPage() {
    // useLocation allows us to grab the product ID that was passed when navigating to this page
  const location = useLocation();
  // product ID is stored in location.state
  const { _id } = location.state

  const [formData, setFormData] = useState({

    // formData will hold the values which are typed in the form that is product name, brand, image and price
    //these product name, brand, image and price are started initially with empty 
    //and when user enters input,it is filled with that

    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  // postResponse stores the message which we get back from the server after updating
  const [postResponse, setPostResponse] = useState("");
  // navigate lets us move to another page ,for instance, going back to /main after editing a product.
  const navigate = useNavigate();
    // productsData will hold all products fetched from the database
  const [productsData, setProductsData] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);

  // When the page loads, fetching all products and finding the one we want to edit

  useEffect(() => {
      handleProductDB();
  }, [_id]);


  //Get the products and find the one to edit
const handleProductDB = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    setProductsData([...response.data]); 
    setProductQuantity(
        // creating a quantity list for each product
      response.data.map((product) => ({ _id: product._id, quantity: 0 }))
    );

    //find product by matching the id given by useNavigate
    const singleProduct = response.data.find((product) => product._id === _id);
    // fill the form with this product's data 
    setFormData(singleProduct)
  } catch (error) {
    console.log(error.message);
  }
};

 // Function for handling changes in input fields it runs every time when user types
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  // Function which updates existing product using PATCH

const handleOnUpdate = async (id) => {
  try {
    await axios
      .patch(`http://localhost:3000/products/${id}`, formData)
      .then((result) => {
        setPostResponse(result.data.message || "Product updated!");
        navigate("/main");   
      });
  } catch (error) {
    console.log(error.message);
  }
};

//Handles data submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await handleOnUpdate(_id);

  };

  return (
    <div>
      <ProductForm
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        postResponse={postResponse}
      />
      <a href="/main">Click here to go back to the main page</a>
    </div>
  );
} 