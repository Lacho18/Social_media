import axios from "axios";
import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";

export default function PostsView({ userId }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await axios.get("/posts?user=" + userId);

            if (response.status === 200) {
                console.log(response.data.message);
                console.log(response.data.postsData[0].created_at.getDate());
                setPosts(response.data.postsData);
            }
        }

        getPosts();
    }, []);

    return (
        <div className="w-1/2 h-full max-h-full flex flex-col items-center overflow-y-scroll gap-10">
            {posts.map((post) => (
                <div
                    className="flex flex-col gap-2 bg-blue-950 w-3/4 mt-3 mb-3 p-3 rounded-lg"
                    style={{
                        backgroundColor: "#181233",
                        border: "3px solid #110d21",
                    }}
                >
                    <div className="flex gap-2">
                        <img
                            className="w-12 h-12 rounded-full"
                            src={post.imagePath}
                        />
                        <p>{post.firstName}</p>
                        <p>{post.lastName}</p>
                        <p>time</p>
                    </div>
                    <div>
                        <p>{post.name}</p>
                        <p>{post.description}</p>
                    </div>
                    <ImageSlider images={post.images} />
                    <div className="flex gap-4">
                        <div className="flex gap-2">
                            <button>🤍</button>
                            <p>likes</p>
                        </div>
                        <div className="flex gap-2">
                            <button>🌐</button>
                            <p>comments</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
