<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Post;

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

function createImageFile($image, $folderName, $subFolderName)
{
    $path = $folderName . '/' . $subFolderName;
    $fileName = $image->store($path, 'public');
    $fileName = basename($fileName);
    $url = asset('storage/' . $path . '/' . $fileName);

    return $url;
}
