<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThroughBus extends Model
{
    protected $table = 't_through_buses';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $timestamps = false;
    
}
