import axios from "axios";
import { useEffect, useState } from "react";

export default function PostCommentsSection({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function getPostComments() {
            const response = await axios.get("/comments?postId" + postId);

            if (response.status === 200) {
                console.log(response.data.message);
            }
        }

        getPostComments();
    }, []);

    return (
        <div>
            <h1>Niggas</h1>
        </div>
    );
}
