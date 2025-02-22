import { useForm } from "@inertiajs/react";

export default function MenusView() {
    const { post } = useForm();

    function logoutHandler() {
        post("/logout");
    }

    return (
        <div className="absolute w-1/5 bg-blue-900 mt-20 left-3/4">
            <button onClick={logoutHandler}>Log out</button>
        </div>
    );
}
