import { useForm } from "@inertiajs/react";
import Layout from "./Layout";

export default function SignUp() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
        password: "",
        password_confirmation: "",
    });

    function changeHandler(e) {
        setData(e.target.name, e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();

        post("/signup");
    }

    return (
        <Layout>
            <form className="flex flex-col gap-3" onSubmit={submitHandler}>
                <div className="flex flex-col">
                    <label for="email" className="text-left text-gray-300 mb-1">
                        Enter your <span className="font-bold">email</span>
                    </label>
                    <input
                        type="text"
                        className="p-2 rounder bg-blue-200"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        placeholder="Email"
                    />
                    {errors.email !== "" && (
                        <p className="error">{errors.email}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label
                        for="firstName"
                        className="text-left text-gray-300 mb-1"
                    >
                        Enter your <span className="font-bold">first name</span>
                    </label>
                    <input
                        type="text"
                        className="p-2 rounder bg-blue-200"
                        name="firstName"
                        value={data.firstName}
                        onChange={changeHandler}
                        placeholder="First name"
                    />
                    {errors.firstName !== "" && (
                        <p className="error">{errors.firstName}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label
                        for="lastName"
                        className="text-left text-gray-300 mb-1"
                    >
                        Enter your <span className="font-bold">last name</span>
                    </label>
                    <input
                        type="text"
                        className="p-2 rounder bg-blue-200"
                        name="lastName"
                        value={data.lastName}
                        onChange={changeHandler}
                        placeholder="Last name"
                    />
                    {errors.lastName !== "" && (
                        <p className="error">{errors.lastName}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label
                        for="dateOfBirth"
                        className="text-left text-gray-300 mb-1"
                    >
                        Enter your <span className="font-bold">birth date</span>
                    </label>
                    <input
                        type="date"
                        className="p-2 rounder bg-blue-200"
                        name="dateOfBirth"
                        value={data.dateOfBirth}
                        onChange={changeHandler}
                    />
                    {errors.dateOfBirth !== "" && (
                        <p className="error">{errors.dateOfBirth}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label
                        for="password"
                        className="text-left text-gray-300 mb-1"
                    >
                        Enter your <span className="font-bold">password</span>
                    </label>
                    <input
                        type="password"
                        className="p-2 rounder bg-blue-200"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        placeholder="Password"
                    />
                    {errors.password !== "" && (
                        <p className="error">{errors.password}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label
                        for="password_confirmation"
                        className="text-left text-gray-300 mb-1"
                    >
                        Confirm password
                    </label>
                    <input
                        type="password"
                        className="p-2 rounder bg-blue-200"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={changeHandler}
                        placeholder="Confirm password"
                    />
                </div>

                <input
                    type="submit"
                    value="Sign up"
                    class="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded shadow-lg mt-4"
                />
            </form>
        </Layout>
    );
}
