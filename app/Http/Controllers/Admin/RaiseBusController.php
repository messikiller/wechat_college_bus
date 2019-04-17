<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Models\RaiseBus;

class RaiseBusController extends AdminController
{
    public function list(Request $request)
    {
        $pageno = $request->query('pageno', 1);
        $pagesize = $request->query('pagesize', 20);

        $query = RaiseBus::query()->with('src', 'dest')->orderBy('created_at', 'desc');

        $total = $query->count();
        $list = $query->limit($pagesize)->offset(($pageno - 1) * $pagesize)->get();

        $typeIdx = [
            0 => '回乡',
            1 => '返校'
        ];

        $statusIdx = [
            0 => '众筹中',
            1 => '众筹成功',
            2 => '众筹失败',
            3 => '众筹取消',
        ];

        $ret = [];
        foreach ($list as $index => $item)
        {
            $push = $item->toArray();

            $push['index'] = ($pageno - 1) * $pagesize + $index + 1;
            $push['date'] = date('Y-m-d', $item->date);
            $push['left_at'] = date('H:i', $item->left_at);
            $push['created_at'] = date('Y-m-d', $item->created_at);
            $push['price'] = round($item->price / 100, 2);
            $push['type_desc'] = $typeIdx[$item->type];
            $push['status_desc'] = $typeIdx[$item->status];
            $push['src_title'] = $item->src->title;
            $push['dest_title'] = $item->dest->title;

            $ret[] = $push;
        }

        return $this->success($ret, 'OK', compact('pageno', 'pagesize', 'total'));
    }

    public function add(Request $request)
    {
        $date = $request->input('date');
        $left_at = $request->input('left_at');

        RaiseBus::create([
            'src_id' => $request->input('src_id', 0),
            'dest_id' => $request->input('dest_id', 0),
            'type' => $request->input('type', 0),
            'date' => strtotime($date),
            'left_at' => strtotime("{$date} ${left_at}"),
            'price' => intval($request->input('price', 0) * 100),
            'min' => $request->input('min', 0),
            'status' => 0,
            'created_at' => time(),
        ]);

        return $this->success([], 'OK');
    }
}
