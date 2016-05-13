<?php
/**
 * User: fun.zheng
 */

namespace Home\Controller;
use Think\Controller;

class JYController extends Controller {
    public function index() {
        $this->display();
    }

    public function getInitData() {
      $output = Array(
        'text_colors' => array(),
        'product_colors' => array()
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
}
