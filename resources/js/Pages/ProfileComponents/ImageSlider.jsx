import { useState } from "react";

export default function ImageSlider({ images }) {
    const [imageIndex, setImageIndex] = useState(0);

    function changeImageHandler(forward) {
        let currentIndex = imageIndex;
        currentIndex = forward ? currentIndex + 1 : currentIndex - 1;

        if (currentIndex > images.length - 1) {
            setImageIndex(0);
        } else if (currentIndex < 0) {
            setImageIndex(images.length - 1);
        } else {
            setImageIndex(currentIndex);
        }
    }

    return (
        <div className="w-full h-auto max-h-96 relative flex justify-center">
            {images.length > 1 && (
                <button
                    className="absolute left-0 h-full font-bold w-12 text-center text-3xl"
                    style={{ backgroundColor: "rgba(21, 20, 23, 0.5)" }}
                    onClick={() => changeImageHandler(false)}
                >
                    {"<"}
                </button>
            )}
            <img src={images[imageIndex]} />
            {images.length > 1 && (
                <button
                    className="absolute right-0 h-full font-bold w-12 text-center text-3xl"
                    style={{ backgroundColor: "rgba(21, 20, 23, 0.5)" }}
                    onClick={() => changeImageHandler(true)}
                >
                    {">"}
                </button>
            )}
        </div>
    );
}
