import axios from "axios";
import { useGlobalState } from "../../context/userContext";

export default function RequestsView({ userRequests, userId }) {
    const { globalUser, setGlobalUser } = useGlobalState();

    //Function that handles the acceptance and deny of the friend request
    async function yesNoButtonHandler(senderId, yesClicked) {
        const method = yesClicked ? "acceptRequest" : "deniedRequest";

        const response = await axios.post("/findUsers/" + method, {
            senderId: senderId,
            receiverId: userId,
        });

        if (response.status === 200) {
            setGlobalUser(response.data.user);
        }
    }

    return (
        <div
            className="absolute w-3/5 min-h-64 max-h-68 overflow-scroll bg-blue-800 mt-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-md z-40"
            style={{ backgroundColor: "#516691", border: "1px solid #8fa3cc" }}
        >
            {userRequests.length > 0 ? (
                userRequests.map((request) => {
                    const date = new Date(request.madeAtDate);
                    return (
                        <div
                            className="w-full max-w-full mx-auto p-4 h-28 flex border-2 mb-3"
                            style={{ boxSizing: "border-box" }}
                        >
                            <div className="w-9/12 flex flex-col gap-2">
                                <p className="text-gray-800 text-sm italic">
                                    {date.getDate()}.{date.getMonth()}.
                                    {date.getFullYear()}
                                </p>
                                <p className="self-end">{request.context}</p>
                                {request.requiredAnswer && (
                                    <div className="self-end">
                                        <button
                                            className="p-1 mr-4 bg-green-500"
                                            onClick={() =>
                                                yesNoButtonHandler(
                                                    request.senderId,
                                                    true
                                                )
                                            }
                                        >
                                            Yes
                                        </button>
                                        <button
                                            className="p-1 mr-4 bg-red-500"
                                            onClick={() =>
                                                yesNoButtonHandler(
                                                    request.senderId,
                                                    false
                                                )
                                            }
                                        >
                                            No
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="w-3/12 flex justify-center items-centers">
                                <img
                                    className="rounded-full"
                                    src={request.senderImage}
                                />
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex justify-center items-center text-white text-3xl font-bold h-full">
                    <p>No requests so far</p>
                </div>
            )}
        </div>
    );
}
