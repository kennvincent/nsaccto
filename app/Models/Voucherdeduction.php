<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucherdeduction extends Model
{
    use HasFactory;
    protected $fillable = [
        'voucher_id',
        'description',
        'amount'
    ];
}
