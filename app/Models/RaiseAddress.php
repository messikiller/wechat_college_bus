<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaiseAddress extends Model
{
    protected $table = 't_raise_addresses';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $timestamps = false;
}
