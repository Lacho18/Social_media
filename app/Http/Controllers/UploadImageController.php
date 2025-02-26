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
            if (!$request->hasFile('images')) {
                return response()->json(['error' => 'No image uploaded'], 400);
            }

            $user = User::select('firstName', 'lastName', 'posts')->where('id', $id)->first();

            $folderName = $user->firstName . "_" . $user->lastName;
            $subFolderName = count($user->posts);
            $path = $folderName . '/' . $subFolderName;
            $urls = [];

            for($i = 0; $i < count($request->images); $i++) {
                $image = $request->file('images')[$i];
                $imageName = $image->store($path, 'public');
                $url = asset('storage/' . $imageName);

                array_push($urls, $url);
            }
            /*$fileName = $request->file('images')->store($path, 'public');
            $filename = basename($fileName);

            $url = asset("storage/" . $path . "/" . $fileName);*/

            //return response()->json(['message' => "Image uploaded", 'imageUrls' => $url]);

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