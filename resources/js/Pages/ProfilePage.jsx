import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useGlobalState } from "./context/userContext";

export default function ProfilePage() {
    /*
        1. Vish kak da vzemesh parametura ot route
        2. Napravi personalnite stranici
        3. Napravi vruzki kum personalnite stranici kudeto trqbva
    */

    const { userId } = usePage().props;
    const { globalUser, setGlobalUser } = useGlobalState();
    const [user, setUser] = useState(null);
    const areFriends = useRef(false);

    console.log(areFriends);

    useEffect(() => {
        async function getUser() {
            console.log("/findUsers/getUser/" + userId);
            const response = await axios.get("/findUsers/getUser/" + userId);

            if (response.status === 200) {
                console.log(response.data);
                setUser(response.data.user);
                areFriends.current = globalUser.friends.includes(userId);
            }
        }

        getUser();
    }, []);

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
                            src={user.imagePath}
                        />
                    </div>
                    <div className="w-2/3 mt-2">
                        <div className="flex items-center gap-4">
                            <p className="text-xl font-bold">
                                {user.firstName} {user.lastName}
                            </p>
                            {areFriends.current ? (
                                <p className="p-2 border-2 border-black rounded bg-gray-800">
                                    friends ✔️
                                </p>
                            ) : (
                                <button className="p-2 bg-blue-500 rounded">
                                    Add friend
                                </button>
                            )}
                        </div>
                        <div className="flex">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
