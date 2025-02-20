<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;

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

    public function updateUserImage(Request $request, $id) {
        try {
            Log::info("Updating image for user ID: $id");
    
            if (!$request->hasFile('image')) {
                return response()->json(['error' => 'No image uploaded'], 400);
            }
    
            // Store image properly
            $filename = $request->file('image')->store("usersImages", 'public');
            $filename = basename($filename);
    
            // Measure query execution time
            $startTime = microtime(true);
    
            DB::transaction(function () use ($id, $filename) {
                User::where('id', $id)->limit(1)->update(['imagePath' => $filename]);
            });
    
            $executionTime = microtime(true) - $startTime;
            Log::info("Query executed in: {$executionTime} seconds");
    
            return response()->json(['message' => "Image uploaded successfully", 'filename' => $filename], 201);
        } catch (\Exception $e) {
            Log::error("Image update failed: " . $e->getMessage());
            return response()->json(['error' => "Something went wrong"], 500);
        }
    }
    
}
