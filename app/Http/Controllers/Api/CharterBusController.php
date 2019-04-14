<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use App\Models\CharterBusRecord;

class CharterBusController extends ApiController
{
    public function add(Request $request)
    {
        CharterBusRecord::create([
            'type' => $request->input('type', 0),
            'src' => $request->input('src', ''),
            'dest' => $request->input('dest', ''),
            'started_at' => strtotime($request->input('started_at', '')),
            'ended_at' => strtotime($request->input('ended_at', '')),
            'mobile' => $request->input('mobile', ''),
            'contactor' => $request->input('contactor', ''),
            'remark' => $request->input('remark', ''),
            'passengers_num' => $request->input('passengers_num', 0),
            'price' => 0,
            'status' => 0,
            'created_at' => time(),
        ]);

        return $this->success([], 'OK');
    }
}
