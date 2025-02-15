import { Link } from "@inertiajs/react";
import Layout from "./Layout";

export default function Home({ name }) {
    return (
        <Layout>
            <div class="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-blue-500 shadow-lg w-96 text-center">
                <h1 class="text-4xl font-bold text-blue-400">
                    Welcome to <span class="text-white">Social Media</span>
                </h1>
                <p class="text-gray-300 italic mb-3">
                    Join us by creating an account
                </p>
                <Link
                    href="/signup"
                    class="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded shadow-lg mt-4"
                >
                    Sign Up
                </Link>
                <p class="text-gray-400 text-sm mt-2">
                    Already have an account?{" "}
                    <Link href="/login" class="text-blue-400 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </Layout>
    );
}
