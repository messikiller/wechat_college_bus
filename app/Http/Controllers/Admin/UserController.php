<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Models\User;

class UserController extends AdminController
{
    public function list(Request $request)
    {
        $pageno = $request->query('pageno', 1);
        $pagesize = $request->query('pagesize', 20);

        $query = User::query()->where('id', '>', 1)->orderBy('created_at', 'desc');

        $total = $query->count();
        $list = $query->limit($pagesize)->offset(($pageno - 1) * $pagesize)->get();

        $ret = [];
        foreach ($list as $index => $item)
        {
            $push = $item->toArray();

            $push['index'] = ($pageno - 1) * $pagesize + $index + 1;
            $push['created_at'] = date('Y-m-d', $item->created_at);

            $ret[] = $push;
        }

        return $this->success($ret, 'OK', compact('pageno', 'pagesize', 'total'));
    }

    public function add(Request $request)
    {

    }

    public function resetPassword(Request $request)
    {

    }
}
