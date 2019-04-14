<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CharterBusRecord extends Model
{
    protected $table = 't_charter_bus_records';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $timestamps = false;
}
