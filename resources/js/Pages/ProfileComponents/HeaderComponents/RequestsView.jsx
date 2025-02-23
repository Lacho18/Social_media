export default function RequestsView({ userRequests }) {
    return (
        <div
            className="absolute w-3/5 min-h-64 bg-blue-800 mt-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden flex flex-col rounded-md"
            style={{ backgroundColor: "#516691", border: "1px solid #8fa3cc" }}
        >
            {userRequests.length > 0 ? (
                userRequests.map((request) => (
                    <div>
                        <div>
                            <p>{request.madeAtDate}</p>
                            <p>{request.context}</p>
                            {request.requiredAnswer && (
                                <div>
                                    <button>Yes</button>
                                    <button>No</button>
                                </div>
                            )}
                        </div>
                        <div>
                            <img src={request.senderImage} />
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex justify-center items-center text-white text-3xl font-bold h-full">
                    <p>No requests so far</p>
                </div>
            )}
        </div>
    );
}
