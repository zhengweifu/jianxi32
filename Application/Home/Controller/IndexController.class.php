<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
       $this->success("添加成功", U('Home/Index/test'));
    }

    public function  test() {
        echo "Hello World.";
    }
}