<?php

namespace App\Imports;

use App\Models\Budget;
use Maatwebsite\Excel\Concerns\ToModel;

class BudgetImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Budget([
            'office' => $row[0],
            'particulars' => $row[1],
            'accountcode' => $row[2],
            'budgetyear' =>'2024',
            'proposedamount' => $row[7],
            'accountclassification' =>$row[8],
            'funding' => $row[9],
            'sector' => $row[10],
            'budgetstatus' => '1'
        ]);
    }
}
