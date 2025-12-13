import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginFormComponent from "./LoginPageComponent";
//Harshduggal


export default function CreateUserPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [postResponse, setPostResponse] = useState("");

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/create-user",
                formData
            );
            navigate("/");

            setPostResponse(response.data.message);

        } catch (error) {
            setPostResponse(error.response.data.message || "Could not create user");
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };

    return (
        <LoginFormComponent
            title="Create New User"
            buttonLabel="Create User"
            formData={formData}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            postResponse={postResponse}
            linkTo="/"
        />
    );
}
