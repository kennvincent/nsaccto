<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obrdetail extends Model
{
    use HasFactory;
    protected $fillable=[
        'accountcode',
        'amount',
        'obrid'
    ];
}
