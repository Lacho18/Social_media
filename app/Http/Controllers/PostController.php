<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\User;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        /*Log::debug($request->posterId);
        $request->validate([
            'name' => "required|max:255",
            'images' => 'required|array|min:1',
        ]);

        $poster = User::select('firstName', 'lastName', 'posts')->where('id', $request->posterId)->first();

        if(!$poster) {
            return response()->json(['message' => "Account not found!"])->status(404);
        }

        $folderName = $poster->firstName . $poster->lastName;
        $subFolderName = count($poster->posts);

        $imagesUrls = [];
        foreach ($request->images as $image) {
            Log::debug($image);
            //$imagesUrls[] = createImageFile($image, $folderName, $subFolderName);
        }*/

        return response()->json(['message' => $request->images]);
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
