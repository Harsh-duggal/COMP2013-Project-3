import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function NavBar({ quantity, username, isAdmin}) {
  const navigate = useNavigate();

  //Harshduggal


//removes jwtToken when the user click on logout button
  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/");
  };

  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, {username}</h3>
        <button onClick={handleLogout}>Logout</button>

         {isAdmin && (//To check if the user logged in is "admin"
    <button className="addButton" onClick={() => navigate("/add-product")}>
      Add New Product
    </button>
  )}
      </div>


      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
      </div>
      <div className="NavDiv NavCart">
        <img
          src={
            quantity > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
          alt="cart"
        />
      </div>
    </nav>
  );
}

