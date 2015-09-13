/**
 * Created by zhengweifu on 15/9/13.
 */

(function(global) {

    /**
     * 控制jx.js只能导入一次
     */
    if(global.jxjs) return;

    var jxjs = global.jxjs = {
       version: "1.0"
    };

    /**
     * 控制jquery元素移动
     * @param click_element 被点击jquery元素
     * @param move_element 需要移动的jquery元素
     */
    jxjs.controlElementMove = function(click_element, move_element) {
        var pointer_old = {"x": 0, "y": 0}, pointer = {"x": 0, "y": 0};

        var onMouseDown = function (event) {

            pointer_old.x = event.clientX;
            pointer_old.y = event.clientY;

        };

        var onMouseMove = function (event) {

            pointer.x = event.clientX;
            pointer.y = event.clientY;

            var _offset = move_element.offset();


            move_element.css({
                "left": _offset.left + pointer.x - pointer_old.x + "px",
                "top": _offset.top + pointer.y - pointer_old.y + "px"
            });

            pointer_old.x = pointer.x;
            pointer_old.y = pointer.y;
        };

        var onMouseUp = function () {

            click_element.unbind("mousemove");
            click_element.unbind("mouseout");
            click_element.unbind("mouseup");

        };

        click_element.bind("mousedown", function (event) {

            onMouseDown(event);

            $(this).bind("mousemove", function (event) {

                onMouseMove(event);

            });

            $(this).bind("mouseup", function () {
                onMouseUp();
            });

            $(this).bind("mouseout", function () {
                onMouseUp();
            });
        });
    };

    /**
     * rbg() => #123456
     * @param color
     */
    jxjs.RGB2Hex = function(style) {
        var r, g, b;

        // rgb(255,0,0)

        if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {

            var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );

            r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
            g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
            b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

        }

        // rgb(100%,0%,0%)

        else if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {

            var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );

            r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
            g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
            b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

        }
        var hex = (r * 255 ) << 16 ^ ( g * 255 ) << 8 ^ ( b * 255 ) << 0;

        return '#' + ( '000000' + hex.toString( 16 ) ).slice( - 6 );

    };

})(this);
