<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;

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

    public function updateUserImage(Request $request) {
        dd("Hello");
    }
}
