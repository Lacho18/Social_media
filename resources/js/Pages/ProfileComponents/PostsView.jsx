import axios from "axios";
import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import PostCommentsSection from "./PostCommentsSection";

export default function PostsView({ userId, userLikedPosts }) {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState(userLikedPosts);
    const [commentsIndexes, setCommentsIndexes] = useState([]);

    console.log(likedPosts);

    useEffect(() => {
        async function getPosts() {
            const response = await axios.get("/posts?user=" + userId);

            if (response.status === 200) {
                console.log(response.data.message);
                console.log(response.data.postsData[0]);
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
        console.log(commentsIndexes);
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

    return (
        <div className="w-1/2 h-full max-h-full flex flex-col items-center overflow-y-scroll gap-10">
            {posts.map((post, index) => (
                <div
                    key={post.id}
                    className="flex flex-col gap-2 bg-blue-950 w-3/4 mt-3 mb-3 p-3 rounded-lg"
                    style={{
                        backgroundColor: "#181233",
                        border: "3px solid #110d21",
                    }}
                >
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
