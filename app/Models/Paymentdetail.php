<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paymentdetail extends Model
{
    use HasFactory;
    protected $fillable=[
        'obr_detail_id',
        'budgetid',
        'accountcode',
        'amountpaid',
        'paymentid'
    ];
}
