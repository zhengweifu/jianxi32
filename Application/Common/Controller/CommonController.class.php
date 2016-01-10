<?php

/**
 * Created by PhpStorm.
 * User: zhengweifu
 * Date: 16/1/10
 * Time: 下午2:02
 */
namespace Common\Controller;
use Think\Controller;

class CommonController extends Controller {
    public function _initialize() {
        if (!isset($_SESSION['id'])) {
            $this->redirect('Admin/Login/index');
        }
    }

}