<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class GetUsersController extends Controller
{
    //Gets the user by given id. This data is used to visualize data on personalPage of the user
    public function getUser(Request $request, $userID) {
        $user = User::select('id', 'firstName', 'lastName', 'dateOfBirth', 'friends', 'imagePath', 'created_at')->where('id', $userID);

        return response()->json(['message' => "Successful request", 'user' => $user]);
    }

    //Get recommendations for the user
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

    //Get necessary visual data for the friends of the given user
    public function getFriends(Request $request, $currentUserID) {
        $currentUser = User::find($currentUserID);
        $friends = $currentUser->friends;

        $friendsData = User::select("id", "firstName", "lastName", "imagePath")->whereIn('id', $friends)->get();

        return response()->json(['message' => "Successful request!", "friendsData" => $friendsData]);
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
            "senderId" => $sender->id,
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
    
    public function acceptRequest(Request $request) {
        $sender = User::find($request->senderId);
        $receiver = User::find($request->receiverId);

        //Removes the receiver id from sendedRequests array
        $sendedRequest = $sender->sendedRequest;
        if(in_array($request->receiverId, $sendedRequest)) {
            $sendedRequest = array_values(array_filter($sendedRequest, function($element) use ($request) {
                return $element != $request->receiverId;
            }));
            Log::debug(['data' => $sendedRequest]);
        }
        $sender->sendedRequest = $sendedRequest;

        //Adding receiverId to friends array of the sender
        $senderFriends = $sender->friends;
        if(!in_array($request->receiverId, $senderFriends)) {
            array_push($senderFriends, $request->receiverId);
        }
        $sender->friends = $senderFriends;

        //Adding senderId to friends array of the receiver
        $receiverFriends = $receiver->friends;
        if(!in_array($request->senderId, $receiverFriends)) {
            array_push($receiverFriends, $request->senderId);
        }
        $receiver->friends = $receiverFriends;

        //Removing the friend request from requests array of the receiver
        $receiverRequests = $receiver->requests;
        $receiverRequests = array_values(array_filter($receiverRequests, function($element) use ($request) {
            return $element["senderId"] != $request->senderId;
        }));
        $receiver->requests = $receiverRequests; 

        //Applying the changes to the database
        $sender->save();
        $receiver->save();

        return response()->json(['message' => "Successful request!", 'user' => $receiver]);
    }

    public function deniedRequest(Request $request) {
        $sender = User::find($request->senderId);
        $receiver = User::find($request->receiverId);

        //Removes receiver id from sendedRequest array of the sender
        $sendedRequest = $sender->sendedRequest;
        if(in_array($request->receiverId, $sendedRequest)) {
            $sendedRequest = array_values(array_filter($sendedRequest, function($element) use ($request) {
                return $element != $request->receiverId;
            }));
        }
        $sender->sendedRequest = $sendedRequest;

        //Add the receiver id to rejectedRequests field of the sender
        $rejectedRequests = $sender->rejectedRequests;
        if(!in_array($request->receiverId, $rejectedRequests)) {
            array_push($rejectedRequests, $request->receiverId);
        }
        $sender->rejectedRequests = $rejectedRequests;

        //Removing the friend request from requests array of the receiver
        $receiverRequests = $receiver->requests;
        $receiverRequests = array_values(array_filter($receiverRequests, function($element) use ($request) {
            return $element["senderId"] != $request->senderId;
        }));
        $receiver->requests = $receiverRequests; 

        //Applying the changes to the database
        $sender->save();
        $receiver->save();

        return response()->json(['message' => "Successful request", 'user' => $receiver]);
    }
}
