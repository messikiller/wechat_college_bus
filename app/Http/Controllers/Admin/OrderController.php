<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Models\Order;

class OrderController extends AdminController
{
    public function list(Request $request)
    {
        $pageno = $request->query('pageno', 1);
        $pagesize = $request->query('pagesize', 20);

        $query = Order::query()->orderBy('created_at', 'desc');

        $total = $query->count();
        $list = $query->limit($pagesize)->offset(($pageno - 1) * $pagesize)->get();

        $typeIdx = [
            0 => '直通车',
            1 => '包车',
            2 => '众筹',
        ];

        $statusIdx = [
            0 => '待支付',
            1 => '已支付',
            2 => '已取消',
        ];

        $ret = [];
        foreach ($list as $index => $item)
        {
            $push = $item->toArray();

            $push['index'] = ($pageno - 1) * $pagesize + $index + 1;
            $push['price'] = round($item->price / 100, 2);
            $push['member_name'] = '-';
            $push['type_desc'] = $typIdx[$item->type];
            $push['status_desc'] = $typIdx[$item->status];
            $push['created_at'] = date('Y-m-d', $item->created_at);

            $ret[] = $push;
        }

        return $this->success($ret, 'OK', compact('pageno', 'pagesize', 'total'));
    }
}
