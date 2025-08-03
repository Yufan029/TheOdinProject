import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1>Error Page</h1>
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;