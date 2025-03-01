import axios from "axios";

export async function deletePostHandler(postId, posts) {
    const response = await axios.delete("/posts/" + postId);
    let filteredPosts = [];

    if (response.status === 200) {
        console.log(response.data.message);
        filteredPosts = posts.filter(post => post.id !== postId);
    }

    console.log(filteredPosts);
    return filteredPosts;
}
