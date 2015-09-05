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

        $pictrues = listDir(APP_PATH . "../Public/jxphoto/imgs/pictrues");
        for($i=0; $i<count($pictrues); $i++) {
            $pictrues[$i] = "Public/jxphoto/imgs/pictrues/" . $pictrues[$i];
        }

        $this->assign('jxphoto_pictrues', $pictrues);

        $this->display();

    }
}