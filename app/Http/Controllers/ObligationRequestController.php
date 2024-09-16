<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Obrheader;
use App\Models\Obrdetail;
use App\Models\Currentbudgetyear;
use App\Models\Paymentheader;
use App\Models\Paymentdetail;
use App\Models\Idcounter;
use Illuminate\Support\Facades\DB;


class ObligationRequestController extends Controller
{

    public function viewlist(){
        // $obrlist = DB::table('vw_obrheaders')
        //             ->select('id','payee','particulars','officecode','officename',
        //                      'officedesc','address','totalamount','obrstatus')
        //             ->where('obrstate','=','3')
        //             ->orderBy('id','DESC')
        //             ->get();
        // return response()->json(['obrlist'=>$obrlist]);
    }

    public function viewapprovedlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','obrnumber','particulars','officecode','officename',
                             'officedesc','address','totalamount','obrstatus')
                    ->where('obrstat','=','3')
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function viewlistbyoffice($office){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                             'officedesc','address','totalamount','obrstatus','withvoucher')
                    ->where('officename','=',$office)
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function budgetsearchbypayee($payee){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                             'officedesc','address','totalamount','obrstatus','withvoucher')
                    ->where('payee','LIKE','%'. $payee . '%')
                    ->where('obrstatus','Approved')
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function viewobr($id){
        $obrlist = DB::table('vw_obr')
                    ->select('id','payee','particulars','officecode','officename',
                        'officedesc','address','accountcode','amount','totalamount','obrstatus','withvoucher')
                    ->where('id','=',[$id])
                    ->get();
        return response()->json(['obr'=>$obrlist]);
    }

    public function accountingselectedviewobr($id){
        // $obrlist = DB::table('vw_obr')
        //             ->select('id',
        //                     'obrnumber',
        //                     'obr_detail_id',
        //                     'payee',
        //                     'address',
        //                     'particulars',
        //                     'officecode',
        //                     'officename',
        //                     'officedesc',
        //                     'address',
        //                     'accountcode1',
        //                     'accountcode',
        //                     'amount1',
        //                     'amount',
        //                     'totalamount',
        //                     'paid',
        //                     'totalamountpaid',
        //                     'balance1',
        //                     'balance',
        //                     'totalbalance',
        //                     'signatory1',
        //                     'position1',
        //                     'signatory2',
        //                     'position2',
        //                     'obrstatus',
        //                     'withvoucher')
        //             ->where('id','=',[$id])
        //             ->get();
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id',
                            'payee',
                            'address',
                            'particulars',
                            'officecode',
                            'officename',
                            'officedesc',
                            'address',
                            'balance')
                    ->where('id','=',[$id])
                    ->get();
        return response()->json(['obr'=>$obrlist]);
    }

    public function getobrforpayment($obrid){
        $obrlist = DB::table('vw_obr')
                    ->select('id',
                            'obrnumber',
                            'obr_detail_id',
                            'payee',
                            'address',
                            'particulars',
                            'officecode',
                            'officename',
                            'officedesc',
                            'address',
                            'budgetid',
                            'accountcode1',
                            'accountcode',
                            'amount1',
                            'amount',
                            'totalamount',
                            'paid',
                            'totalamountpaid',
                            'balance1',
                            'balance',
                            'totalbalance',
                            'signatory1',
                            'position1',
                            'signatory2',
                            'position2',
                            'obrstatus',
                            'withvoucher')
                    ->where('id','=',[$obrid])
                    ->get();
        return response()->json(['obr'=>$obrlist]);
    }


    public function printpreview($id){

        $obr = DB::table('vw_obr')
                ->select('id',
                        'payee',
                        'particulars',
                        'officecode',
                        'officename',
                        'officedesc',
                        'address',
                        'accountcode',
                        'amount',
                        'signatory1',
                        'position1',
                        'signatory2',
                        'position2',
                        'totalamount',
                        'obrstatus')
                ->where('id','=',[$id])
                ->get();
        return response()->json(['obr'=>$obr]);
    }

    public function editpreview($id){
        $obr = DB::table('vw_obr')
                ->select('obr_detail_id as id',
                        'payee',
                        'particulars',
                        'officecode',
                        'officename',
                        'officedesc',
                        'address',
                        'signatory1',
                        'position1',
                        'signatory2',
                        'position2',
                        'obrstatus','withvoucher')
                ->where('id','=',[$id])
                ->get();
        return response()->json(['obr'=>$obr]);
    }

    public function editdetailspreview($id){
        $obr = DB::table('vw_obr')
                ->select('budgetid as id',
                        'budgetid',
                        'officecode',
                        'accountcode',
                        'accountdesc',
                        'accountclassification',
                        'funding',
                        'amount')
                ->where('id','=',[$id])
                ->get();
        return response()->json(['obr'=>$obr]);
    }

    
    public function getobrheader($id){
        $obr = DB::table('vw_obrheaders')
                ->select('id',
                        'payee',
                        'obrnumber',
                        'particulars',
                        'officecode')
                ->where('id','=',[$id])
                ->get();
        return response()->json(['obr'=>$obr]);
    }

    public function getobrdetails($id){
        $obr = DB::table('obrdetails')
                ->select('id',
                        'budgetid',
                        'accountcode',
                        'accountdesc',
                        'accountclassification',
                        'amount')
                ->where('obrid','=',[$id])
                ->get();
        return response()->json(['obrdetails'=>$obr]);
    }

    public function sum($id){
        $obrtotal = DB::select("SELECT sum(amount) as obrtotal FROM vw_obr WHERE id = $id");
        return response()->json($obrtotal);
    }

    public function obrsum($id){
        $obrtotal = DB::select("SELECT sum(amount) as obrtotal FROM vw_obr WHERE id = $id");
        return response()->json($obrtotal);
    }


    public function foraprrovalobr(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id',
                            'payee',
                            'particulars',
                            'officecode',
                            'officename',
                            'officedesc',
                            'address',
                            'totalamount',
                            'obrstatus',
                            'withvoucher')
                    ->where('obrstatus','Approved')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

   

  
   


    public function budgetforaprrovalobr($officename){
       
        $obrlist = DB::table('vw_obrheaders')
        ->select('id',
                'payee',
                'particulars',
                'officecode',
                'officename',
                'officedesc',
                'address',
                'totalamount',
                'obrstatus',
                'withvoucher')
        ->where('officename',$officename)
        ->where('obrstatus1','2')
        ->get();
    
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function approvedobr(){
        // Obligated
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id',
                            'payee',
                            'particulars',
                            'officecode',
                            'officename',
                            'officedesc',
                            'address',
                            'totalamount',
                            'obrstatus')
                    ->where('obrstatus','Obligated')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function viewofficeobrlist($officename){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                             'officedesc','address','totalamount','obrstatus','obrstat')
                    ->where('officename','=',$officename)
                    ->where('obrstatus','!=','Cancelled')
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    
    public function viewallforapprovalobrlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                             'officedesc','address','totalamount','obrstatus')
                    ->where('obrstatus','For Approval')
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function viewallofficeapprovedobrlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                             'officedesc','address','totalamount','obrstatus')
                    ->where('obrstatus','Approved')
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function viewbypayee(Request $request){
       
        $payee =  $request->payee;
        $officename = $request->officename;
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                            'officedesc','address','totalamount','obrstatus')
                    ->where('payee','LIKE', '%'. $payee . '%')
                    ->where('officename','=',$officename)
                    ->where('obrstat','!=',0)
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>  $obrlist]);
        
    }

    public function viewbyofficepayee($payee){
       
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                            'officedesc','address','totalamount','obrstatus','withvoucher')
                    ->where('payee','LIKE', '%'. $payee . '%')
                    ->where('obrstat','=','1')
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>  $obrlist]);
    }

 

    public function accountingviewlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','address','totalamount','voucher',
                    'balance','paid','obrstatus','withvoucher')
                    ->where('obrstatus','=','Obligated')
                    ->orderBy('id','DESC')
                    ->get();

        return response()->json(['obrlist'=>$obrlist]);
    }

  


    public function accountingviewobrpaidlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','address','totalamount','totalamountpaid',
                    'balance','paid','obrstatus')
                    ->orderBy('id','DESC')
                    ->get();

        return response()->json(['obrlist'=>$obrlist]);
    }

    public function accountingviewlistselectedoffice($officename){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','address','totalamount','voucher',
                    'balance','paid','obrstatus','withvoucher')
                    ->where('officename','=',$officename)
                    ->where('obrstatus','=','Obligated')
                    ->orderBy('id','DESC')
                    ->get();

        return response()->json(['obrlist'=>$obrlist]);
    }

    public function accountingviewlistselectedpayee($payee){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','address','totalamount','voucher',
                    'balance','paid','obrstatus')
                    ->where('payee','LIKE','%'. $payee . '%')
                    ->where('obrstatus','=','Obligated')
                    ->orderBy('id','DESC')
                    ->get();

        return response()->json(['obrlist'=>$obrlist]);
    }




    public function updateobrnumber(Request $request){

        $affected = DB::table('obrheaders')
              ->where('id', $obrid)
              ->update(['obrnumber' => $obrnumber]);

    }

    public function officeapprove($obrid){
        $affected = DB::table('obrheaders')
              ->where('id', $obrid)
              ->update(['obrstatus' => 2]);
        return response()->json(['message'=>"Obligation Request have been approved"]);
    }


    public function budgetapproveall(Request $request){
        $details = $request->obridlist;
        foreach ($details as $key => $data) {
            // Retrieve the record by its ID
            $record = Obrheader::find($data['id']);

            // Check if the record exists
            if ($record) {
                $affected = DB::table('obrheaders')
                ->where('id', $data['id'])
                ->update(['obrstatus' => 3]);
            }
        }

        return response()->json(['message'=>'Obligation Request Approve all successful']);
    } 


    public function officeapproveallobr(Request $request){
        
        try{
           

            DB::beginTransaction();
           
            $details = $request->details;

            // foreach($details as $key => $data){
            //     return response()->json(['message'=>$data['id']]);

            // }

            foreach ($details as $key => $data) {
                // Retrieve the record by its ID
                $record = Obrheader::find($data['id']);

                // Check if the record exists
                if ($record) {
                    $affected = DB::table('obrheaders')
                    ->where('id', $data['id'])
                    ->where('obrstatus', 1)
                    ->update(['obrstatus' => 2]);
                }
            }

            DB::commit();
            return response()->json(['message'=>'All OBR have been approved']);
        }catch(\Exception $e){
             DB::rollback();
                Toastr::error('OBR create failed');
                return redirect()->back();
        }
    }

    public function officecancel($id){
        $affected = DB::table('obrheaders')
        ->where('id', $id)
        ->update(['obrstatus' => 0]);
        return response()->json(['message'=>"Obligation Request have been cancelled"]);
    }

    public function reject(Request $request){
            DB::table('obrheaders')
              ->where('id',$request->obrid)
              ->update(array('obrstatus' => 4,'remarks' => $request->remarks));
        return response()->json(['message'=>"Obligation Request have been rejected"]);
    }

    public function rejectedobr(){
        $obrlist = DB::table('vw_obrheaders')
        ->select('id','payee','particulars','officecode','officename',
        'officedesc','address','totalamount','totalamountpaid','balance')
        ->where('obrstatus','=','Rejected')
        ->orderBy('id','DESC')
        ->get();

        return response()->json(['obrlist'=>$obrlist]);
    }

    // public function reject($obrid){
    //     $affected = DB::table('obrheaders')
    //           ->where('id', $obrid)
    //           ->update(['obrstatus' => 4]);
    //     return response()->json(['message'=>"Obligation Request have been rejected"]);
    // }

    public function getobryear(){
        $year=DB::table("currentbudgetyears")
                ->select('budgetyear')
                ->get();

        return response()->json(['obryear'=>$year]);
    }

    public function insert(Request $request){

            try
            {
                DB::beginTransaction();
                $obr = new Obrheader;
                $obr->payee = $request->payee;
                $obr->address = $request->address;
                $obr->officeid = $request->officeid;
                $obr->officecode = $request->officecode;
                $obr->particulars = $request->particulars;
                $obr->obryear = $request->obryear;
                $obr->signatory1 = $request->signatory1;
                $obr->position1 = $request->position1;
                $obr->signatory2 = $request->signatory2;
                $obr->position2 = $request->position2;
                $obr->userid = $request->userid;
                $obr->obrstatus='1';
                $obr->withvoucher='0';
                $obr->ispaid='0';
                $obr->save();

                $details = $request->obrdetails;

                // //This is the last update
                $obrid = DB::getPdo()->lastInsertId();
                foreach($details as $key => $detail){
                    $obrDetail['budgetid'] = $detail['budgetid'];
                    $obrDetail['accountdesc'] = $detail['accountdesc'];
                    $obrDetail['accountclassification'] = $detail['accountclassification'];
                    $obrDetail['funding'] = $detail['funding'];
                    $obrDetail['accountcode'] = $detail['accountcode'];
                    $obrDetail['amount'] = $detail['amount'];
                    $obrDetail['obrid'] = $obrid;
                    Obrdetail::create($obrDetail);
                }


                // foreach($details as $key => $detail){
                //     $obrDetail['budgetid'] = $detail['budgetid'];
                //     $obrDetail['accountdesc'] = $detail['accountdesc'];
                //     $obrDetail['accountclassification'] = $detail['accountclassification'];
                //     $obrDetail['funding'] = $detail['funding'];
                //     $obrDetail['accountcode'] = $detail['accountcode'];
                //     $obrDetail['amount'] = $detail['amount'];
                //     $obrDetail['obrid'] = $obrid;
                //     Obrdetail::create($obrDetail);
                // }

                DB::commit();
                return response()->json(['obr_id'=>$obrid]);
                //  Toastr::success('Obligation Request have been created!!!');
                //  return redirect()->back();
            }catch(\Exception $e){
                DB::rollback();
                Toastr::error('OBR create failed');
                return redirect()->back();
            }

    }

     // public function approve($obrid){
    //     $affected = DB::table('obrheaders')
    //           ->where('id', $obrid)
    //           ->update(['obrstatus' => 3]);
    //     return response()->json(['message'=>"Obligation Request have been approved"]);
    // }

    public function approve(Request $request){
        DB::beginTransaction();
        try{
            DB::table('obrheaders')
            ->where('id',$request->obrid)
            ->update(array('obrnumber' => $request->obrnumber,'obrstatus' => 3));

            DB::table('idcounters')
               ->update(array('obrid' => $request->lastobrid));

            DB::commit();

            return response()->json(['message'=>'Obligation Request have been approved']);
        }catch(\Exceiption $e){
             // Rollback the transaction if any update fails
            DB::rollback();

            return response()->json(['message' => 'Failed to update tables'], 500);
        }
    }


    public function savepayment(Request $request){
        try{
            DB::beginTransaction();
            $payment = new Paymentheader;
            $payment->obrid = $request->obrid;
            $payment->checknumber = $request->checknumber;
            $payment->bankname = $request->bankname;
            $payment->userid=$request->userid;
            $payment->save();

            $paymentid = DB::getPdo()->lastInsertId();
            $details = $request->details;

            foreach($details as $key => $detail){
                $paymentDetail['obr_detail_id'] = $detail['obr_detail_id'];
                $paymentDetail['budgetid'] = $detail['budgetid'];
                $paymentDetail['accountcode'] = $detail['accountcode'];
                $paymentDetail['amountpaid'] = $detail['amountpaid'];
                $paymentDetail['paymentid'] = $paymentid;
                Paymentdetail::create($paymentDetail);
            }
            DB::commit();
            return response()->json(['message'=>'success']);
        }catch(e){

        }
    }

    public function getobrid(){
        $obrid=DB::table("idcounters")
        ->select('obrid')
        ->get();

        return response()->json(['obrid'=>$obrid]);
    }

 
    public function obrtoexcel($yr){
         $obrlist = DB::table('vw_obr')
                    ->select('id','payee','particulars','officecode','officename',
                        'officedesc','address','accountdesc','funding','accountcode','amount')
                    ->where('obrstatus','=','Obligated')
                    ->where('obryear','=',$yr)
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }
   
    public function obrtoexcelbydate($dt){
        $obrlist = DB::table('vw_obr')
                   ->select('id','payee','particulars','officecode','officename',
                       'officedesc','address','accountdesc','funding','accountcode','amount')
                   ->where('obrstatus','=','Obligated')
                   ->where('created_at','=',$dt)
                   ->get();
       return response()->json(['obrlist'=>$obrlist]);
   }

 
    public function updateobr(Request $request,$id){
        try{
            $obrheader = Obrheader::find($id);
            if($obrheader){
                $obrheader->payee = $request->payee;
                $obrheader->address = $request->address;
                $obrheader->officeid = $request->officeid;
                $obrheader->officecode = $request->officecode;
                $obrheader->particulars = $request->particulars;
                $obrheader->obryear = $request->obryear;
                $obrheader->signatory1 = $request->signatory1;
                $obrheader->position1 = $request->position1;
                $obrheader->signatory2 = $request->signatory2;
                $obrheader->position2 = $request->position2;
                $obrheader->save();
    
                Obrdetail::where('obrid',$id)->delete();

                $details = $request->obrdetails;
                // //This is the last update
              
                foreach($details as $key => $detail){
                    $obrDetail['budgetid'] = $detail['budgetid'];
                    $obrDetail['accountdesc'] = $detail['accountdesc'];
                    $obrDetail['accountclassification'] = $detail['accountclassification'];
                    $obrDetail['funding'] = $detail['funding'];
                    $obrDetail['accountcode'] = $detail['accountcode'];
                    $obrDetail['amount'] = $detail['amount'];
                    $obrDetail['obrid'] = $id;
                    Obrdetail::create($obrDetail);
                }
                
            }

            DB::commit();
            return response()->json(['obrid'=>$id]);
        }catch(\Exception $e){
            DB::rollback();
            Toastr::error('Updated Failed');
            return redirect()->back();
        }
    }



}
