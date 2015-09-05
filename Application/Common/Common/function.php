<?php
/**
 * Created by PhpStorm.
 * User: zhengweifu
 * Date: 15/9/5
 * Time: 下午7:31
 */

/**
 * 列出目录下面所有的文件和子目录
 * @param $dir
 * @return array|bool
 */
function listDir($dir) {

    $output = array();

    if(is_dir($dir)) {
        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if((is_dir($dir."/".$file)) && $file!="." && $file!="..") {
                    array_push($output, $file);
                    listDir($dir."/".$file."/");
                } else {
                    if($file!="." && $file!="..") {
                        array_push($output, $file);
                    }
                }
            }
            closedir($dh);
        }
    }

    return $output;
}
