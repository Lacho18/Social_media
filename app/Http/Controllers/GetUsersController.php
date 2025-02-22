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
            $users = User::whereNotIn('id', $friendsArray)->limit(5)->get();

            return response()->json([
                'users' => $users
            ]);
        }
        catch(Exception $e) {
            return response()->json(['message' => "I don't know"]);
        }
    }
}
