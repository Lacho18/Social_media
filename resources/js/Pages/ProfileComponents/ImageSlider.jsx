import { useState } from "react";

export default function ImageSlider({ images }) {
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div>
            <img src={images[imageIndex]} />
        </div>
    );
}
