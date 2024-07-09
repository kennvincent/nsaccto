<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Augmentationdetail extends Model
{
    use HasFactory;
    protected $fillable=[
        'augmentation_id',
        'object_expenditures_from',
        'expense_class_from',
        'amount_from',
        'object_expenditures_to',
        'expense_class_to',
        'amount_to'
    ];
}
