<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
// use Auth;

class AdminController extends Controller
{
    const HTTP_OK = 200;
    const HTTP_ERROR = 500;
    const HTTP_UNAUTHORIZED = 401;
    const HTTP_FORBIDDEN = 403;

    protected function respond($status, $data, $msg = '', $ext = [])
    {
        return response()->json([
            'code' => $status,
            'data' => (array) $data,
            'msg' => $msg,
            'ext' => $ext
        ]);
    }

    protected function success($data, $msg = '', $ext = [])
    {
        return $this->respond(self::HTTP_OK, $data, $msg, $ext);
    }

    protected function failed($data, $msg = '', $ext = [])
    {
        return $this->respond(self::HTTP_ERROR, $data, $msg, $ext);
    }
}
