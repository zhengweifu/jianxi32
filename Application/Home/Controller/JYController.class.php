<?php
/**
 * User: fun.zheng
 */

namespace Home\Controller;
use Think\Controller;

class JYController extends Controller {
  static $Number2Kind = Array('动物', '植物');

  public function index() {
      $this->display();
  }

  public function getInitData() {
    $pid = I('pid');

    $m_2d_diy_product = M('2d_diy_product');

    $diy_product_data = $m_2d_diy_product->where('id=' . $pid) -> select();

    var_dump($diy_product_data);

    $output = Array(
      'text_colors' => array(),
      'product_colors' => array(),
      'color_scheme_datas' => array(
        // array(describtion => '正常', img => '/jianxi32/Public/src/Home/jy/images/ps/normal.jpg'),
        // array(describtion => '素描', img => '/jianxi32/Public/src/Home/jy/images/ps/sketch.png'),
        // array(describtion => '美肤', img => '/jianxi32/Public/src/Home/jy/images/ps/softEnhancement.png'),
        // array(describtion => '素描', img => '/jianxi32/Public/src/Home/jy/images/ps/sketch.png'),
        // array(describtion => '美肤', img => '/jianxi32/Public/src/Home/jy/images/ps/softEnhancement.png'),
        // array(describtion => '素描', img => '/jianxi32/Public/src/Home/jy/images/ps/sketch.png')
      )
    );

    $color_datas = M('color')->select();

    $m_product = M('product');
    $jx_2d_datas = $m_product->where('title="jx_2d"')->select()[0];
    $jx_2d_other = $jx_2d_datas['other'];
    $this->assign("jx_2d_paras_json", $jx_2d_other);

    $jx_2d_other_array = json_decode($jx_2d_other, true);

    foreach ($color_datas as $c_data) {
        if(in_array($c_data["id"], $jx_2d_other_array["jx_2d"]["text_colors"])) {
            array_push($output['text_colors'], $c_data);
        }

        if(in_array($c_data["id"], $jx_2d_other_array["jx_2d"]["product_colors"])) {
            array_push($output['product_colors'], $c_data);
        }
    }

    echo json_encode($output);
  }

  public function test() {
    // var_dump(json_decode(file_get_contents('php://input')));
    // var_dump(curl_file_get_contents('http://www.janexi.com/Home/JY/getInitData'));
    // var_dump(curl_file_get_contents('http://www.baidu.com'));
    // var_dump(curl_post('http://www.janexi.com/Home/JY/getInitData', 'name=zhengweifu&age=30'));
    var_dump(curl_post('http://www.janexi.com/Home/JY/getInitData', array(
      'name' => 'fun.zheng',
      'age' => 30
    )));
  }

  public function getShearPainting() {
    $shear_painting_datas = M('2d_shear_paint_svg')->where('status="1"')->select();
    $output_datas = Array();
    foreach ($shear_painting_datas as $sp_data) {
      $kindKey = JYController::$Number2Kind[$sp_data['kind']];
      if(!array_key_exists($kindKey, $output_datas)) {
        $output_datas[$kindKey] = Array();
      }
      array_push($output_datas[$kindKey], Array(
        'title'=>  $sp_data['title'],
        'path'=> $sp_data['path']
      ));
    }
    // var_dump($output_datas);
    echo json_encode($output_datas);
  }
}
