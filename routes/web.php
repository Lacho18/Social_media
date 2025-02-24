<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\GetUsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia('Home', ["name" => "Lachezar"]);
});

Route::inertia('/signup', 'SignUp');

Route::inertia('/login', 'LogIn');

Route::inertia('/profilePage/{userId}', 'ProfilePage');

Route::inertia('/friends', 'Friends');

Route::get('/profile', function () {
    return Inertia::render('Profile', [
        'user' => Auth::user()
    ]);
})->name('profile')->middleware('auth');

Route::post('/userImage/{id}', [UserController::class, 'updateUserImage']);

Route::post('/signup', [UserController::class, 'signup']);

Route::post('/login', [UserController::class, 'login']);

Route::post('/logout', [UserController::class, 'logout']);

Route::prefix('findUsers')->group(function () {
    Route::get('/recommendations/{currentUserID}', [GetUsersController::class, 'getRecommendations']);
    Route::get('/friends/{currentUserID}', [GetUsersController::class, 'getFriends']);
    Route::post('/friendRequest', [GetUsersController::class, 'friendRequest']);
    Route::post('/acceptRequest', [GetUsersController::class, 'acceptRequest']);
    Route::post('/deniedRequest', [GetUsersController::class, 'deniedRequest']);
});

Route::inertia('/*', 'NotFound');
