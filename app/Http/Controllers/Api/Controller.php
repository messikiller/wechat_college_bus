<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as BaseController;
use Auth;

class Controller extends BaseController
{
    const HTTP_OK = 200;
    const HTTP_ERROR = 500;
    const HTTP_UNAUTHORIZED = 401;
    const HTTP_FORBIDDEN = 403;

    protected $user;

    public function __construct()
    {
        parent::__construct();
        $this->user = Auth::user();
    }

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

    protected function failed()
    {
        return $this->respond(self::HTTP_ERROR, $data, $msg, $ext);
    }
}
