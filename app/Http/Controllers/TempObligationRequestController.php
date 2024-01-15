<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tempobligationrequest;
use DB;

class TempObligationRequestController extends Controller
{
    public function insert(Request $request){
        $obr = new Tempobligationrequest;

        $obr->office_id = $request->office_id;
        $obr->accountid =$request->accountid;
        $obr->accountcode = $request->accountcode;
        $obr->amount = $request->amount;
        $obr->save();
    }

    public function index($id){
        

        $tempObr = DB::select("SELECT * FROM tempobligationrequests WHERE office_id = $id");

        return response()->json([
            'obr'=>$tempObr
        ]);
    }

    public function sum($id){
        $tempObrSum = DB::select("SELECT sum(amount) as temptotal FROM tempobligationrequests WHERE office_id = $id");
       
        return response()->json($tempObrSum);
    }

    public function delete($id){
         DB::delete('DELETE FROM tempobligationrequests WHERE office_id = ?', [$id]); 
    }

    
}
