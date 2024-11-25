<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paymentdetail extends Model
{
    use HasFactory;
    protected $fillable=[
        'paymentid',
        'obr_detail_id',
        'budgetid',
        'accountcode',
        'amountpaid',
        'vat',
        'pt',
        'ewt1',
        'ewt2',
        'retention',
        'recompensate',
        'aggregate',
        'penalties',
        'others',
    ];
}
