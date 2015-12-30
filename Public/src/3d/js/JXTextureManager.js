define(function (require) {
    var THREE = require("./libs/three.js");
    var JXImageLoader = require("./JXImageLoader");
    var JX = require("./JX");

    var JXTextureManager = function () {
        this.textures = {};
        this.record = [];
    };

    JXTextureManager.prototype = {
        setValues: function (texture, parameters) {
            var parameter_default = {
                anisotropy: 1,
                magFilter: THREE.LinearFilter,
                minFilter: THREE.LinearMipMapLinearFilter,
                format: THREE.RGBAFormat,
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping
            };
            for (var each in parameter_default) {
                if (parameters[each] !== undefined) {
                    texture[each] = parameters[each];
                } else {
                    texture[each] = parameter_default[each];
                }
            }

            if (parameters["repeat"] !== undefined) {
                texture.repeat.set(parameters["repeat"][0], parameters["repeat"][1]);
            } else {
                texture.repeat.set(1, 1);
            }

            if (parameters["offset"] !== undefined) {
                texture.offset.set(parameters["offset"][0], parameters["offset"][1]);
            } else {
                texture.offset.set(0, 0);
            }

        },

        read: function (json_list) {
            var json;
            for (var i in json_list) {

                json = json_list[i];

                if (json.url === undefined) return [];

                var texture;
                if (typeof(json.url) === "string") {
                    //continue;
                    var point_index = json.url.lastIndexOf(".");
                    if (point_index === -1) continue;
                    var ext = json.url.substring(point_index + 1, json.url.length).toLowerCase();
                    var src_2d = JX.getAbsPath(JX.PROJECTPATH, json.url);
                    if (ext === "dds") {
                        texture = JXImageLoader.loadDDSTexture(src_2d);
                    } else if (ext === "tga") {
                        texture = JXImageLoader.loadTGATexture(src_2d);
                        // var tgaLoader = new THREE.TGALoader();
                        // texture = tgaLoader.load(src_2d);
                    } else {
                        texture = JXImageLoader.loadTexture(src_2d);
                    }
                } else {
                    var src_cube = new Array();
                    for (var j = 0; j < json.url.length; j++) {
                        src_cube.push(JX.getAbsPath(JX.PROJECTPATH, json.url[j]))
                    }
                    texture = THREE.ImageUtils.loadTextureCube(src_cube);
                }

                // record parameters
                var record_texture = {};
                record_texture.object = texture;
                record_texture.parameters = json;
                this.record.push(record_texture);

                this.setValues(texture, json);

                if (json.uuid !== undefined) texture.uuid = json.uuid;

                texture.needsUpdate = true;

                this.textures[json.uid] = texture;
            }
        },

        write: function () {
            result = [];
            var t;
            var e_result;
            for (var UID in this.textures) {
                e_result = {};
                t = this.textures[UID];
                if (t.uuid !== undefined) e_result.uid = t.uuid;
                var image = t.image;
                var image_length = image.length;
                var src;
                if (image_length) {
                    var url_list = [];
                    for (var i = 0; i < image_length; i++) {

                        if (image[i].src !== undefined) {

                            src = JX.getRelativePath(JX.PROJECTPATH, JX.WithoutAddressPath(image[i].src));
                            url_list.push(src);
                        }
                    }
                    if (url_list.length) e_result.url = url_list;
                } else {
                    if (t.sourceFile !== undefined) {
                        src = JX.getRelativePath(JX.PROJECTPATH, JX.WithoutAddressPath(t.sourceFile));
                        e_result.url = src;
                    }
                }

                var parameter_default = {
                    anisotropy: 1,
                    magFilter: THREE.LinearFilter,
                    minFilter: THREE.LinearMipMapLinearFilter,
                    format: THREE.RGBAFormat,
                    wrapS: THREE.RepeatWrapping,
                    wrapT: THREE.RepeatWrapping
                };
                for (var each in parameter_default) {
                    if (t[each] !== undefined) {
                        if (t[each] !== parameter_default[each]) e_result[each] = t[each];
                    }
                }
                if (t.offset !== undefined) {
                    if (t.offset.x !== 0.0 && t.offset.y !== 0.0) e_result.offset = [t.offset.x, t.offset.y];
                }

                if (t.repeat !== undefined) {
                    if (t.repeat.x !== 0.0 && t.repeat.y !== 0.0) e_result.repeat = [t.repeat.x, t.repeat.y];
                }

                var temp = false;
                for (var e in e_result) {
                    temp = true;
                    break;
                }
                if (temp) {
                    result.push(e_result);
                }
            }
            return result;
        }
    };

    return JXTextureManager;
});

