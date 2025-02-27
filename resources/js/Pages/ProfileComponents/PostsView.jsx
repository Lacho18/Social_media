import axios from "axios";
import { useEffect, useState } from "react";

export default function PostsView({ userId }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await axios.get("/posts");

            if (response.status === 200) {
                console.log(response.data.message);
            }
        }

        getPosts();
    }, []);

    return (
        <div className="w-1/2">
            <h1>Posts</h1>
        </div>
    );
}
