import { useParams, Link } from "react-router-dom";
import DefaultProfile from "./DefaultProfile";
import Popeye from "./Popeye";
import Spinach from "./Spinach";

const Profile = () => {
    const { name } = useParams();

    return (
        <div>
            <h1>Hello from <b>Profile</b> page!</h1>
            {name === "popeye" ? (
                <Popeye />
            ) : name === "spinach" ? (
                <Spinach />
            ) : (
                <DefaultProfile />
            )}
        </div>
    );
};

export default Profile;