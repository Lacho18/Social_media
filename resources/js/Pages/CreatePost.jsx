import { useState } from "react";
import { useGlobalState } from "./context/userContext";
import ImagesCollection from "./ProfileComponents/ImagesCollection";
import axios from "axios";
import { useForm } from "@inertiajs/react";

export default function CreatePost() {
    const { globalUser, setGlobalUser } = useGlobalState();

    const { data, setData, post } = useForm({
        images: [],
    });

    const [newPost, setPost] = useState({});
    const [visualImages, setVisualImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    function changeHandler(e) {
        setPost((oldValue) => {
            return { ...oldValue, [e.target.name]: e.target.value };
        });
    }

    function addImageHandler(e) {
        const file = e.target.files[0];
        setPost((oldValue) => {
            const imagesArray = oldValue.images ? oldValue.images : [];
            imagesArray.push(file);

            return { ...oldValue, ["images"]: imagesArray };
        });

        setData("images", [...data.images, file]);

        setVisualImages((oldData) => {
            const newData = [...oldData, URL.createObjectURL(file)];

            return newData;
        });

        setSelectedImage(URL.createObjectURL(file));
    }

    async function postCreationHandler() {
        //Sending the array of image files to the backend, uploading them on the public disk and after that with the data for the urls store the post on the database
        post("/uploadImage/" + globalUser.id, {
            only: ["images"],
            onSuccess: async ({ props }) => {
                console.log(props);
                const response = await axios.post("/posts", {
                    name: newPost.name,
                    description: newPost.description,
                    images: props.images,
                    posterId: globalUser.id,
                });
            },
        });
    }

    return (
        <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex justify-center text-white">
            <div
                className="w-2/3 flex flex-col items-center border-2 border-blue-950 rounded-2xl"
                style={{ backgroundColor: "#1a194f" }}
            >
                <p className="text-2xl font-bold mb-5">Creating post</p>
                <div className="w-full flex flex-col gap-5">
                    <div className="flex flex-col gap-2 w-11/12 justify-start items-start pl-14 pr-14">
                        <label htmlFor="name">Enter post name</label>
                        <input
                            className="p-1 text-black w-1/3"
                            type="text"
                            name="name"
                            onChange={changeHandler}
                            placeholder="Post name"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-11/12 justify-start items-start pl-14 pr-14">
                        <label htmlFor="description">Enter post name</label>
                        <textarea
                            className="p-1 text-black w-1/3"
                            name="description"
                            onChange={changeHandler}
                            placeholder="Post description"
                        />
                    </div>
                    <div className="flex gap-2 justify-start items-start pl-14 pr-14 h-auto">
                        <div className="w-1/3">
                            <p>Insert image or images</p>
                            <input type="file" onChange={addImageHandler} />
                        </div>
                        <div className="w-1/3 p-3">
                            {selectedImage && (
                                <img
                                    className="w-full h-full"
                                    src={selectedImage}
                                />
                            )}
                        </div>
                        <ImagesCollection
                            images={visualImages}
                            selectImageHandler={(selImage) =>
                                setSelectedImage(selImage)
                            }
                        />
                    </div>
                    {/*Adding video component here*/}
                    <div className="flex justify-center">
                        <button
                            className="p-2 text-xl font-bold border-2 border-gray-800 bg-gray-600 rounded-2xl"
                            onClick={postCreationHandler}
                        >
                            Create new post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
