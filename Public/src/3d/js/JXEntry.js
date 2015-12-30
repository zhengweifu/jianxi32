/**
 * Created by zwf on 15/8/14.
 * 入口文件
 */


define(function (require) {

    var JXViewport3D = require("./JXViewport3D");

    var JXEditorManager = require("./JXEditorManager");

    var JXLoader = require("./JXLoader");

    var JXEntry = function( parameters ) {
        console.log("这个就是入口文件");

        var viewport3d = new JXViewport3D(parameters.canvas3D);

        this.editorManager = new JXEditorManager(viewport3d);

    };

    JXEntry.prototype = {

        loadProject : function(file) {

        },


        loadFile : function(file) {
            JXLoader.loadFile(file, this.editorManager);
        }
    };

    return JXEntry;

});