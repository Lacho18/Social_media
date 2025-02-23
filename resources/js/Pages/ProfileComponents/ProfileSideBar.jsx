export default function ProfileSideBar({
    user,
    addButton,
    friendRequestHandler,
    sendedRequests,
}) {
    return (
        <div
            className="flex justify-between p-2 border-4 border-blue-700 rounded-3xl m-3"
            style={{ borderColor: "#2d2a5c" }}
        >
            <div className="flex gap-3 items-center">
                <img
                    className="w-12 h-12 rounded-full"
                    src={
                        user.imagePath !== "null"
                            ? user.imagePath
                            : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                    }
                />
                <div className="flex">
                    <p className="mr-2">{user.firstName}</p>
                    <p>{user.lastName}</p>
                </div>
            </div>
            <div className="flex items-center">
                {addButton &&
                    (!sendedRequests.includes(user.id) ? (
                        <button
                            className="bg-blue-950 p-2 rounded-xl border-2 border-blue-800"
                            onClick={() => friendRequestHandler(user.id)}
                        >
                            Add friend
                        </button>
                    ) : (
                        <div className="w-10 h-10 rounded-full p-1 bg-green-500 text-center mr-5">
                            ✔️
                        </div>
                    ))}
            </div>
        </div>
    );
}
