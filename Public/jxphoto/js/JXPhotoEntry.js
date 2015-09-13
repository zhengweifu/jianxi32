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
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.context = this.canvas.getContext("2d");

        this.rootPath = paras.rootPath;

        this.maskImages = [];

        this.images = [];

        this.currentMaskImage = null;

        /**
         * 当前图片的信息
         * @type {{img: null, position: {x: number, y: number}}}
         */
        this.currentImageInfo = {

            "img" : null,

            "filter" : "",

            "draw_img" : new Image(),

            position : {

                x : 0,

                y : 0

            }

        };

        this.texts = [];

        /**
         * 绘制区域限制
         * @type {{x: number, y: number, width: number, height: number}}
         */
        this.drawArea = paras.drawArea;


        var self = this;
        var pointerOld = {x: 0, y: 0};
        function onMouseDown( event ) {

            pointerOld.x = event.clientX;
            pointerOld.y = event.clientY;

            self.canvas.addEventListener( 'mousemove', onMouseMove, false );
            self.canvas.addEventListener( 'mouseup', onMouseUp, false );
            self.canvas.addEventListener( 'mouseout', onMouseUp, false );
            self.canvas.addEventListener( 'dblclick', onMouseUp, false );

        }

        function onMouseMove( event ) {

            event.preventDefault();

            var movementX = event.clientX - pointerOld.x;
            var movementY = event.clientY - pointerOld.y;

            var scale = 0.05;

            if(self.currentImageInfo) {
                self.currentImageInfo.position.x += movementX * scale;
                self.currentImageInfo.position.y += movementY * scale;

                self.render();
            }
        }

        function onMouseUp( event ) {

            self.canvas.removeEventListener( 'mousemove', onMouseMove, false );
            self.canvas.removeEventListener( 'mouseup', onMouseUp, false );
            self.canvas.removeEventListener( 'mouseout', onMouseUp, false );
            self.canvas.removeEventListener( 'dblclick', onMouseUp, false );


        }

        this.canvas.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
        this.canvas.addEventListener( 'mousedown', onMouseDown, false );

        this.render();
    };

    JXPhotoEntry.prototype = {

        /**
         * 打开文件入口
         * @param file
         * @param onLoad
         */
        openFile : function(file, onLoad) {

            var reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function() {

                onLoad(this.result);

            };

        },

        /**
         * 添加图片
         * @param imgUrl
         * @param onLoad
         */
        addImage : function(imgUrl, onLoad) {

            var self = this;

            var img = new Image();

            img.src = imgUrl;

            img.onload = function() {

                if( onLoad ) {

                    self.images.push(img);

                    onLoad(img);

                }
            };
        },

        /**
         * 添加蒙板图片
         * @param imgUrl
         * @param onLoad
         */
        addMaskImage : function (imgUrl, onLoad) {

            var self = this;

            var img = new Image();

            img.src = imgUrl;

            img.onload = function() {

                self.maskImages.push(img);

                if(onLoad) {

                    onLoad(img);

                }

            };
        },

        setMaskImage : function (image) {
            if(image) {
                if(this.currentMaskImage !== image) {
                    this.currentMaskImage = image;
                }
            } else {
                this.currentMaskImage = null;
            }
        },

        updateCurrentImageInfo : function(img, toFilter) {
            toFilter = (toFilter !== undefined) ? toFilter : true;
            if( img ) {
                this.currentImageInfo.img = img;
            }

            if(!toFilter) return;

            if(this.currentImageInfo.img) {
                if(this.currentImageInfo.filter) {
                    //this.currentImageInfo.draw_img.src = AlloyImage(this.currentImageInfo.img).act(this.currentImageInfo.filter).save(0, 1);
                    this.currentImageInfo.draw_img.src = AlloyImage(this.currentImageInfo.img).ps(this.currentImageInfo.filter).save(0, 1);
                }
            }
        },

        addText : function (_text, _front, _size, _color, _x, _y) {
            _text = _text || "JianXi";
            _front = _front || "Arial";
            _size = _size || 20;
            _color = _color || "#888";
            _x = _x || this.drawArea.x;
            _y = _y || this.drawArea.y;

            if(_x < this.drawArea.x) _x = this.drawArea.x;
            if(_x > this.drawArea.x + this.drawArea.width) _x = this.drawArea.x + this.drawArea.width;

            if(_y < this.drawArea.y) _y = this.drawArea.y;
            if(_y > this.drawArea.y + this.drawArea.height) _y = this.drawArea.y + this.drawArea.height;

            _y += _size;

            this.texts.push({
                text : _text,
                front : _front,
                size : _size,
                color : _color,
                position : {
                    x : _x,
                    y : _y
                }
            });
        },


        /**
         * 根据蒙板绘制图片
         * @param img
         * @param maskImg
         */
        drawImage : function(imgInfo, maskImg) {
            /**
             * 添加图片
             */
            if(imgInfo.img) {

                if(imgInfo.filter) {

                    this.context.drawImage(imgInfo.draw_img, imgInfo.position.x, imgInfo.position.y);

                } else {

                    this.context.drawImage(imgInfo.img, imgInfo.position.x, imgInfo.position.y);

                }


                /**
                 * 添加蒙板
                 */

                if (maskImg) {
                    this.context.globalCompositeOperation = "destination-in";
                    this.context.drawImage(maskImg, this.drawArea.x, this.drawArea.y, this.drawArea.width, this.drawArea.height);
                    this.context.globalCompositeOperation = "source-over";
                }
            }

        },

        drawText : function (textInfo) {

            //设置字体样式
            this.context.font = textInfo.size + "px "+ textInfo.front;

            //设置字体填充颜色
            this.context.fillStyle = textInfo.color;

            //开始绘制文字
            this.context.fillText(textInfo.text, textInfo.position.x, textInfo.position.y);
        },

        /**
         * 渲染场景
         */
        render : function() {
            // 清除画布
            this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

            // 绘制图片
            this.drawImage(this.currentImageInfo, this.currentMaskImage);

            // 绘制文字
            for(var i=0; i<this.texts.length; i++) {
                this.drawText(this.texts[i]);
            }

            // 绘制矩形限制框
            this.context.globalCompositeOperation = "destination-in";
            this.context.fillRect(this.drawArea.x, this.drawArea.y, this.drawArea.width, this.drawArea.height);
            this.context.globalCompositeOperation = "source-over";
            this.context.strokeRect(this.drawArea.x, this.drawArea.y, this.drawArea.width, this.drawArea.height);

        }
    };

    return JXPhotoEntry;
});