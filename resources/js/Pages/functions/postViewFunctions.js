import axios from "axios";

export async function deletePostHandler(postId) {
    const response = await axios.delete("/posts/" + postId);

    if (response.status === 200) {
        console.log(response.data.message);
    }

    return null;
}
