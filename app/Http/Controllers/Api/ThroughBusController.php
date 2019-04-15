<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use App\Models\ThroughBus;

class ThroughBusController extends ApiController
{
    public function index(Request $request)
    {
        $query = ThroughBus::query()->orderBy('created_at', 'desc');

        $list = $query->get();

        $ret = [];
        foreach ($list as $item)
        {
            $push = $item->toArray();

            $push['price'] = round($item->price / 100, 2);
            $push['left_at'] = date('H:i', $item->left_at);
            $push['arrived_at'] = date('H:i', $item->arrived_at);
            $push['start_date'] = date('Y.m.d', $item->start_date);
            $push['end_date'] = date('Y.m.d', $item->end_date);
            $push['created_at'] = date('Y-m-d', $item->created_at);

            $ret[] = $push;
        }

        return $this->success($ret, 'OK');
    }

    public function view(Request $request)
    {
        $id = $request->query('id', 0);
        $item = ThroughBus::find($id);

        $ret = $item->toArray();

        $ret['price'] = round($item->price / 100, 2);
        $ret['left_at'] = date('H:i:s', $item->left_at);
        $ret['arrived_at'] = date('H:i:s', $item->arrived_at);
        $ret['start_date'] = date('Y-m-d', $item->start_date);
        $ret['end_date'] = date('Y-m-d', $item->end_date);
        $ret['created_at'] = date('Y-m-d', $item->created_at);

        return $this->success($ret, 'OK');
    }

    public function buy(Request $request)
    {

    }
}
