import { useEffect, useState } from "react";

const Popeye = () => {
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/phtos", { mode: "cors" })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }

            return response.json();
        })
        .then((response) => setImageURL(response[0].url))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>

    return (
        imageURL && (
        <>
            <h1>An image</h1>
            <img src={imageURL} alt={"placeholder text"} />
        </>
        )
    );
};

export default Popeye;
