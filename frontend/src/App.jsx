import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./Components/LoginPage"
import CreateUserPage from "./Components/CreateUserPage";
import NotAuthorized from "./Components/NotAuthorized";
import PageNotFound from "./Components/PageNotFound";
import PrivateRoute from "./Components/PrivateRoute";
import GroceriesMain from "./Components/GroceriesMain"
import AddProduct from "./Components/Add-Product";
import EditProductPage from "./Components/Edit-Product";


function App() {
  return (
    <>
    <Router>
    <Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/create-user" element={<CreateUserPage />} />
  <Route path="/add-product" element={<AddProduct />} />
  <Route path="/edit-product" element={<EditProductPage />} />
  <Route
  path="/main"
  element={
    <PrivateRoute>
      <GroceriesMain />
    </PrivateRoute>
  }/>
  <Route path="/not-authorized" element={<NotAuthorized />} />
  <Route path="*" element={<PageNotFound />} /> 
</Routes>
</Router>

    </>
  );
}

export default App;
