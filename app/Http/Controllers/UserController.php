<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{

    /*
        Оправи заявките. Съобщения за грешки, валидации, сесии пренасочвания
        Виж с постовете как да го направиш с онази команда
    */

    public function signUp(Request $request) {
        dd($request->all());
    }

    public function login(Request $request) {

        dd($request->all());
    }
}
