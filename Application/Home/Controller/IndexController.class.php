<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        $this->display();
    }

    public function getInitData() {
    	$m = M('banner');
		$banners = $m->where("kind=0")->select();

		$outBannerData = array();

		if($banners) {
			multiArraySort($banners, "sid", SORT_ASC);
			foreach ($banners as $key => $value) {
				if($value['status']) {
					array_push($outBannerData, array(
						'url' => $value['path'],
						'link' => $value['link'],
						'labelheader' => $value['labelheader'],
						'labelcontent' => $value['labelbody'],
						'buttonclassname' => $value['buttonclassname']
					));
				} 
			}
		}

		$products = M('product')->where("status=1")->select();

		if($products) {
			multiArraySort($products, "sid", SORT_ASC);
		}

		echo json_encode(Array(banners => $outBannerData, products => $products));
    }

    public function  test() {
        echo "Hello World.";
    }
}