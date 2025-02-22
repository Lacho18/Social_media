<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class GetUsersController extends Controller
{
    public function getRecommendations(Request $request, $currentUserID) {
        try {
            $currentUser = User::find($currentUserID);

            if(!$currentUser) {
                throw new Exception;
            }

            $friendsArray = json_decode($currentUser->friends);
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

    public function friendRequest(Request $request, $fromUser, $toUser) {
        $sender = User::find($fromUser);
        $receiver = User::find($toUser);

        $requestContext = $sender->firstName . " " . $sender->lastName . " send you a friend request!";
        $newRequest = [
            "context" => $requestContext,
            "requiredAnswer" => true,
            "madeAtDate" => Carbon\Carbon::now()
        ];

        //Adding the id of the receiver of the request to the sendedRequests field
        $sendedRequests = is_array($sender->sendedRequests) ? $sender->sendedRequests : [];
        $sendedRequests[] = $toUser;
        $sender->sendedRequests = $sendedRequests;
        $sender->save();

        //Adding the request to the receiver requests field
        $requestsArray = is_array($receiver->requests) ? $receiver->requests : [];
        $requestsArray[] = $newRequest;
        $receiver->requests = $requestsArray;
        $receiver->save();

        return response()->json(['message' => "Request sended successfully", 'user' => $sender]);
    }
}
