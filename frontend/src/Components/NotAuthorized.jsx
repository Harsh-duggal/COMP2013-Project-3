import { Link } from "react-router-dom";
//Harshduggal


//TO handle when there is a user not registered


export default function NotAuthorized() {
    return (
        <div>
            <h1>You are not authorized to visit this page 😔</h1>
            <br />
            <Link className="backToLogin" to="/">Back to login page</Link>
        </div>
    );
}
