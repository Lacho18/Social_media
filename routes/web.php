<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia('Home', ["name" => "Lachezar"]);
});

Route::inertia('/signup', 'SignUp');

Route::inertia('/login', 'LogIn');

Route::get('/profile', function () {
    return Inertia::render('Profile', [
        'user' => Auth::user()
    ]);
})->name('profile')->middleware('auth');

Route::post('/signup', [UserController::class, 'signup']);

Route::post('/login', [UserController::class, 'login']);
