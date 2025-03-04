import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchResult({ searchText }) {
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
        <div className="w-1/3 h-32 rounded bg-gray-800 absolute left-1/2 top-14 z-30 transform -translate-x-1/2 p-3">
            <p>Putki</p>
        </div>
    );
}
