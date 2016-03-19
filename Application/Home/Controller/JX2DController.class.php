<?php
namespace Home\Controller;
use Think\Controller;
class JX2DController extends Controller {
    public function index(){
        $m_color = M('color');

        $color_datas = $m_color->select();

//        print_r($color_datas);

        $m_product = M('product');
        $jx_2d_datas = $m_product->where('title="jx_2d"')->select()[0];
        $jx_2d_other = $jx_2d_datas['other'];
        $this->assign("jx_2d_paras_json", $jx_2d_other);

        $jx_2d_other_array = json_decode($jx_2d_other, true);

        $m_template = M('2d_template');
        $jx_2d_template_data = $m_template->where('status=1')->select();
//        print_r($jx_2d_template_data);

        $jx_2d_out = array(
            'text_colors' => array(),
            'product_colors' => array(),
            'products' => array(
                'tshirts' => array(),
                'longsleeve' => array(),
                'tanktops' => array()
            ),
            'templates' => $jx_2d_template_data
        );

        foreach ($color_datas as $c_data) {
            if(in_array($c_data["id"], $jx_2d_other_array["jx_2d"]["text_colors"])) {
                array_push($jx_2d_out['text_colors'], $c_data);
            }

            if(in_array($c_data["id"], $jx_2d_other_array["jx_2d"]["product_colors"])) {
                array_push($jx_2d_out['product_colors'], $c_data);
            }
        }

        $m_2d_product = M("2d_product");

        $_2d_products = $m_2d_product->select();

        foreach ($_2d_products as $_2d_product) {
            $_2d_product_kind = $_2d_product["kind"];
            $_2d_product_kind_name = null;
            switch($_2d_product_kind) {
                case "0":
                    $_2d_product_kind_name = 'tshirts';
                    break;
                case "1":
                    $_2d_product_kind_name = 'longsleeve';
                    break;
                case "2":
                    $_2d_product_kind_name = 'tanktops';
                    break;
            }
            if(!is_null($_2d_product_kind_name)) {
                if(!array_key_exists($_2d_product["name"]))
                    $jx_2d_out["products"][$_2d_product_kind_name][$_2d_product["name"]] = array();
                array_push($jx_2d_out["products"][$_2d_product_kind_name][$_2d_product["name"]], $_2d_product);
            }
        }

//        print_r($jx_2d_out["products"]['longsleeve']);

        $this->assign("jx_2d_out", $jx_2d_out);

        $this->display();
    }

    public function  test() {
        echo "Hello World.";
    }
}