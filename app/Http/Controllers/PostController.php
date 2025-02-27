<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use App\Models\User;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['message' => "Test message!"]);
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
        Post::create([
            'name' => $request->name,
            'description' => $request->description,
            'images' => $request->images,
            'poster' => $request->posterId,
            'comments' => [], 
            'likes' => 0,
            'video' => null,
        ]);

        //return response()->json(['message' => "Successful post!"]);

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
