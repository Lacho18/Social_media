<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Post;
use App\Models\Comments;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    //Gets post for the given user. The posts are only his and by his friends
    public function index(Request $request)
    {
        $userID = $request->query('user');
        $user = User::select('friends')->where("id", $userID)->first();

        $friends = $user->friends;
        array_push($friends, $userID);

        //Gets the posts with data about the user that posts them
        $posts = DB::table('posts')
                ->join('users', 'posts.poster', '=', 'users.id')
                ->whereIn('poster', $friends)
                ->select('posts.*', 'users.firstName', 'users.lastName', 'users.imagePath', "users.friends")
                ->get();

        //DB table returns arrays as strings. Decodes the array to be actual arrays
        $posts = $posts->map(function ($post) {
            $post->images = json_decode($post->images, true); 
            $post->comments = json_decode($post->comments, true); 
            return $post;
        });

        return response()->json(['message' => "Test message!", "postsData" => $posts]);
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
        $newPost = Post::create([
            'name' => $request->name,
            'description' => $request->description,
            'images' => $request->images,
            'poster' => $request->posterId,
            'comments' => [], 
            'likes' => 0,
            'video' => null,
        ]);

        $user = User::find($request->posterId);
        $posts = $user->posts;
        array_push($posts, $newPost->id);
        $user->posts = $posts;
        $user->save();

        Inertia::render('Profile');
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
        $post = Post::find($id);
        $result;
        //Handles the update request on liked post
        if($request->likePost) {
           $result = likePostHandler($request, $post);
        }
        $post = $result["post"];
        $post->save();

        return response()->json(['message' => $request->likePost, "updatedPost" => $post, "likedPosts" => $result["likedPosts"]]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);

        if(!$post) {
            return response()->json(['message' => "Post not found!"], 404);
        }

        //Deletes the postId from posts and likedPosts array of the user
        /*$poster = User::find($post->poster);
        foreach (['posts', 'likedPosts', 'personalPosts'] as $column) {
            $array = $poster->column;

            if (!is_array($array)) {
                continue;
            }

            $array = array_values(array_diff($array, [$id]));
            $poster->column = $array;
        }

        //Deleting every comment for the deleted post
        $deletedComments = Comments::where('postId', $id)->pluck('id')->toArray();
        Comments::where('postId', $id)->delete();

        //Updating the user comments array
        $posterComments = $poster->comments;
        $posterComments = array_filter($posterComments, function ($commentId) use ($deletedComments) {
            return !in_array($commentId, $deletedComments);
        });
        $poster->comments = $posterComments;
        $poster->save();*/

        //Updating posts, likedPosts and personal posts of user after deleting the post
        /*User::query()->update([
            'posts' => DB::raw("jsonb_set(\"posts\"::jsonb, '{}', COALESCE((SELECT jsonb_agg(value) FROM jsonb_array_elements(\"posts\"::jsonb) WHERE value::text <> '$id'::text), '[]'::jsonb))"),
            'likedPosts' => DB::raw("jsonb_set(\"likedPosts\"::jsonb, '{}', COALESCE((SELECT jsonb_agg(value) FROM jsonb_array_elements(\"likedPosts\"::jsonb) WHERE value::text <> '$id'::text), '[]'::jsonb))"),
            'personalPosts' => DB::raw("jsonb_set(\"personalPosts\"::jsonb, '{}', COALESCE((SELECT jsonb_agg(value) FROM jsonb_array_elements(\"personalPosts\"::jsonb) WHERE value::text <> '$id'::text), '[]'::jsonb))"),
        ]);*/

        //Deleting every comment for the deleted post
        $deletedComments = Comments::where('postId', $id)->pluck('id')->toArray();
        Comments::where('postId', $id)->delete();

        //Deleting the comments ids from every user
        User::all()->each(function ($user) use ($deletedComments) {
            $userComments = $user->comments;

            foreach(['posts', 'likedPosts', 'personalPosts'] as $column) {
                $array = $user->column;

                if (!is_array($array)) {
                    continue;
                }

                $array = array_values(array_diff($array, [$id]));
                $user->column = $array;
                $user->save();
            }

            if(is_array($userComments)) {
                $updatedComments = array_values(array_diff($userComments, $deletedComments));

                $user->comments = $updatedComments;
                $user->save();
            }
        });

        //Deleting the post
        $post->delete();

        return response()->json(['message' => "Successful request!"]);
    }
}

function createImageFile($image, $folderName, $subFolderName)
{
    $path = $folderName . '/' . $subFolderName;
    $fileName = $image->store($path, 'public');
    $fileName = basename($fileName);
    $url = asset('storage/' . $path . '/' . $fileName);

    return $url;
}

//Handles the liking of a post changes to the database
function likePostHandler($request, $post) {
    $userLiked = User::find($request->likedFrom);
    $likedPosts = $userLiked->likedPosts;

    //If the post is already liked
    if(in_array($post->id, $likedPosts)) {
        //Removes the post id from the user likedPosts array
        $likedPosts = array_filter($likedPosts, function ($likedPost) use ($post) {
            return $likedPost != $post->id;
        });

        //Decrements the post likes
        $post->likes = $post->likes - 1;
    }
    //If the post is not liked
    else {
        //Adds the id to user likedPosts array
        array_push($likedPosts, $post->id);

        //increments the likes counter of the post
        $post->likes = $post->likes + 1;
    }

    //Saves the changes to the user
    $userLiked->likedPosts = $likedPosts;
    $userLiked->save();

    return ["post" => $post, "likedPosts" => array_values($likedPosts)];
}
