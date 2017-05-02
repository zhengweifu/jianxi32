<?php
namespace Home\Controller;
use Think\Controller;
class ProductController extends Controller {
    public function index(){
        $this->display();
    }

    public function getInitData() {
		$products = M('product')->where("status=1")->select();

		if($products) {
			multiArraySort($products, "sid", SORT_ASC);
		}

		echo json_encode($products);
    }

    public function  test() {
        echo "Hello World.";
    }
}