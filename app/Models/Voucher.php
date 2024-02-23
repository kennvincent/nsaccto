<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;
    protected $fillable = [
        'obrnumber',
        'payee',
        'explanation',
        'address',
        'obramount',
        'bank',
        'signatory1',
        'signatory1position',
        'signatory2',
        'signatory2position',
        'signatory3',
        'signatory3position',
        'voucherstatus'
    ];
}
