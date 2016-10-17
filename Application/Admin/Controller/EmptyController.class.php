<?php

namespace Admin\Controller;

class EmptyController extends PublicController {

    public function index() {
        $bid = I("id");
        $tid = I('tid');
        $m_key = M('keymanager');

        $current_table_name = C('JX_TABLE_NAME')[$tid];

        if($bid != "") {
            $m = M($current_table_name);
            $_data = $m->where("id=" . $bid)->find();
            if($_data) {

                $this->assign('show_form', 1);

                $key_data_current = $m_key->where(array('table_name' => $current_table_name))->select();
                $this->keyDataArray2New($key_data_current);
                $this->assign('key_data_current', $key_data_current);

                $this->assign('data', $_data);
                $this->assign('b_post_url', U(MODULE_NAME . '/Empty/addUpdate/tid/' . $tid . "/id/" . $bid));
            } else {
                $this->error("不能修改" . $current_table_name . "!");
            }
        } else {
            $add = I("add");
            if($add != "") {
                $this->assign('show_form', 1);

                $key_data_current = $m_key->where(array('table_name' => $current_table_name))->select();
                $this->keyDataArray2New($key_data_current);
                $this->assign('key_data_current', $key_data_current);

                $this->assign('b_post_url', U(MODULE_NAME . '/Empty/addUpdate/tid/' . $tid));
            } else {
                $p = getPage(M($current_table_name), '', 15);
                $this->assign("page", $p->show());
                $this->assign("body_table", $this->getTable($tid, $p));
            }
        }

        $this->assign("P_2d_diy_upload_img_url", U(MODULE_NAME . '/Empty/uploadP2DDiyImg'));

        $this->assign("P_2d_diy_upload_svg_url", U(MODULE_NAME . '/Empty/uploadP2DDiySvg'));

        $this->assign("P_2d_diy_data_2_data", U(MODULE_NAME . '/Empty/data2data'));
        // alert(md5_file('index.php'));
        $this->display();
    }

    private function getTable($table_id, $tpp=null) {
        $current_table_name = C('JX_TABLE_NAME')[$table_id];

        $bodyTable = '<table class="table"><caption>';

        $bodyTable .= '<a href="'. U(MODULE_NAME . "/Empty/index/tid/" . $table_id . "/add/1") .'" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span>添加</a>';
        $bodyTable .= '</caption>';

        $m = M($current_table_name);
        $fields = $m->getDbFields();

        $m_key = M("keymanager");


        $key_data_current = $m_key->where(array('table_name' => $current_table_name))->select();



        $this->keyDataArray2New($key_data_current);


        $name2Title = array();
        foreach($key_data_current as $value) {
            $name2Title[$value['name']] = $value;
        }

        $bodyTable .= '<thead><tr>';

        foreach ($fields as $key => $value) {
            if($key == 0) {
                $bodyTable .= '<th>#</th>';
            } else {
                if ($name2Title[$value]['table_show'] == "1")
                    $bodyTable .= '<th>' . $name2Title[$value]['title'] . '</th>';
            }
        }

        $bodyTable .= '<th>操作</th></thead></tr>';

        $bodyTable .= '<tbody>';

        if(is_null($tpp))
            $_Datas = $m->select();
        else
            $_Datas = $m->order('id')->page($_GET['p'].','.$tpp->listRows)->select();
        // print_r($_Datas);
        // exit;
        foreach ($_Datas as $so => $eachData) {
            $bodyTable .= '<tr>';
            // echo $fields[$so];
            foreach ($eachData as $key => $value) {

                if($name2Title[$key]["table_show"] == "0") continue; // 在列表中不显示

                if($key != "table_name") {

                    if($name2Title[$key]['type'] == '3') { // SELECT
                        $value = $name2Title[$key]['values'][$value];
                    }
                    
                    if($key == 'path') {
                        $value = '<img src="' . $value . '" alt="" style="box-sizing: border-box; max-height: 20px;">';
                    }
                }

                if($name2Title[$key]['type'] == '4') {// COLOR
                    $bodyTable .= '<td style="background-color: #'.$value.'">' . $value . '</td>';
                } else {
                    $bodyTable .= '<td>' . $value . '</td>';
                }
            }
            $bodyTable .= '<td><a href="' . U(MODULE_NAME . '/Empty/index/tid/' . $table_id . '/id/' . $eachData['id'])
                        . '"><span class="glyphicon glyphicon-pencil">&nbsp</span></a><a href="' . U(MODULE_NAME . '/Empty/delete/tid/' . $table_id . '/id/' . $eachData['id'])
                        .'"><span class="glyphicon glyphicon-trash"></span></a></td>';
            $bodyTable .= '</tr>';
        }

        $bodyTable .= '</tbody></table>';

        return $bodyTable;
    }

    private function keyDataArray2New(&$key_data_arr) {
        foreach($key_data_arr as &$item) {
//            var_dump($item);
            if($item["type"] == "3") {
                $item["values"] = json_decode($item["values"]);
            }
        }
    }

    public function addUpdate() {
        $table_id = $_GET['tid'];
        $bid = $_GET['id'];

        $current_table_name = C('JX_TABLE_NAME')[$table_id];

        $postData = $_POST;
        
        $m = M($current_table_name);

        if($bid != '') {

            $m->where(array('id' => $bid))->data($postData)->save();

        } else {

//            $_data = $m->where(array('title' => $postData['title']))->find();
//
//            if(!$_data) {
            $m->add($postData);
//            } else {
//                $this->error($current_table_name . ': <' . $postData['title'] . '> 已经存在.');
//            }
        }

        $this->redirect(MODULE_NAME . "/Empty/index/tid/" . $table_id);
    }

    public  function delete() {
        $table_id = I('tid');
        $current_table_name = C('JX_TABLE_NAME')[$table_id];
        $m = M($current_table_name);
        $bId = I("id");
        
        $_data = $m->where(array('id=' . $bId))->find();

        if($_data) {
            $m->where(array('id=' . $bId))->delete();
        } else {
            $this->error("没有发现 id ＝ " . $bId . "的" . $current_table_name);
        }

        $this->redirect(MODULE_NAME . "/Empty/index/tid/" . $table_id);
    }

    public function uploadP2DDiyImg() {
        $imgData = I('imgData');

        if($imgData) {
            $php_path = dirname(__FILE__) . '/';
            $save_path = $php_path . '../../../Public/uploads/';
            $save_path = realpath($save_path) . '/';

            //检查目录
            if (@is_dir($save_path) === false) {
                alert("上传目录不存在。");
            }

            //检查目录写权限
            if (@is_writable($save_path) === false) {
                alert("上传目录没有写权限。");
            }

            if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $imgData, $result)) {
                $type = $result[2];
                $content = base64_decode(str_replace($result[1], '', $imgData));
                $content_md5 = md5($content);

                $m = M('2d_diy_image');
                $mimg_data = $m -> where('hash="%s"', $content_md5) -> select();

                // var_dump($mimg_data);
                // exit;
                $out_data = Array();

                if($mimg_data) {
                    $out_data['id'] = $mimg_data[0]['id'];
                    $out_data['path'] = $mimg_data[0]['path'];
                    echo json_encode($out_data);
                } else {
                    $save_path .= 'JY_imgs/';
                    $save_url = 'Public/uploads/JY_imgs/';
                    if (!file_exists($save_path)) {
                        mkdir($save_path);
                    }

                    $ymd = date("Ymd");    
                    $save_path .= $ymd . '/';
                    $save_url .= $ymd . '/';

                    if (!file_exists($save_path)) {
                        mkdir($save_path);
                    }

                    $new_file_name  = date("YmdHis") . '_' . rand(10000, 99999) . '.' . $type;
                    $file_path = $save_path . $new_file_name;

                    @chmod($file_path, 0644);
                    $file_url = $save_url . $new_file_name;

                    if (file_put_contents($file_path, $content)) {
                        $out_url = WEB_ROOT_PATH . $file_url;
                        $save_data = Array(
                            'path'=> $out_url,
                            'hash'=> $content_md5
                        );
                        $out_id = $m -> add($save_data);

                        $out_data['id'] = $out_id;
                        $out_data['path'] = $out_url;

                        echo json_encode($out_data);
                    } else {
                        echo 0;
                    }
                }
            } else {
                echo 0;
            }
        } else {
            echo 0;
        }
    }

    public function uploadP2DDiySvg() {
        $svgData = I('svgData');
        if($svgData) {
            $php_path = dirname(__FILE__) . '/';
            $save_path = $php_path . '../../../Public/uploads/';
            $save_path = realpath($save_path) . '/';

            //检查目录
            if (@is_dir($save_path) === false) {
                alert("上传目录不存在。");
            }

            //检查目录写权限
            if (@is_writable($save_path) === false) {
                alert("上传目录没有写权限。");
            }

            if ($svgData) {
                $type = 'svg';
                $content = base64_decode($svgData);
                $content_md5 = md5($content);

                $m = M('2d_diy_svg');
                $mimg_data = $m -> where('hash="%s"', $content_md5) -> select();

                // var_dump($mimg_data);
                // exit;
                $out_data = Array();

                if($mimg_data) {
                    $out_data['id'] = $mimg_data[0]['id'];
                    $out_data['path'] = $mimg_data[0]['path'];
                    echo json_encode($out_data);
                } else {
                    $save_path .= 'JY_svgs/';
                    $save_url = 'Public/uploads/JY_svgs/';
                    if (!file_exists($save_path)) {
                        mkdir($save_path);
                    }

                    $ymd = date("Ymd");    
                    $save_path .= $ymd . '/';
                    $save_url .= $ymd . '/';

                    if (!file_exists($save_path)) {
                        mkdir($save_path);
                    }

                    $new_file_name  = date("YmdHis") . '_' . rand(10000, 99999) . '.' . $type;
                    $file_path = $save_path . $new_file_name;

                    @chmod($file_path, 0644);
                    $file_url = $save_url . $new_file_name;
                    if (file_put_contents($file_path, $content)) {
                        $out_url = WEB_ROOT_PATH . $file_url;
                        $save_data = Array(
                            'path'=> $out_url,
                            'hash'=> $content_md5
                        );
                        $out_id = $m -> add($save_data);

                        $out_data['id'] = $out_id;
                        $out_data['path'] = $out_url;

                        echo json_encode($out_data);
                    } else {
                        echo 0;
                    }
                }
            } else {
                echo 0;
            }
        } else {
            echo 0;
        }
    }

    public function data2data() {
        $o_data = $_POST;
        $n_data = Array();
        $mimg = M('2d_diy_image');
        $msvg = M('2d_diy_svg');
        foreach ($o_data as $key1 => $value1) {
            $n_data[$key1] = Array(); 
            foreach ($value1 as $key2 => $value2) {
                $n_data[$key1][$key2] = Array();
                if(count($value2) > 0) {
                    $mimg_datas = $mimg -> where('id="%s"', $value2[0]) -> select();
                    if($mimg_datas) {
                        $a = Array("id" => $value2[0], "path" => $mimg_datas[0]['path']);
                        $n_data[$key1][$key2]["img"] = $a;
                    }
                    if(count($value2) > 1) {
                        $msvg_datas = $msvg -> where('id="%s"', $value2[1]) -> select();
                        if($msvg_datas) {
                            $b = Array("id" => $value2[1], "path" => $msvg_datas[0]['path']);
                            $n_data[$key1][$key2]["svg"] = $b;
                        }
                    }
                }
                
           }
        }
        // var_dump($n_data);
        echo json_encode($n_data);
    }
}