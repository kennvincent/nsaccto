<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Augmentationheader extends Model
{
    use HasFactory;
    protected $fillable=[
        'fy',
        'lgu',
        'officename',
        'ordinanceno',
        'augmentationno',
        'dated',
        'userid',
    ];
}
