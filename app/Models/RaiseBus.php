<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\RaiseAddress;

class RaiseBus extends Model
{
    protected $table = 't_raise_buses';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $timestamps = false;

    public function src()
    {
        return $this->belongsTo(RaiseAddress::class, 'src_id', 'id');
    }

    public function dest()
    {
        return $this->belongsTo(RaiseAddress::class, 'dest_id', 'id');
    }
}
