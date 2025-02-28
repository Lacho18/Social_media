<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Comments;
use App\Models\User;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $postId = $request->query("postId");

        $comments = DB::table("comments")
                    ->join("users", "comments.userId", "=", "users.id")
                    ->select('comments.*', 'users.firstName', 'users.lastName', 'users.imagePath')
                    ->get();
        
        return response()->json(["message" => "Successful request!", "comments" => $comments]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $newComment = Comments::create([
            'context' => $request->context,
            'userId' => $request->userId,
            'postId' => $request->postId,
        ]);

        $user = User::find($request->userId);

        $newComment->firstName = $user->firstName;
        $newComment->lastName = $user->lastName;
        $newComment->imagePath = $user->imagePath;

        return response()->json(['message' => "Successful request!", "newComment" => $newComment]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
