import { useForm } from "@inertiajs/react";
import ProfileSideBar from "./ProfileSideBar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecommendationsSideBar({
    currentUserId,
    friendRequestHandler,
    sendedRequests,
}) {
    const [recommendedUsers, setRecommendedUsers] = useState([]);

    useEffect(() => {
        async function getRecommendations() {
            const response = await axios.get(
                `/findUsers/recommendations/${currentUserId}`
            );

            console.log(response.data);

            if (response.status === 200) {
                setRecommendedUsers(response.data.users);
            }
        }
        getRecommendations();
    }, []);

    if (recommendedUsers.length == 0) {
        return (
            <div>
                <p>No users found</p>
            </div>
        );
    }

    return (
        <div className="w-1/4 h-full p-3">
            <div className="border-2 h-full p-2 rounded-2xl border-blue-900">
                <p className="text-2xl mb-3">Recommendation</p>
                <div className="border-t-2 border-blue-950 flex flex-col gap-2">
                    {recommendedUsers.map((user) => (
                        <ProfileSideBar
                            key={user.id}
                            user={user}
                            addButton={true}
                            friendRequestHandler={friendRequestHandler}
                            sendedRequests={sendedRequests}
                        />
                    ))}
                </div>
                <div className="flex justify-center">
                    <button className="italic underline text-gray-500">
                        View more
                    </button>
                </div>
            </div>
        </div>
    );
}
