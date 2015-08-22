define(function (require) {

    var JX = {REVISION: '1.0'};

    // point rotation angle get new point
    JX.getNewPoint = function (radian, old_piont, pivot_start, pivot_end) {
        var c = Math.cos(radian);
        var s = Math.sin(radian);
        new_point = new THREE.Vector3();

        old_x = old_piont.x;
        old_y = old_piont.y;
        old_z = old_piont.z;

        var p = new THREE.Vector3();
        p.subVectors(pivot_end, pivot_start).normalize();

        var u = p.x, v = p.y, w = p.z;

        var x = pivot_start.x, y = pivot_start.y, z = pivot_start.z;

        var uu = u * u,
            uv = u * v,
            uw = u * w,
            vv = v * v,
            vw = v * w,
            ww = w * w,

            xu = x * u,
            xv = x * v,
            xw = x * w,
            yu = y * u,
            yv = y * v,
            yw = y * w,
            zu = z * u,
            zv = z * v,
            zw = z * w;

        var m11 = uu + (vv + ww) * c,
            m12 = uv * (1 - c) - w * s,
            m13 = uw * (1 - c) + v * s,
            m14 = (x * (vv + ww) - u * (yv + zw)) * (1 - c) + (yw - zv) * s,

            m21 = uv * (1 - c) + w * s,
            m22 = vv + (uu + ww) * c,
            m23 = vw * (1 - c) - u * s,
            m24 = (y * (uu + ww) - v * (xu + zw)) * (1 - c) + (zu - xw) * s,

            m31 = uw * (1 - c) - v * s,
            m32 = vw * (1 - c) + u * s,
            m33 = ww + (uu + vv) * c,
            m34 = (z * (uu + vv) - w * (xu + yv)) * (1 - c) + (xv - yu) * s;

        var new_x = m11 * old_x + m12 * old_y + m13 * old_z + m14,
            new_y = m21 * old_x + m22 * old_y + m23 * old_z + m24,
            new_z = m31 * old_x + m32 * old_y + m33 * old_z + m34;

        new_point.set(new_x, new_y, new_z);
        return new_point;
    };

    //得到点新的坐标
    JX.getPosition = function (radian, up, eye, target, axis) {
        var x = new THREE.Vector3(),
            y = new THREE.Vector3(),
            z = new THREE.Vector3();

        z.subVectors(eye, target).normalize();
        x.crossVectors(up, z).normalize();
        y.crossVectors(z, x).normalize();

        //rotate_y = new THREE.Vector3();
        var end;
        if (axis === undefined) axis = "y";
        if (axis === "y") {
            end = y.add(target);
        } else if (axis === "x") {
            end = x.add(target);
        } else if (axis === "z") {
            end = z.add(target);
        } else {
            return new THREE.Vector3();
        }

        var p = JX.getNewPoint(radian, eye, target, end);
        return p;
    };

    // x from [a, b] to [c, d].
    JX.intervalTransition = function (x, a, b, c, d) {
        var result = (x - a) * (d - c) / (b - a) + c;
        return result;
    };

    //将相对路径转成绝对路径
    JX.getAbsPath = function (url, sRelative) {
        if (url.replace("\\", "/").split("/")[0] == sRelative.replace("\\", "/").split("/")[0]) {
            return sRelative;
        }

        var sUrl = url.replace(/^.*?\:\/\/[^\/]+/, "").replace(/[^\/]+$/, "");

        if (!sRelative) {
            return sUrl;
        }
        if (!/\/$/.test(sUrl)) {
            sUrl += "/";
        }
        if (/^\.\.\//.test(sRelative)) {
            var Re = new RegExp("^\\.\\.\\/"), iCount = 0;
            while (Re.exec(sRelative) != null) {
                sRelative = sRelative.replace(Re, "");
                iCount++;
            }
            for (var i = 0; i < iCount; i++) {
                sUrl = sUrl.replace(/[^\/]+\/$/, "");
            }
            if (sUrl == "") return "/";
            return sUrl + sRelative;
        }
        sRelative = sRelative.replace(/^\.\//, "");
        return sUrl + sRelative;
    };

    //在list列表中查找element的位置
    JX.findInArray = function (element, list) {
        for (var i in list) {
            if (element === list[i]) return i;
        }
        return -1;
    };

    //将绝对路径转成相对路径
    JX.getRelativePath = function (url, sAbs) {
        var url_n = url.replace("\\", "/");
        var url_n_l = url_n.split("/");

        var sAbs_n = sAbs.replace("\\", "/");
        var sAbs_n_l = sAbs_n.split("/");

        var len_url = url_n_l.length;
        var len_sAbs = sAbs_n_l.length;

        var i;

        var ref = null;

        for (i = 0; i < len_url - 1 && i < len_sAbs; i++) {
            if (url_n_l[i] !== sAbs_n_l[i]) {
                ref = i
                break;
            } else {
                if (i === len_url - 2) ref = i + 1;
            }
        }

        if (ref === null || ref < 0) return sAbs;

        var split = new Array();
        for (i = ref; i < len_url - 1; i++) {
            split.push("..");
        }

        for (i = ref; i < len_sAbs; i++) {
            split.push(sAbs_n_l[i]);
        }

        return split.join("/");
    };

    JX.isfile = function (f) {
        var request = new XMLHttpRequest();
        request.open("HEAD", f, false);
        request.send(null);
        var result = false;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    result = true;
                    alert("aaaaa");
                }
            }
        }
        return result;
    };

    JX.WithoutAddressPath = function (absPath) {
        var address = window.location.protocol + "//" + window.location.host;
        if (absPath.substring(0, address.length) === address) {
            return absPath.substring(address.length, absPath.length);
        } else {
            return absPath;
        }
    };

    // 发送通用参数
    JX.requestParameters = function (_method) {
        var _user = "miaomin@bitmap3d.con.cn";
        var _pass = MD5("123456");
        var base64 = new Base64();
        var _format = "json";
        var _visa = base64.encode(_user + " " + _pass);
        var _curlPost = "method=" + _method + "&visa=" + _visa + "&format=" + _format;

        var publicKey = 'O4rDRqwshSBojonvTt4mar21Yv1Ehmqm';


        var genSign = function (parameter, vcode) {
            var start = vcode - 1;
            var parameterMD5 = MD5(parameter);
            return MD5(parameterMD5 + publicKey.substring(start, start + 4));
        };

        var _vcode = Math.floor(Math.random() * 27 + 1);
        var _sign = genSign(_curlPost, _vcode);

        return {
            visa: _visa,
            vcode: _vcode,
            method: _method,
            sign: _sign,
            format: _format,
            debug: 0,
            pid: loadjs.p_id
        };
    };

    //发送方法
    JX.postData = function (data, callback) {
        //处理数据成字符串，样式"xxx=xxx&yyy=yyy&...=..."
        var d = "";
        for (var each in data) {
            d += each + "=" + data[each] + "&";
        }
        d = d.substring(0, d.length - 1);

        var request = new XMLHttpRequest();
        request.addEventListener("readystatechange", function (event) {
                if (event.target.readyState === 4) {
                    if (event.target.status == 200) {
                        var response = event.target.response;
                        var result = JSON.parse(response)[1];
                        if (callback !== undefined) {
                            if (result !== 0)
                                if (result.substring(0, JX.ADDRESSPATH.length) === JX.ADDRESSPATH) {
                                    result = result.substring(JX.ADDRESSPATH.length, result.length);
                                }
                            callback(result);
                        }
                        // alert("output: " + result);
                    } else {
                        alert("Request Errors Occured");
                    }
                }
            }, false);

        request.open('POST', "/api.php/services/rest", true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //request.setHeader('Access-Control-Allow-Origin', "*");
        //request.setRequestHeader('Content-Length', data.length);
        request.send(d);
    };

    // 记录工程路径
    JX.PROJECTPATH = "";

    // 网站地址对应绝对路径
    JX.ADDRESSPATH = "/home/wwwroot/default";


    return JX;
});
