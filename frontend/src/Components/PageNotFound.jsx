import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="webDiv" >
            <h1 className="dinoText">🦖</h1>
            <h1>Page Not Found</h1>
            <br />
            <Link className = "backToLogin" to="/">
                Back to login page
            </Link>
        </div>
    );
}
