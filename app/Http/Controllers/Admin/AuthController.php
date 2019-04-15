<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use Auth;

class AuthController extends AdminController
{
    public function me(Request $request)
    {
        return $this->success(Auth::user()->toArray(), 'OK');
    }

    public function logout(Request $requst)
    {
        Auth::logout();
        return $this->success([], 'OK');
    }
}
