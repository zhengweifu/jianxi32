<?php

namespace Admin\Controller;

class EmptyController extends PublicController {
    public function banner() {
        $bid = I("id");
        if($bid != "") {
            $m = M('banner');
            $banner = $m->where("id=" . $bid)->find();
            if($banner) {
                $this->assign('run_banner_from_script', 1);
                $this->assign('show_banner_form', 1);
                // var_dump(json_encode($banner));
                // exit;
                $this->assign('banner_form_data', json_encode($banner));
                $this->assign('b_post_url', U(MODULE_NAME . '/Empty/addUpdateBanner'));
            } else {
                $this->error("不能修改Banner!");
            }
        } else {
            $add = I("add");
            if($add != "") {
                $this->assign('show_banner_form', 1);
                $this->assign('b_post_url', U(MODULE_NAME . '/Empty/addUpdateBanner'));
            } else {
                $this->assign("body_table", $this->getTable());
            }
        }

        $this->display();
    }

    Public function bannerChange() {

    }

    private function getTable() {
        $bodyTable = '<table class="table"><caption>';

        $bodyTable .= '<a href="'. U(MODULE_NAME . "/Empty/banner/add/1") .'" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span>添加</a>';
        $bodyTable .= '</caption>';

        $m = M("banner");
        $fields = $m->getDbFields();

        $bodyTable .= '<thead><tr>';

        foreach ($fields as $value) {
            $bodyTable .= '<th>' . $value . '</th>';
        }

        $bodyTable .= '<th>option</th></thead></tr>';

        $bodyTable .= '<tbody>';

        $bannerDatas = $m->select();
        // var_dump($bannerDatas);
        // 
        foreach ($bannerDatas as $eachBannerData) {
            $bodyTable .= '<tr>';
            foreach ($eachBannerData as $key => $value) {
                if($key == 'kind') {
                    if($value == 1) {
                        $value = '首页Banner';
                    }
                } else if($key == 'status') {
                    if($value == 1) {
                        $value = '显示';
                    } else {
                        $value = '隐藏';
                    }
                } else if($key == 'path') {
                    $value = '<img src="' . $value . '" alt="" style="box-sizing: border-box; max-height: 20px;">';
                }
                $bodyTable .= '<td>' . $value . '</td>';
            }
            $bodyTable .= '<td><a href="' . U(MODULE_NAME . '/Empty/banner/id/' . $eachBannerData['id'])
                        . '"><span class="glyphicon glyphicon-pencil">&nbsp</span></a><a href="' . U(MODULE_NAME . '/Empty/deleteBanner/id/' . $eachBannerData['id'])
                        .'"><span class="glyphicon glyphicon-trash"></span></a></td>';
            $bodyTable .= '</tr>';
        }

        $bodyTable .= '</tbody></table>';

        return $bodyTable;
    }

    public function addUpdateBanner() {
        $bannerId = I('bannerId');
        $bannerData = array(
            'title' => I('bannerTitle'),
            'kind' => I('bannerKind'),
            'path' => I('bannerPath'),
            'status' => intval(I('bannerStatus')),
            'sid' => intval(I('bannerSort')),
            'link' => I('bannerLink'),
            'labelheader' => I('bannerLabelHeader'),
            'labelbody' => I('bannerLabelContent'),
            'buttonclassname' => I('bannerButtonClassName')
        );

        $m = M("banner");

        if($bannerId != '') {

            $m->where(array('id' => $bannerId))->data($bannerData)->save();

        } else {

            $banner = $m->where(array('title' => $bannerData['title']))->find();

            if(!$banner) {
                $m->add($bannerData);
            } else {
                $this->error('Banner: <' . $bannerData['title'] . '> 已经存在.');
            }
        }

        $this->redirect(MODULE_NAME . "/Empty/banner");
    }

    public  function deleteBanner() {
        $m = M("banner");
        $bannerId = I("id");
        
        $banner = $m->where(array('id=' . $bannerId))->find();

        if($banner) {
            $m->where(array('id=' . $bannerId))->delete();
        } else {
            $this->error("没有发现 id ＝ " . $bannerId . "的banner");
        }

        $this->redirect(MODULE_NAME . '/Empty/banner');
    }

    public function updateBanner() {

    }

    public function uploadBanner() {

        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath  =     './Public/uploads/'; // 设置附件上传根目录
        $upload->savePath  =     'banners/'; // 设置附件上传（子）目录 

        $info = $upload->upload();


        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        } else{// 上传成功
            // var_dump($info);
            $url = __ROOT__ . '/Public/uploads/' . $info['photo']['savepath'] . $info['photo']['savename'];
            $this->success('上传成功！');

            // $this->assign("photourl", $url);
            // 
            $resule = array(
                'url' => $url
            );
            $this->ajaxReturn($resule);
        }
    }
}