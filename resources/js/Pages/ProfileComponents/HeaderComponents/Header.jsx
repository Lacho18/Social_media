import { useState } from "react";
import MenusView from "./MenusView";
import SearchResult from "./SearchResults";

export default function Header({
    userId,
    image,
    firstName,
    lastName,
    userRequests,
    onImageClick,
}) {
    const [menu, setMenu] = useState(false);
    const [searchText, setSearchText] = useState("");

    return (
        <div className="flex w-full h-16 bg-blue-900 justify-between items-center pl-4 pr-4">
            <div className="flex gap-3 items-center">
                <img
                    className="w-12 h-12 rounded-full"
                    onClick={onImageClick}
                    src={
                        image !== "null"
                            ? image
                            : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                    }
                />
                <div className="flex gap-1 font-bold text-2xl">
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                </div>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="🔍 Search"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div>
                <button
                    className="w-12 h-12"
                    onClick={() => setMenu((oldValue) => !oldValue)}
                >
                    <img
                        className="w-full h-full"
                        src="https://www.freeiconspng.com/thumbs/menu-icon/menu-icon-24.png"
                    />
                </button>
            </div>
            {menu && <MenusView userRequests={userRequests} userId={userId} />}
            {searchText !== "" && (
                <SearchResult
                    searchText={searchText}
                    userRequests={userRequests}
                />
            )}
        </div>
    );
}
