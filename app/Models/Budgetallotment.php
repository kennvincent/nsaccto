<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budgetallotment extends Model
{
    use HasFactory;
    protected $fillable = [
        'office_id',
        'account_id',
        'amount',
        'budgetyear'
    ];
}
