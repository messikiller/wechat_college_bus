<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Models\User;
use Auth;

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
            $push['created_at'] = $item->created_at->toDateString();

            $ret[] = $push;
        }

        return $this->success($ret, 'OK', compact('pageno', 'pagesize', 'total'));
    }

    public function add(Request $request)
    {
        $username = $request->input('username', '');
        $email = $request->input('email', '');
        $password = $request->input('password', '');

        if (User::where('name', $username)->count() > 0) {
            return $this->failed([], '用户名已存在！');
        }

        if (User::where('email', $email)->count() > 0) {
            return $this->failed([], '邮箱已经被使用！');
        }

        User::create([
            'name' => $username,
            'email' => $email,
            'password' => bcrypt($password)
        ]);

        return $this->success([], 'OK');
    }

    public function resetPassword(Request $request)
    {
        $id = $request->query('id', 0);
        $password = $request->input('password', '');

        $user = User::find($id);
        $user->password = bcrypt($password);
        $user->save();

        return $this->success([], 'OK');
    }

}
