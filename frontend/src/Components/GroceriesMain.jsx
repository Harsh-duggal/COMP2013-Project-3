import ProductCard from "./ProductCard";
import NavBar from "./NavBar";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroceriesAppContainer from "./GroceriesAppContainer";

export default function MainPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = Cookies.get("jwtToken");

        if (!token) {
            navigate("/not-authorized");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUsername(decoded.username);
            setIsAdmin(decoded.isAdmin);
        } catch {
            navigate("/not-authorized");
        }
    }, [navigate]);

    return (
        
     <div>
      {/* This renders ALL products */}
      <GroceriesAppContainer username={username} isAdmin={isAdmin} />
    </div>
    );
}
