/**
 * Created by zwf on 15/8/14.
 * 入口文件
 */


define(function (require) {

    var JXViewport3D = require("./JXViewport3D");

    var JXEntry = function( parameters ) {
        console.log("这个就是入口文件");

        JXViewport3D(parameters.canvas3D);
    };

    return JXEntry;

});