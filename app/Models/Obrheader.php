<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obrheader extends Model
{
    use HasFactory;
    protected $fillable = [
        'obrnumber',
        'payee',
        'officeid',
        'officecode',
        'particulars',
        'obryear',
        'signatory1',
        'position1',
        'signatory2',
        'position2',
        'obrstatus',
        'withvoucher',
        'ispaid'
    ];
}
