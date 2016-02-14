<?php

namespace Admin\Controller;

use Common\Controller\CommonController;

class PublicController extends CommonController {

	public function _initialize() {
		if (!isset($_SESSION['uid'])) {
            $this->redirect('Admin/Login/index');
        }
		$this->assign("menu", $this->getMenu());
		$this->assign("current_user", $_SESSION['username']);
	}

	private function getMenu() {
		$menu = '<ul class="nav navbar-nav">';

		// $menu .= '<li><a href="#">首页</a></li>';

		$menu .= '<li class="dropdown">';
        $menu .= '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">全局 <span class="caret"></span></a>';
        $menu .= '<ul class="dropdown-menu">';
        $menu .= '<li><a href="' . U(MODULE_NAME . "/Empty/index/tid/1/p/1") . '">Banner 图片</a></li>';
		$menu .= '<li><a href="' . U(MODULE_NAME . "/Empty/index/tid/0/p/1") . '">字段管理</a></li>';
		$menu .= '<li><a href="' . U(MODULE_NAME . "/Empty/index/tid/2/p/1") . '">产品列表</a></li>';
		$menu .= '<li><a href="' . U(MODULE_NAME . "/Empty/index/tid/3/p/1") . '">颜色列表</a></li>';
        $menu .= '</ul></li>';

		$menu .= '<li class="dropdown">';
		$menu .= '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">简衣 <span class="caret"></span></a>';
		$menu .= '<ul class="dropdown-menu">';
		$menu .= '<li><a href="' . U(MODULE_NAME . "/Empty/index/tid/4/p/1") . '">产品列表</a></li>';
		$menu .= '</ul></li>';

		$menu .= '<li><a href="#">用户管理</a></li>';

		$menu .= "</ul>";

		return $menu;
	}

	public function loginOut() {
		$session_var = array('uid', 'username', 'date', 'ip');
		foreach ($session_var as $value) {
			unset($_SESSION[$value]);
		}

		$this->redirect("Admin/Index/index");
	}

}