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
}