/**
 * Created by zhengweifu on 16/3/12.
 */
define(function(require) {
var entry = function(parameter) { 
    var slider_ms = 100;
 
    var canvas = document.getElementById("viewport-2d");
    var width = canvas.clientWidth, height = canvas.clientHeight, halfWidth = width/2, halfHeight = height/2;

    var maskHalfWith = 120, maskHalfHeight = 150;
    var mask = new THREE.JX.JXPolygonMask([
        new THREE.Vector2(-maskHalfWith, maskHalfHeight),
        new THREE.Vector2(maskHalfWith, maskHalfHeight),
        new THREE.Vector2(maskHalfWith, -maskHalfHeight),
        new THREE.Vector2(-maskHalfWith, -maskHalfHeight)
    ]);

    mask.strokeColor.setRGB(0.2, 0.3, 0.9);

    var shapeGroup = new THREE.Group();

    var viewport2d = new Viewport2D(canvas, shapeGroup, mask);

    // init modal
    $("jx2d-product-modal").modal({

    });

    // set canvas height
    // var jquery_viewport = $(".viewport-2d");
    // jquery_viewport.css({height: jquery_viewport.css("width")});

    var jquery_project_tmp = $(".project-template-group");
    jquery_project_tmp.css({height: jquery_project_tmp.css("width")});

    // $(window).on("resize", function() {
    //     jquery_viewport.css({height: jquery_viewport.css("width")});
    //     jquery_project_tmp.css({height: jquery_project_tmp.css("width")});
    // });

    var setJXObjectParas = function(type_name, _value) {
//        var _value = jqe.val();
//        var type_name = jqe.attr("typename");
        switch(type_name) {
            case "pos_x":
                if(viewport2d.current_object) viewport2d.current_object.position.x = parseFloat(_value);
                break;
            case "pos_y":
                if(viewport2d.current_object) viewport2d.current_object.position.y = parseFloat(_value);
                break;
            case "rotation":
                if(viewport2d.current_object) viewport2d.current_object.rotation.z = parseInt(_value) * Math.PI / 180;
                break;
            case "scale":
                if(viewport2d.current_object) {
                    viewport2d.current_object.scale.x = parseFloat(_value);
                    viewport2d.current_object.scale.y = parseFloat(_value);
                }
                break;
            case "text_size":
                if(viewport2d.current_object && viewport2d.current_object.type == "JXText") {
                    viewport2d.current_object.size = parseFloat(_value);
                }
                break;
            case "text_space":
                if(viewport2d.current_object && viewport2d.current_object.type == "JXText") {
                    viewport2d.current_object.space = parseFloat(_value);
                }
                break;
            case "text_arc":
                if(viewport2d.current_object && viewport2d.current_object.type == "JXText") {
                    viewport2d.current_object.arc = parseInt(_value) / 180 * Math.PI;
                }
                break;

            case "text_stroke_size":
                if(viewport2d.current_object && viewport2d.current_object.type == "JXText") {
                    viewport2d.current_object.strokeSize = parseFloat(_value);
                }
                break;
            case "text_shadow_distance":
                if(viewport2d.current_object && viewport2d.current_object.type == "JXText") {
                    viewport2d.current_object.shadowDistance = parseFloat(_value);
                }
                break;
            case "text_shadow_angle":
                if(viewport2d.current_object && viewport2d.current_object.type == "JXText") {
                    viewport2d.current_object.shadowAngle = parseFloat(_value);
                }
                break;

            case "text_shadow_blur":
                if(viewport2d.current_object && viewport2d.current_object.type == "JXText") {
                    viewport2d.current_object.shadowBlur = parseFloat(_value);
                }
                break;
        }

        viewport2d.update();
    };

    $('.jx2d-input').on('change', function() {
        var _value = $(this).val();
//        alert(_value);
        var type_name = $(this).attr("typename");

        setSliderValue($('.jxnstSlider[typename=' + type_name + ']'), parseInt(parseFloat(_value) * slider_ms));

        setJXObjectParas(type_name, _value)
    });

    $('.jxnstSlider').nstSlider({
        "left_grip_selector": ".leftGrip",
        "user_mouseup_callback": function(leftValue) {
//            $(this).parent().find('.leftLabel').text(leftValue);

            var val_left = (parseFloat(leftValue) / slider_ms).toFixed(2);
            $(this).parent().parent().find(".jxnstInput-g").children().val(val_left);
            var type_name = $(this).attr("typename");

            setJXObjectParas(type_name, val_left);
        }
    });

    // set slider element value
    var setSliderValue = function(jqe, value) {
        var _mmin = jqe.nstSlider('get_range_min');
        var _mmax = jqe.nstSlider('get_range_max');
        if(value < _mmin) value = _mmin;
        else if(value > _mmax) value = _mmax;

        jqe.nstSlider('set_position', value);

        jqe.nstSlider('refresh');
    };

    $(".jxNumber").on("input", function() {

        var val = $(this).val().replace(/[^0-9\.\-]/,'');

        // remove - (ex before)
        var _val = val.replace(/\-/g, '');
        if(val[0] === "-") {
            _val = "-" + _val;
        }

        // remove - (only one)
        var _vals = [];
        var isDot = false;
        for(var i=0; i<_val.length; i++) {
            if(_val[i] === ".") {
                if(!isDot) {
                    _vals.push(_val[i]);
                    isDot = true;
                }
            } else {
                _vals.push(_val[i]);
            }
        }

        $(this).val(_vals.join(''));
    });

    var current_color_item_jqe = null;
    $(".jx2d-cs-item").each(function() {
        $(this).on('click', function(event) {
            event.stopPropagation();
            var cid = $(this).attr("cid");
            $(".jx2d-properties-style-color, .jx2d-properties-text-color, .jx2d-properties-text-stroke, .jx2d-properties-text-shadow").hide();
            switch(cid) {
                case "jx2d-style-color-g":
                    $(".jx2d-properties-style-color").show();
                    break;
                case "jx2d-text-color-g":
                    $(".jx2d-properties-text-color").show();
                    break;
                case "jx2d-text-stroke-g":
                    $(".jx2d-properties-text-stroke").show();
                    break;
                case "jx2d-text-shadow-g":
                    $(".jx2d-properties-text-shadow").show();
                    break;
            }

            current_color_item_jqe = $(this);
        });
    });

    // $("body").on("click", function() {
    //     $(".jx-panel").hide();
    // });




    // select color box
    var current_color_jquery_elements = [null, null, null, null]; //0 => 文字颜色, 1 => 文字描边, 2 => 文字阴影, 3 => 产品颜色

    var changeColorBox = function(je_color_box, je_color_group, onChangeCB, onNotLinkCB) {
        var mlabel = parseInt(je_color_box.attr('mlabel'));
        if(current_color_jquery_elements[mlabel]) {
            current_color_jquery_elements[mlabel].removeClass('active');
        }
        je_color_box.addClass('active');
        current_color_jquery_elements[mlabel] = je_color_box;

        if(je_color_group) {
            var mnotlink = je_color_box.attr("mnotlink");
            if(mnotlink === '1') {
                je_color_group.css({backgroundColor: "transparent"});
                if(!je_color_group.hasClass("jx2d-color-not-link")) {
                    je_color_group.addClass("jx2d-color-not-link");
                }

                if(onNotLinkCB) onNotLinkCB(mlabel);

            } else {
                var tcolor = je_color_box.children("span").css("backgroundColor");
                je_color_group.css({backgroundColor: tcolor});
                if(je_color_group.hasClass("jx2d-color-not-link")) {
                    je_color_group.removeClass("jx2d-color-not-link");
                }

                if(onChangeCB) onChangeCB(mlabel, tcolor);

            }
        }
    };

    $(".jx2d-color-box").each(function() {
        $(this).on('click', function(event) {
            event.stopPropagation();
            changeColorBox($(this), current_color_item_jqe, function(mlabel, tcolor) {
                if(mlabel === 0) viewport2d.current_object.color.setStyle(tcolor);

                else if(mlabel === 1) {
                    viewport2d.current_object.strokeColor.setStyle(tcolor);
                    viewport2d.current_object.useStroke = true;
                } else if(mlabel === 2) {
                    viewport2d.current_object.shadowColor.setStyle(tcolor);
                    viewport2d.current_object.useShadow = true;
                }

                viewport2d.update();

            }, function(mlabel) {

                if(mlabel === 1) viewport2d.current_object.useStroke = false;

                else if(mlabel === 2) viewport2d.current_object.useShadow = false;

                viewport2d.update();
            });
        });
    });

    $(".jx-panel .jx-panel-title .close").on("click", function() {
        $(this).parent().parent().hide();
    });

    var current_product_label, i=0;
    $(".jx2d-product-label").each(function() {
        if(i == 0) {
            current_product_label = $(this);
            if(!current_product_label.hasClass("active")) {
                current_product_label.addClass("active");
            }
            $("#" + current_product_label.attr("pid")).show();
        }
        $(this).on("click", function() {
            if(current_product_label && current_product_label.hasClass("active")) {
                current_product_label.removeClass("active");
            }

            if(current_product_label) $("#" + current_product_label.attr("pid")).hide();

            current_product_label = $(this);

            $("#" + current_product_label.attr("pid")).show();

            if(!current_product_label.hasClass("active")) {
                current_product_label.addClass("active");
            }
        });
        i++;
    });




    $("#jx2d-create-text").on('click', function() {
        var text = new THREE.JX.JXText();
        text.content = "www.janexi.com";
        text.color.setStyle("#D52B1E");
        text.size = 10;
        shapeGroup.add(text);
        viewport2d.update();
    });

    var setInputValue = function (jqe, value) {
        jqe.val(value);
        jqe.change();
    };

    var updateTransformPanel = function(object) {
        setInputValue($('.jx2d-input[typename=pos_x]'), object.position.x);

        setInputValue($('.jx2d-input[typename=pos_y]'), object.position.y);
        setInputValue($('.jx2d-input[typename=rotation]'), object.rotation.z * 180 / Math.PI);
        setInputValue($('.jx2d-input[typename=scale]'), object.scale.x);
    };

    var temp_color = new THREE.Color();
    var updateTextPanel = function(object) {
        $("#jx2d-text-content").val(object.content);
        setInputValue($('.jx2d-input[typename=text_size]'), object.size);
        setInputValue($('.jx2d-input[typename=text_space]'), object.space);
        setInputValue($('.jx2d-input[typename=text_arc]'), object.arc * 180 / Math.PI);
//        $('.jx2d-cs-item[cid=jx2d-text-color-g]').css("background-color", '#' + object.color.getHexString());
//        $('.jx2d-cs-item[cid=jx2d-text-stroke-g]').css("background-color", '#' + object.strokeColor.getHexString());
//        $('.jx2d-cs-item[cid=jx2d-text-shadow-g]').css("background-color", '#' + object.shadowColor.getHexString());
        setInputValue($('.jx2d-input[typename=text_stroke_size]'), object.strokeSize);
        setInputValue($('.jx2d-input[typename=text_shadow_distance]'), object.shadowDistance);
        setInputValue($('.jx2d-input[typename=text_shadow_angle]'), object.shadowAngle);
        setInputValue($('.jx2d-input[typename=text_shadow_blur]'), object.shadowBlur);

        $('.jx2d-color-box[mlabel=0][mnotlink=0]').each(function() {
            if(temp_color.setStyle($(this).children("span").css("backgroundColor")).getHex() ==  object.color.getHex()) {
                changeColorBox($(this), $('.jx2d-cs-item[cid=jx2d-text-color-g]'));
                return false;
            }
        });

        if(object.useStroke) {
            $('.jx2d-color-box[mlabel=1][mnotlink=0]').each(function() {
                if(temp_color.setStyle($(this).children("span").css("backgroundColor")).getHex() ==  object.strokeColor.getHex()) {
                    changeColorBox($(this), $('.jx2d-cs-item[cid=jx2d-text-stroke-g]'));
                    return false;
                }
            });

        } else {
            changeColorBox($('.jx2d-color-box[mlabel=1][mnotlink=1]'), $('.jx2d-cs-item[cid=jx2d-text-stroke-g]'));
        }

        if(object.useShadow) {
            $('.jx2d-color-box[mlabel=2][mnotlink=0]').each(function() {
                if(temp_color.setStyle($(this).children("span").css("backgroundColor")).getHex() ==  object.shadowColor.getHex()) {
                    changeColorBox($(this), $('.jx2d-cs-item[cid=jx2d-text-shadow-g]'));
                    return false;
                }
            });

        } else {
            changeColorBox($('.jx2d-color-box[mlabel=2][mnotlink=1]'), $('.jx2d-cs-item[cid=jx2d-text-shadow-g]'));
        }

        $("#jx2d-text-font").val(object.font);

    };

    viewport2d.onIntersect = function(object) {
        $("#jx2d-properites-pg").show();
        updateTransformPanel(object);
        if(object.type == "JXText") {
            updateTextPanel(object);
        }
    };

    viewport2d.onNotIntersect = function() {
        $("#jx2d-properites-pg").hide();
    };

    viewport2d.getGizmo().onTransfrom = function(object) {
        updateTransformPanel(object);
    };


    $("#jx2d-common-pbody").on("shown.bs.collapse", function () {
        updateTransformPanel(viewport2d.current_object);
    });

    $("#jx2d-text-pbody").on("shown.bs.collapse", function () {
        updateTextPanel(viewport2d.current_object);
    });


    $("#jx2d-text-content").on('change', function() {
        if(viewport2d.current_object && viewport2d.current_object.type === "JXText") {
            viewport2d.current_object.content = $(this).val();
            viewport2d.update();
        }
    });


    $("#jx2d-text-font").on('change', function () {
        if(viewport2d.current_object && viewport2d.current_object.type === "JXText") {
            viewport2d.current_object.font = $(this).val();
            viewport2d.update();
        }
    });

    $("#jx2d-render-order-back").on('click', function() {
        if(viewport2d.current_object) {
            THREE.JX.moveDownArrayElement(shapeGroup.children, viewport2d.current_object);
            viewport2d.update();
        }
    });

    $("#jx2d-render-order-next").on('click', function() {
        if(viewport2d.current_object) {
            THREE.JX.moveUpArrayElement(shapeGroup.children, viewport2d.current_object);
            viewport2d.update();
        }
    });

    $("#jx2d-row-center").on('click', function() {
        if(viewport2d.current_object) {
            viewport2d.current_object.position.x = 0;
            viewport2d.update();
        }
    });

    $("#jx2d-col-center").on('click', function() {
        if(viewport2d.current_object) {
            viewport2d.current_object.position.y = 0;
            viewport2d.update();
        }
    });

    $('#jx2d-upload-image-button').on('click', function() {
        $('#jx2d-upload-image').click();
    });

    $('#jx2d-upload-image').on('change', function() {
       console.log(this.files[0]); 
    });
};

return entry;

});
