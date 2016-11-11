<?php
return array(
	//'配置项'=>'配置值'
//	'URL_MODEL' => 2,

	// 'URL_HTML_SUFFIX'=>'',

	'URL_HTML_SUFFIX' => '',

	'DOT_MIN'   => '',

	// 'SHOW_PAGE_TRACE'=>true,

	//'TMPL_ENGINE_TYPE'=>'Smarty', // 使用smarty模板

	//数据库配置信息
	'DB_TYPE'   => 'mysql', // 数据库类型
	'DB_HOST'   => '106.14.34.2', // 服务器地址
	'DB_NAME'   => 'janexi_admin', // 数据库名
	'DB_USER'   => 'root', // 用户名
	'DB_PWD'    => 'wzzjanexi', // 密码
	'DB_PORT'   => 3306, // 端口
	'DB_PREFIX' => 'jx_', // 数据库表前缀
	'DB_CHARSET'=> 'utf8', // 字符集
	'DB_DEBUG'  =>  TRUE, // 数据库调试模式 开启后可以记录SQL日志 3.2.3新增


	'FILE_UPLOAD_CONFIG'=>array(
        'mimes' 	=> '', //允许上传的文件MiMe类型
        'maxSize'	=> 6 * 1024 * 1024, //上传的文件大小限制 (0-不做限制)
        'exts'		=> array('jpg', 'gif', 'png', 'jpeg'),// 设置附件上传类型
        'autoSub'	=> true, //自动子目录保存文件
        'subName'	=> array('date', 'Y-m-d'), //子目录创建方式，[0]-函数名，[1]-参数，多个参数使用数组
        'rootPath'	=> './Public/Uploads/', //保存根路径
        'savePath'	=> '', //保存路径
        'saveName'	=>    array('uniqid','')
    ),
);
