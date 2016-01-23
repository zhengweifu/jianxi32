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

/**
 * 多维数组排序
 * $multi_array:多维数组名称
 * $sort_key:二维数组的键名
 * $sort:排序常量	SORT_ASC || SORT_DESC
*/
function multiArraySort(&$multi_array, $sort_key, $sort = SORT_DESC) {
    if(is_array($multi_array)){
        foreach ($multi_array as $row_array) {
            if(is_array($row_array)){
                //把要排序的字段放入一个数组中，
                $key_array[] = $row_array[$sort_key];
            } else{
                return false;
            }
        }
    } else{
        return false;
    }
    //对多个数组或多维数组进行排序
    array_multisort($key_array,$sort,$multi_array);
    return $multi_array;
}
