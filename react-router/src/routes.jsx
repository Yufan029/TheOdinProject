import App from "./App";
import DefaultProfile from "./DefaultProfile";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "profile",
        element: <Profile />,
    },
    {
        path: "profile/:name",
        element: <Profile />,
    }
];

export default routes;