<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Models\Member;

class MemberController extends AdminController
{
    public function list(Request $request)
    {
        $pageno = $request->query('pageno', 1);
        $pagesize = $request->query('pagesize', 20);

        $query = Member::query()->orderBy('created_at', 'desc');

        $isManagerIdx = [
            0 => '否',
            1 => '是'
        ];

        $total = $query->count();
        $list = $query->limit($pagesize)->offset(($pageno - 1) * $pagesize)->get();

        $ret = [];
        foreach ($list as $index => $item)
        {
            $push = $item->toArray();

            $push['index'] = ($pageno - 1) * $pagesize + $index + 1;
            $push['is_manager_desc'] = $isManagerIdx[$item->is_manager];
            $push['created_at'] = date('Y-m-d', $item->created_at);

            $ret[] = $push;
        }

        return $this->success($ret, 'OK', compact('pageno', 'pagesize', 'total'));
    }

    public function setManager(Request $request)
    {
        $id = $request->query('id', 0);

        $model = Member::find($id);
        $model->is_manager = 1;
        $model->save();

        return $this->success([], 'OK');
    }
}
