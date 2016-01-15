<?php
/**
 * Created by PhpStorm.
 * User: zhengweifu
 * Date: 16/1/9
 * Time: 下午11:31
 */

namespace Admin\Controller;
use Common\Controller\CommonController;

class LoginController extends CommonController {
    public function index() {
        $this->display();
    }

    public function  login() {
        if(!IS_POST) halt('页面不存在!');

        $username = I('username');
        $password = md5(I('password')); //admin 密码 janexiwzz

        $user = M('user')->where(array('username' => $username))->find();

        if(!$user || $user['password'] != $password) {
            $this->error('账号或者密码错误');
        }

        $user['login_date'] = date("Y-m-d H:i:s", time());

        $user['login_ip'] = get_client_ip();

        // update data library
        M('user')->where("uid=%d", array( $user['uid'] ))->save($user);

        // write session
        session('uid', $user['uid']);
        session('username', $username);
        session('date', $user['login_date']);
        session('ip', $user['login_ip']);

        $this->redirect('Admin/Index/index');
    }
}