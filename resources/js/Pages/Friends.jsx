import { useEffect, useState } from "react";
import { useGlobalState } from "./context/userContext";
import Layout from "./Layout";
import Header from "./ProfileComponents/HeaderComponents/Header";
import ProfileSideBar from "./ProfileComponents/ProfileSideBar";

export default function Friends() {
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
        <div class="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex flex-col">
            <Header
                userId={globalUser.id}
                image={globalUser.imagePath}
                firstName={globalUser.firstName}
                lastName={globalUser.lastName}
                userRequests={globalUser.requests}
                onImageClick={() => {}}
            />
            <div>
                <p className="text-3xl m-2 text-white font-bold">
                    Friends list
                </p>
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <ProfileSideBar user={friend} addButton={false} />
                    ))
                ) : (
                    <p>No friends found!</p>
                )}
            </div>
        </div>
    );
}
