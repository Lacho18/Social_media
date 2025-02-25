import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useGlobalState } from "./context/userContext";

export default function ProfilePage() {
    const { userId } = usePage().props;
    const { globalUser, setGlobalUser } = useGlobalState();
    const [user, setUser] = useState(null);
    const areFriends = useRef(false);

    useEffect(() => {
        async function getUser() {
            console.log("/findUsers/getUser/" + userId);
            const response = await axios.get("/findUsers/getUser/" + userId);

            if (response.status === 200) {
                console.log(response.data);
                setUser(() => {
                    let userData = response.data.user;
                    userData.dateOfBirth = new Date(
                        response.data.user.dateOfBirth
                    );
                    userData.created_at = new Date(
                        response.data.user.created_at
                    );

                    return userData;
                });
                areFriends.current = globalUser.friends.includes(userId);
            }
        }

        getUser();
    }, []);

    async function friendRequestHandler(receiverId) {
        const response = await axios.post(`/findUsers/friendRequest`, {
            senderId: globalUser.id,
            receiverId: receiverId,
        });

        if (response.status === 200) {
            console.log(response.data.message);
            setGlobalUser(response.data.user);
        }
    }

    if (!user) {
        return (
            <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex justify-center items-center text-white">
                <p className="text-3xl font-bold">This user does not exist!</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex justify-center text-white">
            <div className="w-9/12 border-l-4 border-r-4 border-blue-950 rounded-xl">
                <div className="w-full h-64 flex">
                    <div className="w-1/3 flex justify-center items-center">
                        <img
                            className="w-40 h-40 rounded-full"
                            src={
                                user.imagePath !== "null"
                                    ? user.imagePath
                                    : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                            }
                        />
                    </div>
                    <div className="w-2/3 mt-2 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-xl font-bold">
                                {user.firstName} {user.lastName}
                            </p>
                            {areFriends.current ? (
                                <p className="p-2 border-2 border-black rounded bg-gray-800">
                                    Friends ✔️
                                </p>
                            ) : globalUser.sendedRequest.includes(user.id) ? (
                                <p className="p-2 bg-green-500 border-2 border-green-900 rounded">
                                    Sended request
                                </p>
                            ) : (
                                <button
                                    className="p-2 bg-blue-500 rounded"
                                    onClick={() =>
                                        friendRequestHandler(user.id)
                                    }
                                >
                                    Add friend
                                </button>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <div className="p-3 flex flex-col justify-center items-center border-2 border-gray-900 bg-gray-800 rounded-lg">
                                <p className="font-bold text-2xl">
                                    {user.posts.length}
                                </p>
                                <p>Posts</p>
                            </div>
                            <div className="p-3 flex flex-col justify-center items-center border-2 border-gray-900 bg-gray-800 rounded-lg">
                                <p className="font-bold text-2xl">
                                    {user.friends.length}
                                </p>
                                <p>Friends</p>
                            </div>
                        </div>
                        <div>
                            <p>{user.dateOfBirth.calculateAge()} years old</p>
                            <p>Birthday: {user.dateOfBirth.formatDate()}</p>
                            <p>
                                Account since:{" "}
                                {user.created_at.calculateTimeDistance()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-gray-700 rounded-xl m-4 p-2">
                    <p>Hello</p>
                </div>
            </div>
        </div>
    );
}
