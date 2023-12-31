<?php
namespace App\Http\Controllers\Api;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;



class AccountsController extends Controller
{

    
    public function index(){
        $accounts = Account::all();
        if($accounts){
            return response()->json(['accounts'=>$accounts]);
        }else{
            return response()->json([
                'status'=> 404,
                'message'=>'No data found'
            ],404);
        }
        
    }

   
   public function edit($id){
        
        $account = Account::find($id);
        return response()->json(['account'=>$account]);
   }

   public function insert(Request $request){
        // return response()->json($request);
        $validator = Validator::make($request->all(),
        [
            'accountdesc' => 'required',
            'accountcode' => 'required',
            
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'message'=>$validator->messages()
            ],422);
        }else{
        

            $result = Account::where("accountcode", $request->accountcode)->exists();
            
            if(!$result){
                
                $account = new Account;

                $account->accountdesc = $request->accountdesc;
                $account->accountcode = $request->accountcode;
                
                
                $account->save();

                if($account){
                    return response()->json([
                        'status'=>200,
                        'message'=>"New account created successfully"
                    ],200);
                }else{
                    return response()->json([
                        'status'=>500,
                        'message'=>"New account create failed"
                    ],200);
                }
            }
            else{
                return response()->json(['message'=>"Account already exist"]);
            }
            
            
        }
   }
  
    public function update(Request $request){
        
        // return response()->json(['id'=>$request->id]);
       
        $validator = Validator::make($request->all(),
        [
            'accountdesc' => 'required',
            'accountcode' => 'required',
            
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages()
            ],422);
        }else{
           
            $account = Account::find($request->id);
            $account -> update(
                [
                    'accountdesc' => $request->accountdesc,
                    'accountcode' => $request->accountcode,
                  
                ]
            );

            if($account){
                return response()->json([
                    'status'=>200,
                    'message'=>"Account updated successfully"
                ],200);
            }else{
                return response()->json([
                    'status'=>500,
                    'message'=>"Account update failed"
                ],200);
            }
            
        }
    }
}
