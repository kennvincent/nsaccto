<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Budget;
use App\Models\Office;

class BudgetController extends Controller
{
    public function officebudget($officename){
        $budgets = DB::table('budgets')
                    ->select('id',
                            'particulars',
                             'accountcode',
                             'proposedamount',
                             'accountclassification',
                             'funding')
                    ->where('office',$officename)
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
