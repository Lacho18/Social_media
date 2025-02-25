import { useState } from "react";

export default function ProfilePage() {
    /*
        1. Vish kak da vzemesh parametura ot route
        2. Napravi personalnite stranici
        3. Napravi vruzki kum personalnite stranici kudeto trqbva
    */

    const [user, setUser] = useState(null);

    if (!user) {
        return (
            <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex justify-center items-center text-white">
                <p>This user does not exist!</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex text-white">
            <p>Personal profile page</p>
        </div>
    );
}
