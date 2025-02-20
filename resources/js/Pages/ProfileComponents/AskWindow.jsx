import { useState } from "react";

export default function AskWindow({ closeWindow, setNewImage, setData }) {
    const [image, setImage] = useState(null);
    //const [file, setFile] = useState(null);

    function imageSelectionHandler(e) {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            setImage(URL.createObjectURL(file));
        }
    }

    return (
        <div className="absolute w-1/3 h-auto rounded-lg bg-blue-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
            <div>
                <button
                    className="w-7 h-7 rounded bg-red-500"
                    onClick={() => {
                        closeWindow();
                        setImage(null);
                    }}
                >
                    X
                </button>
                <p>
                    If you want to change your profile picture please select{" "}
                    <span className="font-bold">import image</span>
                </p>
            </div>
            {image && <img className="w-2/3 h-60" src={image} />}
            {image && (
                <button
                    className="bg-blue-900 p-2 text-white rounded"
                    onClick={() => {
                        closeWindow();
                        setNewImage();
                    }}
                >
                    Submit image change
                </button>
            )}
            <input type="file" onChange={imageSelectionHandler} />
        </div>
    );
}
