<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voucher;
use App\Models\Voucherdeduction;
use Illuminate\Support\Facades\DB;

class VoucherController extends Controller
{
    public function savevoucher(Request $request){
       
        try{
            DB::beginTransaction();
            $voucher = new Voucher;
            $voucher->obrid = $request->obrid;
            $voucher->obrnumber = $request->obrnumber;
            $voucher->payee = $request->payee;
            $voucher->explanation = $request->explanation;
            $voucher->address = $request->address;
            $voucher->voucheramount = $request->voucheramount;
            $voucher->checknumber = $request->checknumber;
            $voucher->bank = $request->bank;
            $voucher->signatory1 = $request->signatory1;
            $voucher->signatory1position = $request->signatory1position;
            $voucher->signatory2 = $request->signatory2;
            $voucher->signatory2position = $request->signatory2position;
            $voucher->signatory3 = $request->signatory3;
            $voucher->signatory3position = $request->signatory3position;
            $voucher->voucherstatus ='1';
            $voucher->save();

            $voucher_id = DB::getPdo()->lastInsertId();
            $deductions = $request->deductions;

            if($deductions){
                foreach($deductions as $key => $deduct){
                    $voucherDeduction['description'] = $deduct['description'];
                    $voucherDeduction['amount'] = $deduct['amount'];
                    $voucherDeduction['voucher_id'] = $voucher_id;
                    voucherdeduction::create($voucherDeduction);
                }
            }

            $voucherstatus = $request->voucherstatus;
            DB::table('obrheaders')
            ->where('id',$request->obrid)
            ->update(array('withvoucher' => $voucherstatus));

            
            DB::commit();
            return response()->json(['voucher'=>$voucher_id]);
        }
        catch(e){

        }

        
    }

    public function printpreview(){
        
    }

    public function voucherslist(){
        $vouchers = Voucher::all();
        return response()->json(['vouchers'=>$vouchers]);
    }


    public function selectedvoucher($voucher_id){
        $voucher = DB::table('vw_voucher')
                    ->select('id',
                            'obrnumber',
                            'payee',
                            'explanation',
                            'address',
                            'voucheramount',
                            'description',
                            'amount',
                            'checknumber',
                            'bank',
                            'signatory1',
                            'signatory1position',
                            'signatory2',
                            'signatory2position',
                            'signatory3',
                            'signatory3position')
                    ->where('id','=',[$voucher_id])
                    ->get();
            return response()->json(['voucher'=>$voucher]);
    }

    public function updateobr(Request $request){
        // DB::table('obrheaders')
        //     ->where('id',$request->obrid)
        //     ->update(array('withvoucher' => '1'));
        
        // return response()->json($obrid);

    }

    public function voucherdeductions($obrid){
        $deductions = DB::table('vw_voucher')
            ->select('amount')
            ->where('id','=',$obrid)
            ->get();
    }

    public function getobrvoucher($obrid){
        $vouchers = DB::table('vouchers')
                ->select('id','obrid','checknumber','bank','created_at','voucheramount')
                ->where('obrid','=',$obrid)
                ->orderBy('id','DESC')
                ->get();

        return response()->json(['vouchers'=>$vouchers]);

    }

    public function getobrvoucherheadereditview($id){
        $voucher = DB::table('vouchers')
        ->select('id','obrid','payee','address','explanation','voucheramount')
        ->where('id','=',$id)
        ->get();
        return response()->json(['voucher'=>$voucher]);
    }


    public function getobrvouchereditdeductionsview($id){
        $deductions = DB::table('voucherdeductions')
                ->select('description','amount')
                ->where('voucher_id','=',$id)
                ->get();
        return response()->json(['deductions'=>$deductions]);
    }

    public function updatevoucher(Request $request,$id){
        try{
            $voucher = Voucher::find($id);
            if($voucher){
                $voucher->payee = $request->payee;
                $voucher->explanation = $request->explanation;
                $voucher->address = $request->address;
                $voucher->voucheramount = $request->voucheramount;
                $voucher->checknumber = $request->checknumber;
                $voucher->bank = $request->bank;
                $voucher->signatory1 = $request->signatory1;
                $voucher->signatory1position = $request->signatory1position;
                $voucher->signatory2 = $request->signatory2;
                $voucher->signatory2position = $request->signatory2position;
                $voucher->signatory3 = $request->signatory3;
                $voucher->signatory3position = $request->signatory3position;
                $voucher->voucherstatus ='1';
                $voucher->save();
        
                Voucherdeduction::where('voucher_id',$id)->delete();

                $details = $request->deductions;
                // // //This is the last update
              
                foreach($details as $key => $detail){
                    $deduction['voucher_id'] = $id;
                    $deduction['description'] = $detail['description'];
                    $deduction['amount'] = $detail['amount'];
                    Voucherdeduction::create($deduction);
                }
                
            }

            DB::commit();
            return response()->json(['voucher'=>$id]);
        }catch(\Exception $e){
            DB::rollback();
            Toastr::error('Updated Failed');
            return redirect()->back();
        }
    }
}
