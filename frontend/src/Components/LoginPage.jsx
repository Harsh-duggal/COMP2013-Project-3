import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginPageComponent from "./LoginPageComponent";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [postResponse, setPostResponse] = useState("");

    const navigate = useNavigate();

    // Handle typing in inputs
    const handleOnChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handle Login Request
    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", formData);

            if(response.data.message === "User Authenticated"){
                navigate("/main");
            }else{
            setPostResponse(response.data.message);
            }
            // Save JWT Cookie
            Cookies.set("jwt-authorization", response.data.token);

            // Navigate to main page
            navigate("/main");
        } catch (error) {
            setPostResponse( error.response?.data?.message || "Login Failed");
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div>
            <LoginPageComponent
                title="Groceries App"
                buttonLabel="Login"
                formData={formData}
                handleOnChange={handleOnChange}
                handleOnSubmit={handleOnSubmit}
                postResponse={postResponse}
                textForLink="Not a member yet?"
                linkTo="/create-user"
            />
        </div>
    );
}
