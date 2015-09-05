<?php
/**
 * Created by PhpStorm.
 * User: zhengweifu
 * Date: 15/8/31
 * Time: 下午9:07
 */

namespace Home\Controller;
use Think\Controller;


class JXPhotoController extends Controller {
    public function index() {

        $pictrues = array("Public/jxphoto/imgs/pictrues/a.jpg", "Public/jxphoto/imgs/pictrues/b.jpg");


        $this->assign('jxphoto_pictrues', $pictrues);

        $this->display();

    }
}