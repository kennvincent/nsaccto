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
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                             'officedesc','address','totalamount','obrstatus')
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function viewlistbyoffice($office){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                             'officedesc','address','totalamount','obrstatus')
                    ->where('officename','=',$office)
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    
    
    public function viewobr($id){
        $obrlist = DB::table('vw_obr')
                    ->select('id','payee','particulars','officecode','officename',
                        'officedesc','address','accountcode','amount','totalamount','obrstatus')
                    ->where('id','=',[$id])
                    ->get();
        return response()->json(['obr'=>$obrlist]);
    }

    public function accountingselectedviewobr($id){
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
                    ->where('id','=',[$id])
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
                        'obrstatus')
                ->where('id','=',[$id])
                ->get();
        return response()->json(['obr'=>$obr]);
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
                            'obrstatus')
                    ->where('obrstatus','Approved')
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
                             'officedesc','address','totalamount','obrstatus')
                    // ->where('officename',[$officename])
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function accountingviewlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','address','totalamount','totalamountpaid',
                    'balance','obrstatus','withvoucher')
                    ->where('balance','>',0)
                    ->where('obrstatus','=','Obligated')
                    ->orderBy('id','DESC')
                    ->get();

        return response()->json(['obrlist'=>$obrlist]);
    }

    public function accountingviewobrpaidlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','address','totalamount','totalamountpaid',
                    'balance','obrstatus')
                    ->where('balance','=',0)
                    ->orderBy('id','DESC')
                    ->get();

        return response()->json(['obrlist'=>$obrlist]);
    }

    public function accountingviewlistselectedoffice($id){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','address','totalamount','totalamountpaid',
                    'balance','obrstatus')
                    ->where('officeid','=',$id)
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

    public function officeapproveallobr(Request $request){
        try{
            DB::beginTransaction();
            foreach($request as $data){
                return response()->json(['message'=>$request]);

                // $affected = DB::table('obrheaders')  
                // ->where('id', $obr->id);
                // // ->update(['obrstatus' => 2]);

            }

            // foreach ($requestData as $data) {
            //     // Retrieve the record by its ID
            //     $record = YourModel::find($data['id']);
        
            //     // Check if the record exists
            //     if ($record) {
            //         // Update the record with the data from the request
            //         $record->update($data);
            //     }
            // }
            
            DB::commit();
            return response()->json(['message'=>'All OBR have been approved']);
        }catch(\Exception $e){
             DB::rollback();
                Toastr::error('OBR create failed');
                return redirect()->back();
        }
    }

    public function officecancel($obrid){
        $affected = DB::table('obrheaders')
              ->where('id', $obrid)
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
                $obr->obrstatus='1';
                $obr->withvoucher='0';
                $obr->ispaid='0';
                $obr->save();

                $details = $request->obrdetails;
                // // //$obrid = DB::table('obrheaders')->select('id')->lastInsertedId();
                // // // $obrid = $obrid->id;

                //This is the last update
                $obrid = DB::getPdo()->lastInsertId();
                foreach($details as $key => $detail){
                    $obrDetail['accountdesc'] = $detail['name']['accountdesc'];
                    $obrDetail['accountclassification'] = $detail['name']['accountclassification'];
                    $obrDetail['funding'] = $detail['name']['funding'];
                    $obrDetail['accountcode'] = $detail['name']['accountcode'];
                    $obrDetail['amount'] = $detail['name']['amount'];
                    $obrDetail['obrid'] = $obrid;
                    Obrdetail::create($obrDetail);
                }


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
            $payment->userid=2;
            $payment->save();

            $paymentid = DB::getPdo()->lastInsertId();
            $details = $request->details;

            foreach($details as $key => $detail){
                $paymentDetail['obr_detail_id'] = $detail['obr_detail_id'];
                $paymentDetail['accountcode'] = $detail['accountcode'];
                $paymentDetail['amountpaid'] = $detail['amountpaid'];
                $paymentDetail['paymentid'] = $paymentid;
                Paymentdetail::create($paymentDetail);
            }
            DB::commit();
            return response()->json(['message'=>'Payment have been saved']);
        }catch(e){

        }
    }

    public function getobrid(){
        $obrid=DB::table("idcounters")
        ->select('obrid')
        ->get();

        return response()->json(['obrid'=>$obrid]);
    }
   
}
