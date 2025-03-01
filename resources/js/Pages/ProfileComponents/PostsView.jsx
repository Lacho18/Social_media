import axios from "axios";
import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import PostCommentsSection from "./PostCommentsSection";

import { deletePostHandler } from "../functions/postViewFunctions";

export default function PostsView({ userId, userLikedPosts }) {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState(userLikedPosts);
    const [commentsIndexes, setCommentsIndexes] = useState([]);
    const [postMenu, setPostMenu] = useState(-1);

    useEffect(() => {
        async function getPosts() {
            const response = await axios.get("/posts?user=" + userId);

            if (response.status === 200) {
                console.log(response.data.message);
                setPosts(response.data.postsData);
            }
        }

        getPosts();
    }, []);

    async function likePostHandler(postId, index) {
        const response = await axios.put("/posts/" + postId, {
            likePost: true,
            likedFrom: userId,
        });

        if (response.status === 200) {
            setLikedPosts(response.data.likedPosts);

            console.log(response.data.likedPosts);

            setPosts((oldPosts) => {
                let newPosts = [...oldPosts];
                newPosts[index] = {
                    ...newPosts[index],
                    likes: response.data.updatedPost.likes,
                };

                return newPosts;
            });
        }
    }

    function viewCommentsHandler(index) {
        if (commentsIndexes.includes(index)) {
            setCommentsIndexes((oldValue) => {
                const newValue = oldValue.filter((value) => value !== index);

                return newValue;
            });
        } else {
            setCommentsIndexes((oldValue) => {
                const newValue = [...oldValue, index];

                return newValue;
            });
        }
    }

    //Visualize or hide menu for the specific post
    function postMenuHandler(index) {
        if (postMenu === -1) {
            setPostMenu(index);
        } else {
            setPostMenu(-1);
        }
    }

    return (
        <div className="w-1/2 h-full max-h-full flex flex-col items-center overflow-y-scroll gap-10">
            {posts.map((post, index) => (
                <div
                    key={post.id}
                    className="flex flex-col gap-2 bg-blue-950 w-3/4 mt-3 mb-3 p-3 rounded-lg relative"
                    style={{
                        backgroundColor: "#181233",
                        border: "3px solid #110d21",
                    }}
                >
                    {/*Button to visualize the menu for a post. Only accessed from the poster*/}
                    {post.poster === userId && (
                        <button
                            className="text-gray-700 text-2xl font-bold self-end absolute"
                            onClick={() => postMenuHandler(index)}
                        >
                            ...
                        </button>
                    )}

                    {/*Menu buttons for the post. Only accessed from the poster*/}
                    {postMenu === index && (
                        <div className="flex flex-col gap-2 self-end absolute top-12 z-50">
                            <button className="border-2 border-gray-700 rounded-lg p-2 bg-purple-800">
                                Update post
                            </button>
                            <button
                                className="border-2 border-gray-700 rounded-lg p-2 bg-red-800"
                                onClick={async () => {
                                    const filteredPosts =
                                        await deletePostHandler(post.id, posts);

                                    setPosts(filteredPosts);
                                }}
                            >
                                Delete post
                            </button>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <img
                            className="w-12 h-12 rounded-full"
                            src={post.imagePath}
                        />
                        <p>{post.firstName}</p>
                        <p>{post.lastName}</p>
                        <p className="text-gray-700">
                            ⚈ {post.created_at.calcTimeOFStringDate()}
                        </p>
                    </div>
                    <div>
                        <p className="text-lg">{post.name}</p>
                        <p className="text-gray-600">{post.description}</p>
                    </div>
                    <ImageSlider images={post.images} />
                    <div className="flex gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => likePostHandler(post.id, index)}
                            >
                                {likedPosts.includes(post.id) ? "❤️" : "🤍"}
                            </button>
                            <p>{post.likes} likes</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => viewCommentsHandler(index)}>
                                🌐
                            </button>
                            <p>{post.comments.length} comments</p>
                        </div>
                    </div>
                    {commentsIndexes.includes(index) && (
                        <PostCommentsSection postId={post.id} userId={userId} />
                    )}
                </div>
            ))}
        </div>
    );
}
