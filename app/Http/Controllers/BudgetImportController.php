<?php

namespace App\Http\Controllers;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use App\Imports\BudgetImport;
use App\Models\Budget;
use Http;
use Storage;

class BudgetImportController extends Controller
{
    public function import(Request $request){
        
      
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);
 
        // // Get the uploaded file
        // $file = $request->file('file');
        
        
        
        //Excel::import(new BudgetImport,'D:\SYSTEM DEVELOPMENT OFFICIAL\Web Development\GAAImport.xlsx');
        //Excel::import(new BudgetImport,$request->file('budget')->store('budgets'));
        $file = $request->file('file');
        Excel::import(new BudgetImport,$file);
        // (new BudgetImport)->import($request->file('budget'));
        return response()->json(['message'=>'Budget have been imported!!!']);
    }

    public function display(){
        $budgets = Budget::all();
        return response()->json(['budgets'=>$budgets]);
    }
}
