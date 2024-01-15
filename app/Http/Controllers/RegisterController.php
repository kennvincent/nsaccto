<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class RegisterController extends Controller
{
    public function register(Request $request){
        $input = $request->all();
        User::create([
            'username' => $input['username'],
            'password' => $input['password'],
            'lastname' => $input['lastname'],
            'firstname' => $input['firstname'],
            'usertype' => $input['usertype'],
            'email' => $input['email'],
            'office_id' =>$input['office_id'],
        ]);

        return response()->json(['message'=>'New user created!!!']);
    }
}
