<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Augmentationdetail extends Model
{
    use HasFactory;
    protected $fillable=[
        'augmentation_id',
        'budget_id_from',
        'object_expenditures_from',
        'expense_class_from',
        'amount_from',
        'officecode_from',
        'budget_id_to',
        'object_expenditures_to',
        'expense_class_to',
        'amount_to',
        'officecode_to'
    ];
}
