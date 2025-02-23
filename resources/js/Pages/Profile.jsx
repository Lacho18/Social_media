import { useForm, usePage } from "@inertiajs/react";
import Layout from "./Layout";
import Header from "./ProfileComponents/HeaderComponents/Header";
import { useState } from "react";
import AskWindow from "./ProfileComponents/AskWindow";
import FriendsSideBar from "./ProfileComponents/FriendsSideBar";
import PostsView from "./ProfileComponents/PostsView";
import RecommendationsSideBar from "./ProfileComponents/RecommendationsSideBar";
import axios from "axios";

/*
    Friend requests raboti!
    1. Napravi taka che vizualno da se promenq sled prashtane na pokana da ne moje da se prati pak
    2. Dobavi prozorec kudeto da se vizualizirat requestovete, kato ako sa s vupros da moje da im se otgovarq
*/

export default function Profile() {
    const { user } = usePage().props;

    console.log(user);

    const { data, setData, post, errors } = useForm({
        image: null,
    });

    const [changeProfileImage, setChangeProfileImage] = useState(false);

    //A state that visualize the updated profile image dynamically
    const [userImage, setUserImage] = useState(user.imagePath);

    //A state to change the add button on recommendations to something else after ending request
    const [sendedRequests, setSendedRequests] = useState(user.sendedRequest);

    //Updates profile image
    function setNewImage() {
        post("/userImage/" + user.id, {
            preserveState: true,
            preserveScroll: true,
            only: ["image"],
            onSuccess: ({ props }) => {
                setUserImage(props.image);
            },
        });
    }

    //Function that handles a friend request send
    async function friendRequestHandler(receiverId) {
        const response = await axios.post(`/findUsers/friendRequest`, {
            senderId: user.id,
            receiverId: receiverId,
        });

        if (response.status === 200) {
            setSendedRequests((oldValue) => {
                const newValue = response.data.user.sendedRequest;

                return newValue;
            });
        }
    }

    if (!user) {
        return (
            <Layout>
                <p className="text-3xl text-red-500">
                    You should log in to a valid profile in order to access this
                    page
                </p>
            </Layout>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex flex-col">
            <Header
                userId={user.id}
                image={userImage}
                firstName={user.firstName}
                lastName={user.lastName}
                userRequests={user.requests}
                onImageClick={() => setChangeProfileImage(true)}
            />
            <div className="h-[calc(100vh-70px)] flex text-white">
                <FriendsSideBar />
                <PostsView />
                <RecommendationsSideBar
                    currentUserId={user.id}
                    friendRequestHandler={friendRequestHandler}
                    sendedRequests={sendedRequests}
                />
            </div>
            {changeProfileImage && (
                <AskWindow
                    closeWindow={() => setChangeProfileImage(false)}
                    setNewImage={setNewImage}
                    setData={setData}
                />
            )}
        </div>
    );
}
