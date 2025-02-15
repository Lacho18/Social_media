<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia('Home', ["name" => "Lachezar"]);
});

Route::inertia('/signup', 'SignUp');

Route::inertia('/login', 'LogIn');

Route::post('/login', [UserController::class, 'login']);
