<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Budget;
use App\Models\Office;

class BudgetController extends Controller
{
    public function officebudget($officename){
        // $budgets = DB::table('budgets')
        //             ->select('id',
        //                     'particulars',
        //                      'accountcode',
        //                      'proposedamount',
        //                      'accountclassification',
        //                      'funding')
        //             ->where('office',$officename)
        //             ->get();

        $budgets = DB::table('budgets as t1')
                    ->select('t1.id',
                            't1.particulars',
                             't1.accountcode',
                             't1.proposedamount',
                             't1.accountclassification',
                             't1.funding')
                    ->where('t1.office',$officename)
                    ->addSelect(DB::raw('IFNULL((SELECT SUM(t2.amount) FROM vw_obr as t2 
                                          where t1.office=t2.officename
                                          and t1.accountcode=t2.accountcode
                                          and t2.obryear=2024
                                          and t2.obrstatus="Obligated"),0) as totalobligated'))
                    ->get();

        return response()->json(['budgets'=>$budgets]);
    }
    
    public function accountsperoffice($officename){
        $accounts = DB::table('budgets')
        ->select('id','particulars','accountcode')
        ->where('office',$officename)
        ->get();
        return response()->json(['accounts'=>$accounts]);
    }

   
    public function getaccount($id){
        $accountcode = DB::table('budgets')
        ->select('accountcode')
        ->where('id',$id)
        ->get();
        return response()->json(['account'=>$accountcode]);
    }

    public function samplebudget(){
        $budgets = Office::all();
        return response()->json(['budgets'=>$budgets]);
    }
}
