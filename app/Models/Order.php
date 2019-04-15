<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 't_orders';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $timestamps = false;
}
