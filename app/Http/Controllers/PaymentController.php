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
                ->orderby('id')
                ->get();

        return response()->json(['payments'=>$payments]);
    }

    public function utilization(Request $request){
        $month = $request->input('month');
        $year = $request->input('year');

       $payments= DB::select("
                        SELECT  t1.id,
                                t1.accountdesc,
                                t1.accountcode,
                                IFNULL((SELECT SUM(t2.amountpaid) FROM vw_payments t2
                                 WHERE t1.accountcode=t2.accountcode
                                 AND payment_month='$month'
                                 AND payment_year='$year'),0) as totalpayments
                        FROM accounts t1
                        
                    ");
                
        return response()->json(['payments'=>$payments]);
    }
}
