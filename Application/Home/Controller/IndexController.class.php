<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
		$m = M('banner');
		$banners = $m->where("kind=1")->select();
		// var_dump($banners); 

		$outBannerData = array();

		if($banners) {
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

		$this->assign('jx_banners', $outBannerData);

        $this->display();
    }

    public function  test() {
        echo "Hello World.";
    }
}