<?php
namespace Home\Controller;
use Think\Controller;
class JX2DController extends Controller {
    public function index(){
//       $this->success("添加成功", U('Home/Index/test'));
        $this->display();
    }

    public function  test() {
        echo "Hello World.";
    }
}