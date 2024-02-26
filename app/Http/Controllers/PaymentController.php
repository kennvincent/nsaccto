<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function displaypayments(Request $request){
        $month = $request->input('month');
        $year = $request->input('year');

       $payments= DB::table('vw_payments')
                ->select('id',
                        'officename',
                        'accountcode',
                        'accountdesc',
                        'amountpaid')
                ->where('payment_month','=',[$month])
                ->where('payment_year','=',[$year])
                ->get();

        return response()->json(['payments'=>$payments]);
    }
}
