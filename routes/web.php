<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia('Home', ["name" => "Lachezar"]);
});

Route::get('/login', function() {
    return Inertia('LogIn');
});

Route::post('/login', [UserController::class, 'login']);
