import { useEffect, useState } from "react";

export default function ImagesCollection({ images, selectImageHandler }) {
    const [imagesCollection, setImagesCollection] = useState([]);
    const [indexCollection, setIndexCollection] = useState(0);

    useEffect(() => {
        if (images.length >= 8) {
            setImagesCollection(chunkArray(images, 8));
        } else {
            setImagesCollection((oldValue) => {
                let newValue = [];
                newValue.push(images);

                return newValue;
            });
        }
    }, [images]);

    function chunkArray(array, size) {
        let result = [];

        for (let i = 0; i < array.length; i += size) {
            let slice = i > 0 ? i + size - 1 : i + size;
            result.push(array.slice(i, slice));
        }

        return result;
    }

    if (imagesCollection.length === 0) {
        return;
    }

    return (
        <div className="w-1/3 p-3 flex flex-wrap">
            {indexCollection > 0 && (
                <button
                    className="ml-1 mr-1 mb-2 relative"
                    style={{
                        width: "78px",
                        height: "78px",
                    }}
                    onClick={() =>
                        setIndexCollection((oldValue) => oldValue - 1)
                    }
                >
                    <img
                        src={
                            imagesCollection[indexCollection - 1][
                                imagesCollection[indexCollection - 1].length - 1
                            ]
                        }
                        style={{ filter: "blur(5px)" }}
                    />
                    <p className="absolute text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        -
                    </p>
                </button>
            )}
            {imagesCollection[indexCollection].map((image) => (
                <button
                    className="ml-1 mr-1 mb-2"
                    style={{
                        /*border:
                            image === selectedImage
                                ? "3px solid #151526"
                                : "3px solid #50506b",*/
                        width: "78px",
                        height: "78px",
                    }}
                    onClick={() => selectImageHandler(image)}
                >
                    <img src={image} />
                </button>
            ))}
            {indexCollection + 1 < imagesCollection.length && (
                <button
                    className="ml-1 mr-1 mb-2 relative"
                    style={{
                        width: "78px",
                        height: "78px",
                    }}
                    onClick={() =>
                        setIndexCollection((oldValue) => oldValue + 1)
                    }
                >
                    <img
                        src={imagesCollection[indexCollection + 1][0]}
                        style={{ filter: "blur(5px)" }}
                    />
                    <p className="absolute text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        +
                    </p>
                </button>
            )}
        </div>
    );
}
