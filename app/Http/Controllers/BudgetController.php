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
    public function officebudget($officename){
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
                            where t1.office=t2.officename
                            and t1.officecode=t2.officecode
                            and t1.accountcode=t2.accountcode
                            and t2.obryear=2024
                            and t2.obrstatus="Obligated"),0) as totalobligated'))
                    ->addSelect(DB::raw('IFNULL((SELECT SUM(amountpaid) FROM vw_payments as t3
                            WHERE t1.officecode=t3.officecode
                            AND t1.accountcode=t3.accountcode
                            AND t3.obryear=2024
                            AND t3.officename=t1.office),0) as utilized'))
                    ->addSelect(DB::raw('IFNULL((SELECT SUM(amount_to) FROM vw_augmentation as t4
                            WHERE t4.officename=t1.office
                            AND t1.accountcode=t4.object_expenditures_to
                            AND fy=2024),0) as augmentation'))
                    ->addSelect(DB::raw('IFNULL((SELECT SUM(amount_from) FROM vw_augmentation as t5
                            WHERE t5.officename=t1.office
                            AND t1.accountcode=t5.object_expenditures_from
                            AND fy=2024),0) as lessaugmentation'))
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
               
                $budget->save();

               

                //This is the last update
                $augmentationid = DB::getPdo()->lastInsertId();
                // foreach($details as $key => $detail){
                //     $obrDetail['accountdesc'] = $detail['name']['accountdesc'];
                //     $obrDetail['accountclassification'] = $detail['name']['accountclassification'];
                //     $obrDetail['funding'] = $detail['name']['funding'];
                //     $obrDetail['accountcode'] = $detail['name']['accountcode'];
                //     $obrDetail['amount'] = $detail['name']['amount'];
                //     $obrDetail['obrid'] = $obrid;
                //     Obrdetail::create($obrDetail);
                // }

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
}
