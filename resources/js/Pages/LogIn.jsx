import { useForm } from "@inertiajs/react";
import Layout from "./Layout";

export default function LogIn() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        rememberMe: false,
    });

    function changeHandler(e) {
        setData((oldData) => {
            return { ...oldData, [e.target.name]: e.target.value };
        });
    }

    function submitHandler(e) {
        e.preventDefault();

        post("/login");
    }

    return (
        <Layout>
            <form onSubmit={submitHandler} className="flex flex-col gap-3">
                <div className="flex flex-col">
                    <label for="email" className="text-left text-gray-300 mb-1">
                        Enter your email
                    </label>
                    <input
                        type="text"
                        className="p-2 rounder bg-blue-200"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        for="password"
                        className="text-left text-gray-300 mb-1"
                    >
                        Enter your password
                    </label>
                    <input
                        type="password"
                        className="p-2 rounder bg-blue-200"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                <div className="flex justify-start gap-2">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        value={data.rememberMe}
                        onChange={(e) => setData("rememberMe", e.target.value)}
                    />
                    <label for="rememberMe" className="text-gray-300">
                        Remember me
                    </label>
                </div>
                <input
                    type="submit"
                    value="Log in"
                    class="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded shadow-lg mt-4"
                />
            </form>
        </Layout>
    );
}
