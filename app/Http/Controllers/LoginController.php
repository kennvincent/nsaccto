<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use DB;

class LoginController extends Controller
{
    public function login(Request $request){
        
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);

        if(Auth::attempt($credentials)){
            return response()->json(['login'=>'success']);
            
        }else{
            return response()->json(['login'=>'Username or Password Invalid!!!']);
        }
        
    }

    public function login2(Request $request){

    }

    public function currentuser($username){
        $office =DB::table('vw_users')
                ->select('id','lastname','firstname','usertype'
                    ,'office_id','officecode','officename'
                    ,'officedesc','officeaddress'
                    ,'authorizedpersonnel','position')
                ->where('username',$username)
                ->get();
        return response()->json(['office'=>$office]);
    }
}
