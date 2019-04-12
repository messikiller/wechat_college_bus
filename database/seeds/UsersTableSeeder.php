<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('t_users')->insert([
            'name' => 'admin',
            'email' => 'admin@qq.com',
            'password' => bcrypt('admin')
        ]);
    }
}
