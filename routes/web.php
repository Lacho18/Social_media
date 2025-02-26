<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\GetUsersController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UploadImageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia('Home', ["name" => "Lachezar"]);
});

Route::inertia('/signup', 'SignUp');

Route::inertia('/login', 'LogIn');

Route::get('/profilePage/{userId}', function ($userId) {
    return Inertia::render('ProfilePage', [
        'userId' => $userId
    ]);
});      

Route::inertia('/friends', 'Friends');

Route::inertia('/newPost', 'CreatePost');

Route::get('/profile', function () {
    return Inertia::render('Profile', [
        'user' => Auth::user()
    ]);
})->name('profile')->middleware('auth');

Route::post('/userImage/{id}', [UserController::class, 'updateUserImage']);

Route::post('/signup', [UserController::class, 'signup']);

Route::post('/login', [UserController::class, 'login']);

Route::post('/logout', [UserController::class, 'logout']);

Route::post('/uploadImage/{id}', [UploadImageController::class, 'uploadImage']);

Route::prefix('findUsers')->group(function () {
    Route::get('/getUser/{userID}', [GetUsersController::class, 'getUser']);
    Route::get('/recommendations/{currentUserID}', [GetUsersController::class, 'getRecommendations']);
    Route::get('/friends/{currentUserID}', [GetUsersController::class, 'getFriends']);
    Route::post('/friendRequest', [GetUsersController::class, 'friendRequest']);
    Route::post('/acceptRequest', [GetUsersController::class, 'acceptRequest']);
    Route::post('/deniedRequest', [GetUsersController::class, 'deniedRequest']);
});

Route::resource('posts', PostController::class);

Route::inertia('/*', 'NotFound');
