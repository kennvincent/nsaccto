<?php

namespace App\Http\Controllers\Api;
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        return view('user.index');
    }

    public function validateage(Request $req){
        return $req->age;
    }

   
}
