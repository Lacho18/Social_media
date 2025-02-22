export default function ProfileSideBar({ user }) {
    return (
        <div
            className="flex justify-between p-2 border-4 border-blue-700 rounded-3xl m-3"
            style={{ borderColor: "#2d2a5c" }}
        >
            <div className="flex gap-3 items-center">
                <img className="w-12 h-12 rounded-full" src={user.image} />
                <div className="flex">
                    <p className="mr-2">{user.firstName}</p>
                    <p>{user.lastName}</p>
                </div>
            </div>
            <div className="flex items-center">
                <button className="bg-blue-950 p-2 rounded-xl border-2 border-blue-800">
                    Add friend
                </button>
            </div>
        </div>
    );
}
