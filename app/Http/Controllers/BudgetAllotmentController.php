<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Budgetallotment;
use App\Models\Office;
use App\Models\Augmentationheader;
use App\Models\Augmentationdetail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BudgetAllotmentController extends Controller
{


    // public function index(){
    //     $budget = Budgetallotment::all();
    //     return response()->json(['budget'=>$budget]);
    // }

    public function officebudget($office_id){
        $budget = DB::table('vw_budgetallotments')
        ->select('id','office_id','officename','accountid','accountcode',
            'accountdesc','allotted','utilized','remaining')
        ->where('office_id',$office_id)
        ->get();

        // $budget = DB::table('budgetallotments')
        //             ->join('offices','budgetallotments.office_id','=','offices.id')
        //             ->join('accounts','budgetallotments.account_id','=','accounts.id')
        //             ->select('budgetallotments.id','accounts.accountcode','accounts.accountdesc','budgetallotments.amount')
        //             ->where('budgetallotments.office_id',$office_id)
        //             ->get();
        return response()->json(['budget'=>$budget]);
    }

    public function officebudgetall($office_id){
        $budget = DB::table('vw_budgetallotments')
                    ->select('id','office_id','officename','accountid','accountcode','accountdesc','allotted','utilized','remaining')
                    ->where('office_id',$office_id)
                    ->get();
        return response()->json(['budget'=>$budget]);
    }



    public function index(){
        $year=DB::table('currentbudgetyears')->get();
    

        $budget = Office::query()
                ->select('offices.*')
                ->addSelect(DB::raw('(SELECT sum(amount) from budgetallotments WHERE offices.id=budgetallotments.office_id
                  AND budgetallotments.budgetyear='. $year[0]->budgetyear .') as totalbudget'))
                ->get();
        return response()->json(['budget'=>$budget]);
    }

    public function allbudget($yr){
        $budget = Budgetallotment::where('budgetyear',$yr)
                                  ->sum('amount');
        return response()->json(['budget'=>$budget]);
    }


    public function insert(Request $request){

        $year=DB::table('currentbudgetyears')->get();
       

       $result = Budgetallotment::where("office_id", $request->office_id)
                                ->where("account_id",$request->account_id)->exists();
       if(!$result){
            $budget = new Budgetallotment;

            $budget->office_id = $request->office_id;
            $budget->account_id = $request->account_id;
            $budget->amount = $request->amount;
            $budget->budgetyear = $year[0]->budgetyear;
            // $budget->budgetyear = $request->budgetyear;

            $budget->save();


            if($budget){
                return response()->json([
                    'status'=>200,
                    'message'=>"Budget allotment have been saved"
                ],200);
            }else{
                return response()->json([
                    'status'=>500,
                    'message'=>"Budget allotment failed"
                ],200);
            }
       }else{
            return response()->json(['message'=>"Budget already exist"]);
       }


    }

    
}
