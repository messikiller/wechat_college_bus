<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Models\CharterBusRecord;

class CharterBusController extends AdminController
{
    public function list(Request $request)
    {
        $pageno = $request->query('pageno', 1);
        $pagesize = $request->query('pagesize', 20);

        $query = CharterBusRecord::query()->orderBy('created_at', 'desc');

        $total = $query->count();
        $list = $query->limit($pagesize)->offset(($pageno - 1) * $pagesize)->get();

        $typeIdx = [
            0 => '单程',
            1 => '往返',
            2 => '全天',
        ];

        $statusIdx = [
            0 => '待报价',
            1 => '待支付',
        ];

        $ret = [];
        foreach ($list as $index => $item)
        {
            $push = $item->toArray();

            $push['index'] = ($pageno - 1) * $pagesize + $index + 1;
            $push['price'] = round($item->price / 100 * 1.00, 2);
            $push['started_at'] = date('Y-m-d H:i', $item->started_at);
            $push['ended_at'] = date('Y-m-d H:i', $item->ended_at);
            $push['created_at'] = date('Y-m-d', $item->created_at);

            $push['type_desc'] = $typeIdx[$item->type];
            $push['status_desc'] = $statusIdx[$item->status];

            $ret[] = $push;
        }

        return $this->success($ret, 'OK', compact('pageno', 'pagesize', 'total'));
    }

    public function offer(Request $request)
    {
        $id = $request->query('id', 0);

        $model = CharterBusRecord::find($id);

        $model->price = intval($request->input('price', 0) * 100);
        $model->status = 1;

        $model->save();

        return $this->success([], 'OK');
    }
}
