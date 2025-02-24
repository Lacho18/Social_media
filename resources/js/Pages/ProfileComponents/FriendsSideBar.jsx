import { useEffect, useState } from "react";
import { useGlobalState } from "../context/userContext";
import ProfileSideBar from "./ProfileSideBar";
import axios from "axios";
import { Link } from "@inertiajs/react";

export default function FriendsSideBar() {
    const { globalUser, setGlobalUser } = useGlobalState();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        async function getFriends() {
            const response = await axios.get(
                `/findUsers/friends/${globalUser.id}`
            );

            if (response.status === 200) {
                setFriends(response.data.friendsData);
            }
        }

        getFriends();
    }, []);

    return (
        <div className="w-1/4 h-full p-3">
            <div className="border-2 h-full p-2 rounded-2xl border-blue-900">
                <p className="text-2xl mb-3">Friends</p>
                <div className="border-t-2 border-blue-950 flex flex-col gap-2">
                    {friends.length > 0 ? (
                        friends.map((user) => (
                            <ProfileSideBar user={user} addButton={false} />
                        ))
                    ) : (
                        <p className="text-center m-3 text-sm">
                            Add friends from recommendation sidebar. If they
                            accept they will be displayed here.
                        </p>
                    )}
                </div>
                <div className="flex justify-center">
                    <Link
                        href="/friends"
                        className="italic underline text-gray-500"
                    >
                        View more
                    </Link>
                </div>
            </div>
        </div>
    );
}
