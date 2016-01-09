<?php
/**
 * Created by PhpStorm.
 * User: zhengweifu
 * Date: 16/1/9
 * Time: 下午11:31
 */

namespace Admin\Controller;
use Think\Controller;

class LoginController extends Controller {
    public function index() {
        $this->display();
    }

    public function  login() {
        if(!IS_POST) halt('页面不存在!');

        $username = I('username');
        $password = I('password');

        $user = M('user')->where(array('username' => $username))->find();

        if(!$user || $user['password'] != $password) {
            $this->error('账号或者密码错误');
        }

        // write session
        session('uid', $user['id']);
        session('username', $username);

        $this->redirect('Admin/Index/index');

        var_dump($user);
    }
}