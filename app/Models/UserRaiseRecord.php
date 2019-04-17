<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRaiseRecord extends Model
{
    protected $table = 't_user_raise_records';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $timestamps = false;
}
