<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Budget;
use App\Models\Office;
use App\Models\Augmentationheader;
use App\Models\Augmentationdetail;
use App\Models\Aumentationheader;

class BudgetController extends Controller
{
    public function allbudgetyear($year){
        $budgets = DB::table('budgets as t1')
                    ->select('t1.id',
                    't1.particulars',
                    't1.accountcode',
                    't1.proposedamount',
                    't1.accountclassification',
                    't1.funding',
                    't1.sector',
                    't1.office',
                    't1.officecode')
            ->where('t1.budgetyear',$year)
            ->get();
        return response()->json(['budgets'=>$budgets]);
    }

    public function officebudget($officename){
        $obrstatus='obligated';
        $budgets = DB::table('budgets as t1')
                    ->select('t1.id',
                            't1.particulars',
                             't1.accountcode',
                             't1.proposedamount',
                             't1.accountclassification',
                             't1.funding',
                             't1.sector',
                             't1.office',
                             't1.officecode')
                    ->where('t1.office',$officename)
                    ->addSelect(DB::raw('IFNULL((SELECT SUM(t2.amount) FROM vw_obr as t2
                            WHERE t1.office=t2.officename
                            AND t1.officecode=t2.officecode
                            AND t1.accountcode=t2.accountcode
                            AND t2.obryear=2024
                            AND t2.obrstat=3),0) as totalobligated'))
                    ->addSelect(DB::raw('IFNULL((SELECT SUM(amountpaid) FROM vw_payments as t3
                            where t1.office=t3.officename
                            AND t1.accountcode=t3.accountcode
                            AND t3.obryear=2024
                            AND t3.officename=t1.office),0) as utilized'))
                    ->addSelect(DB::raw('IFNULL((SELECT SUM(amount_to) FROM vw_augmentation as t4
                            WHERE t1.id = t4.budget_id_to
                            AND t4.fy=2024
                            AND t4.status=1),0) as augmentation'))
                    ->addSelect(DB::raw('IFNULL((SELECT SUM(amount_from) FROM vw_augmentation as t5
                            WHERE t1.id = t5.budget_id_from
                            AND t5.fy=2024
                            AND t5.status=1),0) as lessaugmentation'))
                    ->get();

        return response()->json(['budgets'=>$budgets]);
    }

    public function officeaccounts($officename){
        $budgets = DB::table('budgets as t1')
                    ->select('t1.id',
                            't1.particulars',
                             't1.accountcode',
                             't1.proposedamount',
                             't1.accountclassification',
                             't1.funding',
                             't1.sector',
                             't1.officecode')
                    ->where('t1.office',$officename)
                    ->get();
        return response()->json(['budgets'=>$budgets]);
    }

    public function getavailablebudget(Request $request){
        return response()->json(['message'=>'Hello']);
    }

    public function accountsperoffice($officename){
        $accounts = DB::table('budgets')
        ->select('id','particulars','accountcode','accountclassification','funding','officecode')
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

    public function saveaugmentation(Request $request){
        try
            {
                DB::beginTransaction();

                $budget = new Augmentationheader;
                $budget->fy = $request->fy;
                $budget->lgu = $request->lgu;
                $budget->officename = $request->officename;
                $budget->ordinanceno = $request->ordinanceno;
                $budget->dated = $request->dated;
                $budget->augmentationno = $request->augmentationno;
                $budget->userid = $request->userid;
                $budget->status = 1;
                
               
                $budget->save();

                $details = $request->details;

                //This is the last update
                $augmentationid = DB::getPdo()->lastInsertId();
                foreach($details as $key => $detail){
                    $budgetdetail['augmentation_id'] = $augmentationid;
                    $budgetdetail['budget_id_from'] = $detail['budgetIdFrom'];
                    $budgetdetail['object_expenditures_from'] = $detail['accountFrom'];
                    $budgetdetail['expense_class_from'] = $detail['classFrom'];
                    $budgetdetail['amount_from'] = $detail['amountFrom'];
                    $budgetdetail['officecode_from'] = $detail['officecodefrom'];
                    $budgetdetail['budget_id_to'] = $detail['budgetIdTo'];
                    $budgetdetail['object_expenditures_to'] = $detail['accountTo'];
                    $budgetdetail['expense_class_to'] = $detail['classTo'];
                    $budgetdetail['amount_to'] = $detail['amountTo'];
                    $budgetdetail['officecode_to'] = $detail['officecodeto'];
                    Augmentationdetail::create($budgetdetail);
                }

                DB::commit();
                return response()->json(['augmentationid'=>$augmentationid]);
                //  Toastr::success('Obligation Request have been created!!!');
                //  return redirect()->back();
            }catch(\Exception $e){
                DB::rollback();
                Toastr::error('OBR create failed');
                return redirect()->back();
            }
    }

    function displayaugmentationlist($yr){

        $augmentation=DB::table('augmentationheaders as t1')
                        ->select('t1.id','t1.fy','t1.lgu','t1.officename',
                                't1.ordinanceno','t1.dated','t1.augmentationno')
                        ->where('t1.fy','=',$yr)
                        // ->where('t1.officename','=',$office)
                        ->where('t1.status','=',1)
                        ->addSelect(DB::raw('(SELECT SUM(t2.amount_to) FROM augmentationdetails as t2
                            where t1.id=t2.augmentation_id) as totalamount'))
                        ->orderBy('id','desc')
                        ->get();
        return response()->json(['augmentation'=>$augmentation]);
    }

    function displayaugmentationlistbyoffice($yr,$officename){
        $augmentation=DB::table('augmentationheaders as t1')
                        ->select('t1.id','t1.fy','t1.lgu','t1.officename',
                                't1.ordinanceno','t1.dated','t1.augmentationno')
                        ->where('t1.fy','=',$yr)
                        ->where('t1.officename','=',$officename)
                        ->where('t1.status','=',1)
                        ->addSelect(DB::raw('(SELECT SUM(t2.amount_to) FROM augmentationdetails as t2
                            where t1.id=t2.augmentation_id) as totalamount'))
                        ->orderBy('id','desc')
                        ->get();
                return response()->json(['augmentation'=>$augmentation]);
    }

    function showselectedaugmentation($id){
        $augmentation = DB::table("vw_augmentation")
                        ->select('id',
                                 'fy',
                                 'lgu',
                                 'officename',
                                 'ordinanceno',
                                 'dated',
                                 'augmentationno',
                                 'object_expenditures_from',
                                 'expense_class_from',
                                 'amount_from',
                                 'object_expenditures_to',
                                 'expense_class_to',
                                 'amount_to')
                        ->where('id','=',$id)
                        ->get();
        return response()->json(['augmentation'=>$augmentation]);
    }

    public function getselectedaugmentationheader($id){
        $augmentation = DB::table("augmentationheaders")
                        ->select('id',
                                'fy',
                                'lgu',
                                'officename',
                                'ordinanceno',
                                'dated',
                                'augmentationno')
                        ->where('id','=',$id)
                        ->get();
                return response()->json(['augmentationheader'=>$augmentation]);
    }

    public function getselectedaugmentationdetail($id){
        $details = DB::table("augmentationdetails")
                        ->select('id',
                                 'budget_id_from as budgetIdFrom',
                                 'object_expenditures_from as accountFrom',
                                 'expense_class_from as classFrom',
                                 'amount_from as amountFrom',
                                 'officecode_from as officecodefrom',
                                 'budget_id_to as budgetIdTo',
                                 'object_expenditures_to as accountTo',
                                 'expense_class_to as classTo',
                                 'amount_to as amountTo',
                                 'officecode_to as officecodeto',)
                        ->where('augmentation_id','=',$id)
                        ->get();
        return response()->json(['details'=>$details]);
    }

    public function updateaugmentation(Request $request,$id){
        try{
            $augmentation = Augmentationheader::find($id);
            if($augmentation){
                $augmentation->fy = $request->fy;
                $augmentation->lgu = $request->lgu;
                $augmentation->officename = $request->officename;
                $augmentation->ordinanceno = $request->ordinanceno;
                $augmentation->dated = $request->dated;
                $augmentation->augmentationno = $request->augmentationno;
                
                $augmentation->save();
    
                Augmentationdetail::where('augmentation_id',$id)->delete();
                
                $details = $request->details;

                foreach($details as $key => $detail){
                    $budgetdetail['augmentation_id'] = $id;
                    $budgetdetail['budget_id_from'] = $detail['budgetIdFrom'];
                    $budgetdetail['object_expenditures_from'] = $detail['accountFrom'];
                    $budgetdetail['expense_class_from'] = $detail['classFrom'];
                    $budgetdetail['amount_from'] = $detail['amountFrom'];
                    $budgetdetail['officecode_from'] = $detail['officecodefrom'];
                    $budgetdetail['budget_id_to'] = $detail['budgetIdTo'];
                    $budgetdetail['object_expenditures_to'] = $detail['accountTo'];
                    $budgetdetail['expense_class_to'] = $detail['classTo'];
                    $budgetdetail['amount_to'] = $detail['amountTo'];
                    $budgetdetail['officecode_to'] = $detail['officecodeto'];
                    Augmentationdetail::create($budgetdetail);
                }


                
            }

            DB::commit();
            return response()->json(['message'=>'Augmentaion have been updated!!!']);
        }catch(\Exception $e){
            DB::rollback();
            Toastr::error('Updated Failed');
            return redirect()->back();
        }

    }

    public function objectexpenditures($office,$fy){
        $budgets = DB::table('budgets')
                    ->select('id',
                            'particulars',
                            'accountclassification',
                            'accountcode',
                            'funding',
                            'officecode')
                    ->where('office',$office)
                    ->where('budgetyear',$fy)
                    ->where('proposedamount','>',0)
                    ->get();
        return response()->json(['budgets'=>$budgets]);
    }
}
