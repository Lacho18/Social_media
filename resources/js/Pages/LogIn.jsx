import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function LogIn() {
    const [logInData, setLogInData] = useState({});
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
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label for="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="Email"
                    />
                </div>

                <div>
                    <label for="password">Email</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Password"
                    />
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
