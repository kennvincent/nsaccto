<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Obrheader;
use App\Models\Obrdetail;
use Illuminate\Support\Facades\DB;

class ObligationRequestController extends Controller
{

    public function viewlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                             'officedesc','officeaddress','totalamount','obrstatus')
                    ->orderBy('id','DESC')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }

    public function viewobr($id){
        $obrlist = DB::table('vw_obr')
                    ->select('id','payee','particulars','officecode','officename',
                        'officedesc','officeaddress','accountcode','amount','totalamount','obrstatus')
                    ->where('id','=',[$id])
                    ->get();
        return response()->json(['obr'=>$obrlist]);
    }

    public function printpreview($id){

        // $obr = DB::table('vw_obr')
                //  ->select('id','payee',DB::raw('SUM(amount) as total'))
                //  ->groupBy('id')
                //  ->where('id','=',[$id])
                // ->get();

        $obr = DB::table('vw_obr')
                ->select('id',
                        'payee',
                        'particulars',
                        'officecode',
                        'officename',
                        'officedesc',
                        'officeaddress',
                        'accountcode',
                        'amount',
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


    public function budgetviewlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','officeaddress','totalamount','obrstatus')
                    ->get();
        return response()->json(['obrlist'=>$obrlist]);
    }


    public function accountingviewlist(){
        $obrlist = DB::table('vw_obrheaders')
                    ->select('id','payee','particulars','officecode','officename',
                    'officedesc','officeaddress','totalamount','obrstatus')
                    ->where('obrstatus','=','Approved')
                    ->get();

        return response()->json(['obrlist'=>$obrlist]);
    }
    public function approve($obrid){
        $affected = DB::table('obrheaders')
              ->where('id', $obrid)
              ->update(['obrstatus' => 3]);
        return response()->json(['message'=>"Obligation Request have been approved"]);
    }

    public function officeapprove($obrid){
        $affected = DB::table('obrheaders')
              ->where('id', $obrid)
              ->update(['obrstatus' => 2]);
        return response()->json(['message'=>"Saved as obligated"]);
    }

    public function officecancel($obrid){
        $affected = DB::table('obrheaders')
              ->where('id', $obrid)
              ->update(['obrstatus' => 0]);
        return response()->json(['message'=>"Obligation Request have been cancelled"]);
    }

    public function reject($obrid){
        $affected = DB::table('obrheaders')
              ->where('id', $obrid)
              ->update(['obrstatus' => 3]);
        return response()->json(['message'=>"Obligation Request have been rejected"]);
    }

    
    public function insert(Request $request){
          
          
            try
            {
                DB::beginTransaction();
                $obr = new Obrheader;
                $obr->payee = $request->payee;
                $obr->officeid = $request->officeid;
                $obr->particulars = $request->particulars;
                $obr->signatory1 = $request->signatory1;
                $obr->position1 = $request->position1;
                $obr->signatory2 = $request->signatory2;
                $obr->position2 = $request->position2;
                $obr->obrstatus='1';
                $obr->ispaid='0';
                $obr->save();

                $details = $request->obrdetails;
                // // //$obrid = DB::table('obrheaders')->select('id')->lastInsertedId();
                // // // $obrid = $obrid->id;
                
                $obrid = DB::getPdo()->lastInsertId();
                foreach($details as $key => $detail){
                    $obrDetail['accountcode'] = $detail['accountcode'];
                    $obrDetail['amount'] = $detail['amount'];
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
   
}
