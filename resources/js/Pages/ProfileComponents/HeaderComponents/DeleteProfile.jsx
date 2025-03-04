import { useForm } from "@inertiajs/react";

export default function DeleteProfile({ userId, denyDeletingProfile }) {
    const { delete: destroy } = useForm();

    async function deleteProfileHandler() {
        destroy("/users/" + userId);
    }

    return (
        <div className="w-1/3 h-40 bg-blue-900 rounded absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/2 z-50 text-white flex flex-col justify-evenly">
            <p className="text-xl font-bold text-red-500 text-center">
                Are you sure you want to permanently delete your account?
            </p>
            <div className="flex justify-evenly">
                <button
                    className="p-2 bg-green-500 rounded text-lg"
                    onClick={deleteProfileHandler}
                >
                    Yes
                </button>
                <button
                    className="p-2 bg-red-500 rounded text-lg"
                    onClick={denyDeletingProfile}
                >
                    No
                </button>
            </div>
        </div>
    );
}
