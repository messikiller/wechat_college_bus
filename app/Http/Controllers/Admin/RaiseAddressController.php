<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Models\RaiseAddress;

class RaiseAddressController extends AdminController
{
    public function add(Request $request)
    {
        $title = $request->input('title', '');
        if (RaiseAddress::where('title', $title)->count() > 0) {
            return $this->failed([], '地址已经被使用！');
        }

        RaiseAddress::create([
            'title' => $title,
            'type' => $request->input('type'),
            'created_at' => time()
        ]);

        return $this->success([], 'OK');
    }

    public function list(Request $request)
    {
        $pageno = $request->query('pageno', 1);
        $pagesize = $request->query('pagesize', 20);

        $query = RaiseAddress::query()->orderBy('created_at', 'desc');

        $total = $query->count();

        if (($type = $request->input('type', false)) !== false) {
            $query = $query->where('type', $type);
        }

        if (($page_off = $request->input('close_page', 'F')) !== 'T') {
            $query = $query->limit($pagesize)->offset(($pageno - 1) * $pagesize);
        }

        $list = $query->get();

        $typeIdx = [
            0 => '学校',
            1 => '家乡',
        ];

        $ret = [];
        foreach ($list as $index => $item)
        {
            $push = $item->toArray();

            $push['index'] = ($pageno - 1) * $pagesize + $index + 1;
            $push['type_desc'] = $typeIdx[$item->type];
            $push['created_at'] = date('Y-m-d', $item->created_at);

            $ret[] = $push;
        }

        return $this->success($ret, 'OK', compact('pageno', 'pagesize', 'total'));
    }
}
