import { useForm, usePage } from "@inertiajs/react";
import Layout from "./Layout";
import Header from "./ProfileComponents/Header";
import { useState } from "react";
import AskWindow from "./ProfileComponents/AskWindow";
import FriendsSideBar from "./ProfileComponents/FriendsSideBar";
import PostsView from "./ProfileComponents/PostsView";
import RecommendationsSideBar from "./ProfileComponents/RecommendationsSideBar";

export default function Profile() {
    const { user } = usePage().props;

    console.log(user);

    const { data, setData, post, errors } = useForm({
        image: null,
    });

    const [changeProfileImage, setChangeProfileImage] = useState(false);

    //A state that visualize the updated profile image dynamically
    const [userImage, setUserImage] = useState(user.imagePath);

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
                <RecommendationsSideBar />
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
