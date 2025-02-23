import { useForm } from "@inertiajs/react";
import { useState } from "react";
import RequestsView from "./RequestsView";

export default function MenusView({ userRequests }) {
    const { post } = useForm();

    const [requestsView, setRequestsView] = useState(false);

    function logoutHandler() {
        post("/logout");
    }

    if (requestsView) {
        return <RequestsView userRequests={userRequests} />;
    }

    return (
        <div className="absolute w-1/5 bg-blue-950 mt-20 left-3/4 overflow-hidden flex flex-col">
            <button
                className="p-1 text-white text-xl m-2 border-2 border-white rounded-xl"
                onClick={logoutHandler}
            >
                Log out
            </button>
            <button
                className="p-1 text-white text-xl m-2 border-2 border-white rounded-xl"
                onClick={() => setRequestsView(true)}
            >
                {userRequests.length > 0 && (
                    <div className="w-5 h-5 text-sm bg-orange-500 absolute flex justify-center items-center rounded-full text-black font-bold">
                        <p>{userRequests.length}</p>
                    </div>
                )}
                <p>Requests</p>
            </button>
        </div>
    );
}
