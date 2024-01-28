<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Office;

class OfficeController extends Controller
{
    public function index(){
        $offices = Office::all();
        if($offices->count()){
            return response()->json([
                'offices'=>$offices
            ]);
        } else{
            return response()->json([
                'message'=>'No record found'
            ]);
        }
    }


    public function search($id){
        $office = Office::find($id);
        return response()->json(['office'=>$office]);
    }

    public function insert(Request $request){
        $validator = Validator::make($request->all(),
        [
            'officecode' => 'required',
            'officename' => 'required',
            'officedesc' => 'required',
            'officeaddress' => 'required',
            'authorizedpersonnel' =>'required',
            'position' => 'required'
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'message'=>$validator->messages()
            ],422);
        }else{
        
        }
            $result = Office::where("officecode", $request->officecode)->exists();
            
            if(!$result){
                
                $office = new Office;

                $office->officecode = $request->officecode;
                $office->officename = $request->officename;
                $office->officedesc = $request->officedesc;
                $office->officeaddress = $request->officeaddress;
                $office->authorizedpersonnel = $request->authorizedpersonnel;
                $office->position = $request->position;
                $office->save();

                if($office){
                    return response()->json([
                        'status'=>200,
                        'message'=>"New office created successfully"
                    ],200);
                }else{
                    return response()->json([
                        'status'=>500,
                        'message'=>"New office create failed"
                    ],200);
                }
            }
            else{
                return response()->json(['message'=>"Office already exist"]);
            }
    
    }

    public function edit($id){
        $office = Office::find($id);
        return response()->json(['office'=>$office]);

    }
    public function update(Request $request){
        //return response()->json(['message'=>"Update successful"]);
        
        
        $validator = Validator::make($request->all(),
        [
            'officecode' => 'required',
            'officename' => 'required',
            'officedesc' => 'required',
            'officeaddress' => 'required',
            'authorizedpersonnel' => 'required',
            'position' => 'required',
            
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages()
            ],422);
        }else{
           
            $office = Office::find($request->id);
            $office -> update(
                [
                    'officecode' => $request->officecode,
                    'officename' => $request->officename,
                    'officedesc' => $request->officedesc,
                    'officeaddress' => $request->officeaddress,
                    'authorizedpersonnel' => $request->authorizedpersonnel,
                    'position' => $request->position,
                  
                ]
            );

            if($office){
                return response()->json([
                    'status'=>200,
                    'message'=>"Office updated successfully"
                ],200);
            }else{
                return response()->json([
                    'status'=>500,
                    'message'=>"Office update failed"
                ],200);
            }
            
        }
    }
}
