<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function displaypayments(Request $request){
        $month = $request->input('month');
        $year = $request->input('year');

        



        return response()->json(['payments'=>$year]);
    }
}
