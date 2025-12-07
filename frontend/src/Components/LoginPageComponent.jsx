import { Link } from "react-router-dom";

export default function LoginPageComponent({
    title,
    buttonLabel,
    formData,
    handleOnChange,
    handleOnSubmit,
    postResponse,
    textForLink,
    linkTo
}) {
    return (
        <div className="login-container">
            <h1>{title}</h1>

            <form onSubmit={handleOnSubmit}>
                <label>Username:</label>
                <input
                className="input_css"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleOnChange}
                    required
                />

                <br />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    required
                />

                <br />

                <button type="submit">{buttonLabel}</button>
            </form>

            <p className="message_P">{postResponse}</p>
             
             <p style={{ marginTop: "10px" }}>
                {textForLink} <Link to={linkTo}>Click here</Link> to join
            </p>   
        </div>
    );
}
