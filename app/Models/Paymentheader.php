<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paymentheader extends Model
{
    use HasFactory;
    protected $fillable=[
        'obrid',
        'checknumber',
        'bankname',
        'userid'
    ];
}
