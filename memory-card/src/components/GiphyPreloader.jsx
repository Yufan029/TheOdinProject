import { useEffect, useState } from "react";

export default function GiphyPreloader() {
    const [loaded, setLoaded] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const preload = async() => {
                const promises = [];

                for (let i = 0; i < count; i++) {
                    const url = `https://api.giphy.com/v1/gifs/random?api_key=g1l0d0WVaR6XcOWLGvaq0em0w1B7BG2a&tag=&rating=g`;
                    promises.push(fetch(url).then(res => res.json()));
                }

                const images = await Promise.all(promises);                
            const promises = urls.map(url => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            });
        
            const loadedImages =  await Promise.all(promises);
            setImages(loadedImages);
            setLoaded(true);
        }

        preload();
        
    }, [urls])

    if (!loaded) {
        return (
            <p>Loading...</p>
        );
    }

    return (
        <div className="cards">
            {images.map((image, i) => (
                <img key={i} src={image.src} />
            ))}
        </div>
    );
}