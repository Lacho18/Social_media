import axios from "axios";
import { useEffect, useState } from "react";

export default function PostCommentsSection({ postId, userId }) {
    const [comments, setComments] = useState([]);
    const [context, setContext] = useState("");

    useEffect(() => {
        async function getPostComments() {
            const response = await axios.get("/comments?postId" + postId);

            if (response.status === 200) {
                console.log(response.data.message);
                console.log(response.data.comments);

                setComments(response.data.comments);
            }
        }

        getPostComments();
    }, []);

    async function postComment() {
        if (context !== "") {
            const response = await axios.post("/comments", {
                context: context,
                postId: postId,
                userId: userId,
            });

            if (response.status === 200) {
                console.log(response.data.newComment);

                setComments((oldComments) => {
                    const newComments = [
                        ...oldComments,
                        response.data.newComment,
                    ];

                    return newComments;
                });
            }
        }
    }

    if (comments[0]) {
        console.log(comments[0].postId === postId);
        console.log(postId);
    }

    return (
        <div className="w-full">
            <div className="w-full max-h-52 h-auto flex flex-col gap-2 overflow-y-scroll">
                {comments.map((comment) => {
                    if (comment.postId === postId) {
                        return (
                            <div key={comment.id}>
                                <div className="flex items-center gap-4">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={comment.imagePath}
                                        alt="User Avatar"
                                    />
                                    <p>
                                        <span className="font-bold mr-3">
                                            {comment.firstName}{" "}
                                            {comment.lastName}
                                        </span>
                                        {comment.context}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-700">
                                    {comment?.created_at.calcTimeOFStringDate()}
                                </p>
                            </div>
                        );
                    }
                    return null; // Ensures `.map()` does not return `undefined`
                })}
            </div>
            <div className="mt-3 p-3">
                <input
                    className="w-full p-1 rounded text-gray-500"
                    type="text"
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Comment"
                    style={{
                        backgroundColor: "#221b42",
                    }}
                />
                <button
                    className="mt-2 p-2 rounded-lg border-2 border-blue-950 bg-blue-800"
                    onClick={postComment}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
