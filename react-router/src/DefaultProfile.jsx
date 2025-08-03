import { Link } from "react-router-dom";

const DefaultProfile = () => {
    return (
        <div>
            <h1>Default profile.</h1>
            <Link to="/">Back to App</Link>
        </div>
    );
};

export default DefaultProfile;