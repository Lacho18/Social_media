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
        <div>
            <h1>Profile page</h1>
        </div>
    );
}
