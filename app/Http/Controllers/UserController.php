<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{

    /*
        Оправи заявките. Съобщения за грешки, валидации, сесии пренасочвания
        Виж с постовете как да го направиш с онази команда
    */

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
    }

    public function login(Request $request) {

        dd($request->all());

        $request->validation([
            'email' => 'required|unique:users|max:255|email',
            'password' => 'required',
            'rememberMe' => 'boolean'
        ]);
    }
}
