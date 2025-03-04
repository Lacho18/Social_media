import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import RequestsView from "./RequestsView";
import DeleteProfile from "./DeleteProfile";

export default function MenusView({ userRequests, userId }) {
    const { post } = useForm();

    const [requestsView, setRequestsView] = useState(false);
    const [deleteProfileView, setDeleteProfileView] = useState(false);

    const buttonStyle =
        "p-1 text-white text-xl m-2 border-2 border-white rounded-xl";

    function logoutHandler() {
        post("/logout");
    }

    if (requestsView) {
        return <RequestsView userRequests={userRequests} userId={userId} />;
    }

    if (deleteProfileView) {
        return (
            <DeleteProfile
                userId={userId}
                denyDeletingProfile={() => setDeleteProfileView(false)}
            />
        );
    }

    return (
        <div className="absolute w-1/5 bg-blue-950 mt-20 left-3/4 top-1.5 overflow-hidden flex flex-col">
            <button className={buttonStyle} onClick={logoutHandler}>
                Log out
            </button>
            <button className={buttonStyle}>
                <Link href={"/profilePage/" + userId}>Profile</Link>
            </button>
            <button className={buttonStyle}>
                <Link href="/newPost">Create post</Link>
            </button>
            <button
                className={buttonStyle}
                onClick={() => setRequestsView(true)}
            >
                {userRequests.length > 0 && (
                    <div className="w-5 h-5 text-sm bg-orange-500 absolute flex justify-center items-center rounded-full text-black font-bold">
                        <p>{userRequests.length}</p>
                    </div>
                )}
                <p>Requests</p>
            </button>
            <button className={buttonStyle}>
                <Link href="/friends">Friends</Link>
            </button>
            <button
                className={buttonStyle}
                onClick={() => setDeleteProfileView(true)}
            >
                Delete profile
            </button>
        </div>
    );
}
