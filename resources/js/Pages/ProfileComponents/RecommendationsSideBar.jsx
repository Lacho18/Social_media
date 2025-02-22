import ProfileSideBar from "./ProfileSideBar";

export default function RecommendationsSideBar() {
    const testUsers = [
        {
            firstName: "Jinx",
            lastName: "",
            image: "https://pbs.twimg.com/media/FKhRuIQXoBwqBOB.jpg",
        },

        {
            firstName: "Vi",
            lastName: "",
            image: "https://i.pinimg.com/474x/57/cc/8f/57cc8fe98716d84e88dabea18d324374.jpg",
        },

        {
            firstName: "Caitlyn",
            lastName: "",
            image: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/caitlyn/skins/skin50/images/caitlyn_splash_tile_50.skins_caitlyn_skin50.jpg",
        },

        {
            firstName: "Ekko",
            lastName: "",
            image: "https://i.pinimg.com/originals/19/f7/2b/19f72b2d317060411790d17262e57781.jpg",
        },

        {
            firstName: "Viktor",
            lastName: "",
            image: "https://i.pinimg.com/474x/e7/98/b4/e798b460a9adb8118bf37110bb6a2b02.jpg",
        },
    ];

    return (
        <div className="w-1/4 h-full p-3">
            <div className="border-2 h-full p-2 rounded-2xl border-blue-900">
                <p className="text-2xl mb-3">Recommendation</p>
                <div className="border-t-2 border-blue-950 flex flex-col gap-2">
                    {testUsers.map((user) => (
                        <ProfileSideBar user={user} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <button className="italic underline text-gray-500">
                        View more
                    </button>
                </div>
            </div>
        </div>
    );
}
