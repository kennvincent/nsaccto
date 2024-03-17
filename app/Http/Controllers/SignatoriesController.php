<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signatory;

class SignatoriesController extends Controller
{
    public function update(){

    }

    public function getsignatories(){
        $signatories = Signatory::all();
        return response()->json(['signatories'=>$signatories]);
    }
}
