import axios from "axios";
import { useEffect, useState } from "react";
import ProfileSideBar from "../ProfileSideBar";

//Logicata e pravilna. Napravi takache da visualizirash resultatite

export default function SearchResult({ searchText, userRequests }) {
    const [findResults, setFindUsers] = useState([]);

    useEffect(() => {
        async function getSearchedUsers() {
            const response = await axios.get("/searchUsers", {
                params: {
                    searchText,
                },
            });

            if (response.status === 200) {
                console.log(response.data.message);
                console.log(response.data.users);
                setFindUsers(response.data.users);
            }
        }

        if (searchText !== "") {
            getSearchedUsers();
        }
    }, [searchText]);

    return (
        <div className="w-1/3 h-1/3 rounded bg-gray-800 absolute left-1/2 top-14 z-30 transform -translate-x-1/2 p-3 overflow-y-scroll">
            {findResults.map((result) => (
                <ProfileSideBar
                    key={result.id}
                    user={result}
                    addButton={false}
                    friendRequestHandler={() => {}}
                    sendedRequests={userRequests}
                />
            ))}
        </div>
    );
}
