import { usePage } from "@inertiajs/react";
import Layout from "./Layout";

export default function Profile() {
    const { user } = usePage().props;

    if (!user) {
        return (
            <Layout>
                <p className="text-3xl text-red-500">
                    You should log in to a valid profile in order to access this
                    page
                </p>
            </Layout>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex justify-center items-center">
            <div className="w-full h-10 bg-green-500"></div>
        </div>
    );
}
