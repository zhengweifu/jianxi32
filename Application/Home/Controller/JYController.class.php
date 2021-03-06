<?php
/**
 * User: fun.zheng
 */

namespace Home\Controller;
use Think\Controller;

class JYController extends Controller {
  static $Number2Kind = Array('动物', '植物');

  public function index() {
    $this->assign('PID', I('pid'));
    $this->assign('DIYID', I('diyid'));
    $this->display();
  }

  public function getInitData() {
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
      ),

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

  public function getDiyData() {
    $output = Array(
      colors => Array(),
      masks => Array(),
      projects => Array()
    );
    $pid = I('pid');
    $diyid = I('diyid');
    $m_2d_diy_product = M('2d_diy_product');
    $m_2d_diy_image = M('2d_diy_image');
    $m_2d_diy_svg = M('2d_diy_svg');
    $m_2d_diy_plan = M('2d_diy_plan');

    $diy_product_data = $m_2d_diy_product->where('id="' . $pid . '"')->select()[0];
    // var_dump($diy_product_data);
    if(!empty($diy_product_data)) {
      $diy_product_relative = json_decode($diy_product_data['relative']);
      // var_dump($diy_product_relative);
      if(!empty($diy_product_relative)) {
        $add_diy_svg = true;
        foreach ($diy_product_relative as $diy_key => $diy_value) {
          // var_dump($diy_key);
          // var_dump($diy_value);
          $output['colors'][$diy_key] = Array();
          foreach ($diy_value as $index => $diy_props) {
            $props_len = count($diy_props);
            if($props_len > 0) {
              $diy_image_data = $m_2d_diy_image->where('id="' . $diy_props[0] . '"')->select()[0];
              if(!empty($diy_image_data)) {
                array_push($output['colors'][$diy_key], $diy_image_data['path']);
              }
            }
            if($add_diy_svg) {
              if($props_len > 1) {
                $diy_svg_data = $m_2d_diy_svg->where('id="' . $diy_props[1] . '"')->select()[0];
                if(!empty($diy_svg_data)) {
                  array_push($output['masks'], $diy_svg_data['path']);
                }
              } else if($props_len == 1) {
                array_push($output['masks'], '');
              }
            }
          }
          $add_diy_svg = false;
        }
        if(!empty($diyid)) {
          $plan = $m_2d_diy_plan->where('id="' . $diyid . '"')->select()[0];
          if(!empty($plan)) {
            $output['projects'] = json_decode($plan['project_path']);
          } 
        }
      }
    }

    echo json_encode($output);
  }

  public function saveDiyData() {
    $php_path = dirname(__FILE__) . '/';
    $save_path = $php_path . '../../../Public/uploads/';
    $save_path = realpath($save_path) . '/JY_projects/';
    if (!file_exists($save_path)) {
      mkdir($save_path);
    }

    $file_path = WEB_ROOT_PATH . 'Public/uploads/JY_projects/';

    $data = json_decode(file_get_contents('php://input'), true);
    $uid = 0;
    $pid = $data['pid'];
    $diyid = $data['diyid'];
    $viewports = $data['viewports'];

    $projectPaths = Array();

    $m = M('2d_diy_plan');

    if(count($viewports) > 0) {
      $ymd = date("Ymd");
      $save_path .= $ymd . '/';
      if (!file_exists($save_path)) {
        mkdir($save_path);
      }
      $file_path .= $ymd . '/';
      // var_dump($save_path);
      foreach ($viewports as $index => $viewport) {
        $projectData = $viewport['projectData'];
        $uuid = generateUUID();
        $save_url = $save_path . $uuid . '.json';
        if(file_put_contents($save_url, $projectData)) {
          array_push($projectPaths, $file_path  . $uuid . '.json');
        }
      }
    }

    if(!empty($diyid)) {
      $plan = $m->where('id="' . $diyid . '"')->select()[0];
      if(!empty($plan)) {
        $plan['project_path'] = json_encode($projectPaths);
        $m->where(array('id' => $diyid))->data($plan)->save();
      }
    } else {
      $plan = Array(
        'pid' => $pid,
        'uid' => $uid,
        'project_path' => json_encode($projectPaths),
      );
      $m->add($plan);
    }
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
