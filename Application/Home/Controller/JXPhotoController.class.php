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

        $masks = array("Public/jxphoto/imgs/masks/a.png", "Public/jxphoto/imgs/masks/b.png", "Public/jxphoto/imgs/masks/c.png");

        $this->assign('jxphoto_pictrues', $pictrues);

        $this->assign('jxphoto_masks', $masks);

        $this->display();

    }

    public function less_test() {
        $this->display();
    }
}