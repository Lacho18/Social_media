import { useForm, usePage } from "@inertiajs/react";
import Layout from "./Layout";
import Header from "./ProfileComponents/Header";
import { useState } from "react";
import AskWindow from "./ProfileComponents/AskWindow";
import FriendsSideBar from "./ProfileComponents/FriendsSideBar";
import PostsView from "./ProfileComponents/PostsView";
import RecommendationsSideBar from "./ProfileComponents/RecommendationsSideBar";
import axios from "axios";

export default function Profile() {
    const { user } = usePage().props;

    const { data, setData, post, errors } = useForm({
        image: null,
    });

    const [changeProfileImage, setChangeProfileImage] = useState(false);

    //A state that visualize the updated profile image dynamically
    const [userImage, setUserImage] = useState(user.imagePath);

    //A state to change the add button on recommendations to something else after ending request
    const [sendedRequests, setSendedRequests] = useState(user.sendedRequests);

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
        console.log("Nigga 1");

        const response = await axios.post(`/findUsers/friendRequest`, {
            senderId: user.id,
            receiverId: receiverId,
        });

        console.log("Nigga 2");

        if (response.status === 200) {
            setSendedRequests((oldValue) => {
                const newValue = response.data.user.sendedRequests;

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
                image={userImage}
                firstName={user.firstName}
                lastName={user.lastName}
                onImageClick={() => setChangeProfileImage(true)}
            />
            <div className="h-[calc(100vh-70px)] flex text-white">
                <FriendsSideBar />
                <PostsView />
                <RecommendationsSideBar
                    currentUserId={user.id}
                    friendRequestHandler={friendRequestHandler}
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
