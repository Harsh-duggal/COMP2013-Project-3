import { Link } from "react-router-dom";
//Harshduggal
//This component is rendered when a user tries to access a route that does not exist in the application.
export default function PageNotFound() {
    return (
        <div className="webDiv" >
            <h1 className="dinoText">🦖</h1>
            <h1>Page Not Found</h1>
            <br />
            <Link className = "backToLogin" to="/">
            {/*Link to get the user back to loginPage*/}
                Back to login page
            </Link>
        </div>
    );
}
