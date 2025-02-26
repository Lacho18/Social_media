<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use App\Models\User;

class UploadImageController extends Controller
{
    public function uploadImage(Request $request, $id) {
        try {
            //Checking if the given data is files
            if (!$request->hasFile('images')) {
                return response()->json(['error' => 'No image uploaded'], 400);
            }

            //Gets the user (poster) from the database
            $user = User::select('firstName', 'lastName', 'posts')->where('id', $id)->first();

            //Structure the folder names based on user names
            $folderName = $user->firstName . "_" . $user->lastName;
            $subFolderName = count($user->posts);
            $path = $folderName . '/' . $subFolderName;
            $urls = [];

            //Uploading every file from the array and setting url to it
            for($i = 0; $i < count($request->images); $i++) {
                $image = $request->file('images')[$i];
                $imageName = $image->store($path, 'public');
                $url = asset('storage/' . $imageName);

                array_push($urls, $url);
            }

            //Returning proper result for Inertia
            return Inertia::render('CreatePost', [
                'message' => "Successful request",
                'images' => $urls,
            ]);
        }
        catch (\Exception $e) {
            Log::error("Image update failed: " . $e->getMessage());
            return response()->json(['error' => "Something went wrong"], 500);
        }
    }
}