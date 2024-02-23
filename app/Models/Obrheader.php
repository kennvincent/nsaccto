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
        'particulars',
        'obryear',
        'signatory1',
        'position1',
        'signatory2',
        'position2',
        'obrstatus',
        'ispaid'
    ];
}
