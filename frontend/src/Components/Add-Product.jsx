import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

// this is AddProduct component
export default function AddProduct() {
  //States which are used to store input values of form
  const [productsData, setProductsData] = useState([]);
  // formData will hold the values typed into the form (product name, brand, image and price)
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  //state for storing response of server when it is submitted
  // postResponse will store the message which we get back from the server after submitting

  const [postResponse, setPostResponse] = useState("");

  // isEditing tells us that whether we are editing an existing product instead of adding a new one
  // For Add Product page, this will usually be false

  const [isEditing, setIsEditing] = useState(false);

  //Handlers
  // Function for getting all products from the database handler

  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      // console.log(response); // for testing to see if it connects
      //for saving products into state
      setProductsData(() => response.data);
    } catch (error) {
      console.log(error.message); //showing error if something goes wrong
    }
  };

   // navigate lets us move to another page ,for instance, going back to /main after adding a product.

  const navigate = useNavigate();

  // Function to handle the submission of data (when user clicks submit button)

  const handleOnSubmit = async (e) => {
    // stop the page from refreshing when we submit
    e.preventDefault();
    try {
      if (isEditing) {
        // If editing, calling update function
        handleOnUpdate(formData._id);
        setIsEditing(false);
      } else {
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((response) => {
            // saving server response (confirmation message)
            setPostResponse(response.data);
            console.log(response);
            // go back to main page after adding product
            navigate("/main");
          });
      }
    } catch (error) {
         // showing error if something goes wrong
      console.log(error.message);
    }
  };

  // This Function handles the changes in input fields  for the form
  // it runs every time when user types

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  //Handle updating the api patch route
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        `http://localhost:3000/products/${id}`,
        formData
      );
      setPostResponse({ message: result.data.message, date: result.data.date });
    } catch (error) {
        // showing error if something goes wrong
      console.log(error);
    }
  };

  //Render

  return (
    <div>
      <div className="AddProduct"></div>
      {/* ProductForm is a component that shows the actual input fields */} 
      <ProductForm
        formData={formData}
        // passing submit function
        handleOnSubmit={handleOnSubmit}
        // passing change function
        handleOnChange={handleOnChange}
        // passing server response message
        postResponse={postResponse}
        isEditing={isEditing}
      />
       {/* Showing confirmation message in green after submission */}
      <p style={{ color: "green" }}>{postResponse?.message}</p>
    </div>
  );
}  