<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaiseBus extends Model
{
    protected $table = 't_raise_buses';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $timestamps = false;
}
