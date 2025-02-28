import axios from "axios";
import { useEffect, useState } from "react";

export default function PostsView({ userId }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await axios.get("/posts?user=" + userId);

            if (response.status === 200) {
                console.log(response.data.message);
                console.log(response.data.postsData);
            }
        }

        getPosts();
    }, []);

    return (
        <div className="w-1/2">
            <div></div>
        </div>
    );
}
