<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Models\ThroughBus;

class ThroughBusController extends AdminController
{
    public function list(Request $request)
    {
        $pageno = $request->query('pageno', 1);
        $pagesize = $request->query('pagesize', 20);

        $query = ThroughBus::query()->orderBy('created_at', 'desc');

        $total = $query->count();
        $list = $query->limit($pagesize)->offset(($pageno - 1) * $pagesize)->get();

        $statusIdx = [
            0 => '正常',
            1 => '已禁用',
        ];

        $ret = [];
        foreach ($list as $index => $item)
        {
            $push = $item->toArray();

            $push['index'] = ($pageno - 1) * $pagesize + $index + 1;
            $push['price'] = round($item->price / 100 * 1.00, 2);
            $push['left_at'] = date('H:i:s', $item->left_at);
            $push['arrived_at'] = date('H:i:s', $item->arrived_at);
            $push['start_date'] = date('Y-m-d', $item->start_date);
            $push['end_date'] = date('Y-m-d', $item->end_date);
            $push['created_at'] = date('Y-m-d', $item->created_at);
            $push['status_desc'] = $statusIdx[$item->status];

            $ret[] = $push;
        }

        return $this->success($ret, 'OK', compact('pageno', 'pagesize', 'total'));
    }

    public function add(Request $request)
    {
        ThroughBus::create([
            'src' => $request->input('src', ''),
            'dest' => $request->input('dest', ''),
            'price' => intval($request->input('price', 0) * 100),
            'left_at' => strtotime('1970-01-01 ' . $request->input('left_at', '00:00:00')),
            'arrived_at' => strtotime('1970-01-01 ' . $request->input('arrived_at', '00:00:00')),
            'start_date' => strtotime($request->input('start_date', '1970-01-01')),
            'end_date' => strtotime($request->input('end_date', '1970-01-01')),
            'status' => 0,
            'created_at' => time()
        ]);

        return $this->success([], 'OK');
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

    public function edit(Request $request)
    {
        $id = $request->query('id', 0);
        $model = ThroughBus::find($id);

        $model->src = $request->input('src', '');
        $model->dest = $request->input('dest', '');
        $model->price = intval($request->input('price', 0) * 100);
        $model->left_at = strtotime('1970-01-01 ' . $request->input('left_at', '00:00:00'));
        $model->arrived_at = strtotime('1970-01-01 ' . $request->input('arrived_at', '00:00:00'));
        $model->start_date = strtotime($request->input('start_date', '1970-01-01'));
        $model->end_date = strtotime($request->input('end_date', '1970-01-01'));
        $model->status = intval($request->input('status', 0));

        $model->save();

        return $this->success([], 'OK');
    }
}
