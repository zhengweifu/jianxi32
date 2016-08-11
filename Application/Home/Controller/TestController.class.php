<?php
namespace Home\Controller;
use Think\Controller;
class TestController extends Controller {
    public function index(){
		
    }

    public function  getData() {
    	$result = Array(
    		'default_conf' => Array(
    			'material' => '925',
    			'title' => 'what is'
			)
		);
        echo json_encode($result);
    }
}