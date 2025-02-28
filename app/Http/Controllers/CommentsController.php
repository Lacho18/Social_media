<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Comments;
use App\Models\User;
use App\Models\Post;

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
        //Creating the comment
        $newComment = Comments::create([
            'context' => $request->context,
            'userId' => $request->userId,
            'postId' => $request->postId,
        ]);

        //Getting the poster of the comment
        $user = User::findOrFail($request->userId);

        //Getting the post for which the comment will be
        $post = Post::findOrFail($request->postId);

        //Getting necessary data for real time visual update 
        $newComment->firstName = $user->firstName;
        $newComment->lastName = $user->lastName;
        $newComment->imagePath = $user->imagePath;

        //Adding the new comment id to the user
        /*if(!in_array($newComment->id, $user->comments)) {
            $user->comments[] = $newComment->id;
        }*/
        //$user->save();

        //Adding the new comment id to the post
        if (!in_array($newComment->id, $post->comments)) {
            $post->comments[] = $newComment->id;
        }
        //$post->save();

        return response()->json(['message' => "Successful request!", "newComment" => $user->comments]);
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
