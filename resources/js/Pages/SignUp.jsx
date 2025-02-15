import Layout from "./Layout";

export default function SignUp() {
    return (
        <Layout>
            <form className="flex flex-col gap-3">
                <div className="flex flex-col">
                    <label for="email" className="text-left text-gray-300 mb-1">
                        Enter your <span className="font-bold">email</span>
                    </label>
                    <input
                        type="text"
                        className="p-2 rounder bg-blue-200"
                        name="email"
                        placeholder="Email"
                    />
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
                        placeholder="First name"
                    />
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
                        placeholder="Last name"
                    />
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
                    />
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
                        placeholder="Password"
                    />
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
                        placeholder="Confirm password"
                    />
                </div>

                <input
                    type="submit"
                    value="Submit"
                    class="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded shadow-lg mt-4"
                />
            </form>
        </Layout>
    );
}
