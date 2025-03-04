<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Post;
use App\Models\Comments;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function signUp(Request $request) {
        //Validates data by given rules. On dateOfBirth setting custom error message
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users|max:255|email',
            'firstName' => 'required',
            'lastName' => 'required',
            'dateOfBirth' => ['required', 'date', 'before_or_equal:' . Carbon::now()->subYears(18)->format('Y-m-d')],
            'password' => ['required', 'confirmed', Password::min(7)->letters()->numbers()->symbols()]
        ], [
            'dateOfBirth.before_or_equal' => "You must be 18 years old in order to create account"
        ]);

        if($validator->fails()) {
            return Inertia::render('SignUp', [
                'errors' => $validator->errors()->toArray(),
                'data' => $request->all() 
            ]);
        }

        $fields = $request->all();

        //Creating the user in the database
        $user = User::create([
            'email' => $fields['email'],
            'password' => $fields['password'],
            'firstName' => $fields['firstName'],
            'lastName' => $fields['lastName'],
            'dateOfBirth' => $fields['dateOfBirth'],
            'friends' => [],
            'comments' => [],
            'likedPosts' => [],
            'personalPosts' => [],
            'imagePath' => "null"
        ]);

        Auth::login($user);

        return redirect()->route('profile');
    }

    public function login(Request $request) {
        // Validate input data
        $request->validate([
            'email' => 'required|max:255|email',
            'password' => 'required',
        ]);

        if (Auth::attempt([
                'email' => $request->email,
                'password' => $request->password
            ], $request->rememberMe)) {
            
            $request->session()->regenerate();
    
            // Redirect to the /profile route after successful login
            return Inertia::location(route('profile'));
        }
        
        return back()->withErrors([
            'email' => 'Invalid credentials. Please try again.'
        ])->withInput();
    }

    public function logout(Request $request) {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');       
    }

    public function updateUserImage(Request $request, $id) {
        try {
            Log::info("Updating image for user ID: $id");
    
            if (!$request->hasFile('image')) {
                return response()->json(['error' => 'No image uploaded'], 400);
            }
    
            // Store image in storage/app/public/userImages
            $filename = $request->file('image')->store("usersImages", 'public');
            $filename = basename($filename);
    
            // Measure query execution time
            $startTime = microtime(true);

            //Gets the image $url
            $url = asset("storage/usersImages/" . $filename);
    
            //Stores the image url to the database as imagePath field
            DB::transaction(function () use ($id, $url) {
                User::where('id', $id)->limit(1)->update(['imagePath' => $url]); 
            });
    
            //End of execution time
            $executionTime = microtime(true) - $startTime;
            Log::info("Query executed in: {$executionTime} seconds");

            //Returning the new url image in order to visualize it dynamically
            return Inertia::render('Profile', [
                'message' => "Successful request",
                'image' => $url,
            ]);
        } catch (\Exception $e) {
            Log::error("Image update failed: " . $e->getMessage());
            return response()->json(['error' => "Something went wrong"], 500);
        }
    }
    

    public function deleteUser($id) {
        //Deletes the user
        $user = User::find($user);

        //Deleting user comments
        $deletedComments = Comments::where('userId', $id)->pluck('id')->toArray();
        Comments::where('postId', $id)->delete();

        Post::all()->each(function ($post) use ($deletedComments, $id, $user) {
            //Deletes the post if the poster is the deleted user  
            if($post->poster == $id) {
                $post->delete();
                return;
            }

            //Deletes all the comments from every post of the deleted user
            $postComments = $post->comments;

            if(is_array($postComments)) {
                $updatedComments = array_values(array_diff($postComments, $deletedComments));

                $post->comments = $updatedComments;
            }

            //Decrements the likes counter if the deleted user has liked the post
            if(in_array($post->id, $user->likedPosts)) {
                $post->likes -= 1;
            }

            $post->save();
        });

        $user->delete();
    }

    public function searchUsers(Request $request) {
        $searchText = $request->query('searchText');
        $searchWords = explode(" ", $searchText);

        if(count($searchWords) == 2) {
            $searchWords = ['firstName' => $searchWords[0], 'lastName' => $searchWords[1]];
        }
        else {
            $searchWords = $searchWords[0];
        }

        $users = User::query()
                    ->when(is_array($searchWords), function($query) use ($searchWords) {
                        return $query->where($searchWords);
                    })
                    ->when(!is_array($searchWords), function($query) use ($searchWords) {
                        return $query->where(function ($query) use ($searchWords) {
                            $query->where('firstName', 'like', '%' . $searchWords . '%')
                                  ->orWhere('lastName', 'like', '%' . $searchWords . '%');
                        });
                    })
                    ->get();
        
        if(count($users) == 0) {
            return response()->json(['message' => "No users found", 'users' => []]);
        }
        else {
            return response()->json(['message' => "Users found", 'users' => $users]);
        }
    }
}
