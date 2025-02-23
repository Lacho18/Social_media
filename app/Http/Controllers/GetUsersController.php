<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

class GetUsersController extends Controller
{
    public function getRecommendations(Request $request, $currentUserID) {
        try {
            $currentUser = User::find($currentUserID);

            if(!$currentUser) {
                throw new Exception;
            }

            //$friendsArray = json_decode($currentUser->friends);
            $friendsArray = $currentUser->friends;
            array_push($friendsArray, $currentUserID);
            $users = User::select('id', 'firstName', 'lastName', 'imagePath')->whereNotIn('id', $friendsArray)->limit(5)->get();

            return response()->json([
                'users' => $users
            ]);
        }
        catch(Exception $e) {
            return response()->json(['message' => "I don't know"]);
        }
    }

    //Creates friend request and add it to the receiver requests field
    public function friendRequest(Request $request) {
        // Validate the input
        $request->validate([
            'senderId' => 'required|exists:users,id',
            'receiverId' => 'required|exists:users,id',
        ]);
    
        $sender = User::find($request->senderId);
        $receiver = User::find($request->receiverId);
    
        if (!$sender || !$receiver) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $requestContext = $sender->firstName . " " . $sender->lastName . " sent you a friend request!";
        $newRequest = [
            "context" => $requestContext,
            "senderImage" => $sender->imagePath !== "null" ? $sender->imagePath : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
            "requiredAnswer" => true,
            "madeAtDate" => Carbon::now()
        ];
    
        // Ensure sendedRequests and requests are arrays before modifying
        $sendedRequests = is_array($sender->sendedRequest) ? $sender->sendedRequest : [];
        $requestsArray = is_array($receiver->requests) ? $receiver->requests : [];
    
        // Prevent duplicate friend requests
        if (in_array($request->receiverId, $sendedRequests)) {
            return response()->json(['error' => 'Friend request already sent'], 400);
        }
    
        // Add receiver to sender's sendedRequests
        $sendedRequests[] = $request->receiverId;
        $sender->sendedRequest = $sendedRequests;
        $sender->save();
    
        // Add request to receiver's requests
        $requestsArray[] = $newRequest;
        $receiver->requests = $requestsArray;
        $receiver->save();
    
        return response()->json(['message' => "Friend request sent successfully!", 'user' => $sender]);
    }    
}
