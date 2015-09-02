/**
 * Created by zwf on 15/9/2.
 */


define(function (require) {
    /**
     * 简兮2d工具入口
     * @param paras
     * @constructor
     */
    var JXPhotoEntry = function( paras ) {
        /**
         * 从外部获取到canvas
         * @type {JXViewport3D.renderer.canvas|*|HTMLCanvasElement}
         */
        this.canvas = paras.canvas;
    };

    JXPhotoEntry.prototype = {
        init : function() {

        },

        draw : function() {

        }
    };

    return JXPhotoEntry;
});