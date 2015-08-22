define(function (require) {
    var THREE = require("./libs/three.js");

    var JXMaterialManager = function (textures) {
        this.materials = {};
        this.textures = textures;
        this.editable_materials = [];
        this.record = [];
    };

    JXMaterialManager.prototype = {
        setValues: function (material, parameters) {
            // set common parameters
            if (parameters.color !== undefined) material.color.setHex(parameters.color);
            else material.color.setRGB(1, 1, 1);

            //if (parameters.isPhong !== undefined) material.isPhong = parameters.isPhong;
            //else material.isPhong = 1;

            if (parameters.ambient !== undefined && material.ambient !== undefined) material.ambient.setHex(parameters.ambient);
            else material.ambient.setRGB(1, 1, 1);

            if (parameters.emissive !== undefined && material.emissive !== undefined) material.emissive.setHex(parameters.emissive);
            else material.emissive.setRGB(0, 0, 0);

            if (parameters.specular !== undefined && material.specular !== undefined) material.specular.setHex(parameters.specular);
            else material.specular.setRGB(1, 1, 1);

            if (parameters.light !== undefined && material.light !== undefined) material.light.setHex(parameters.light);
            else material.light.setRGB(1, 1, 1);

            if (parameters.shininess !== undefined && material.shininess !== undefined) material.shininess = parameters.shininess;
            else material.shininess = 30;

            if (parameters.vertexColors !== undefined) material.vertexColors = parameters.vertexColors;
            material.vertexColors = THREE.NoColors;

            if (parameters.blending !== undefined) material.blending = parameters.blending;
            material.blending = THREE.NormalBlending;

            if (parameters.side !== undefined) material.side = parameters.side;
            material.side = THREE.FrontSide;


            if (parameters.opacity !== undefined) material.opacity = parameters.opacity;
            material.opacity = 1;

            if (parameters.transparent !== undefined) material.transparent = parameters.transparent;
            material.transparent = false;


            if (parameters.wireframe !== undefined) material.wireframe = parameters.wireframe;
            material.wireframe = false;


            // set special parameters
            var special_parameters = {
                "bumpScale": 1.0,
                "normalScale": new THREE.Vector2(1.0, 1.0),
                "reflectivity": 0.0,
                "combine": THREE.MixOperation
            };
            for (var each in special_parameters) {
                if (parameters[each] !== undefined && material[each] !== undefined) {
                    material[each] = parameters[each];
                } else {
                    material[each] = special_parameters[each];
                }
            }

            // material texture map
            var map_parameters = [
                "map",
                "specularMap",
                "normalMap",
                "bumpMap",
                "envMap",
                "lightMap"
            ];
            for (var i in map_parameters) {
                if (parameters[map_parameters[i]] !== undefined) {
                    material[map_parameters[i]] = this.textures[parameters[map_parameters[i]]];
                } else {
                    material[map_parameters[i]] = null;
                }
            }
            material.needsUpdate = true;
        },

        //记录材质信息
        setRecord: function (material, parameters) {
            var obj = {}
            obj.object = material;
            obj.parameters = parameters;
            this.record.push(obj);
        },


        read: function (json_list, json_face_materials) {
            var self = this;
            var json, i;


            for ( i in json_list ) {
                json = json_list[i];
                parseMaterial(json);
            }

            for ( i in json_face_materials ) {
                json = json_face_materials[i];
                parseFaceMaterial(json)
            }

            function parseMaterial(json) {

                var material = new THREE[json.type];

                //记录材质信息
                self.setRecord(material, json);

                self.setValues(material, json);

                // read env map
                //if (material.envMap !== undefined) {
                //    material.envMap = editor.environment_manager.environment_texture;
                //}

                // children material
                if (json.materials !== undefined) {
                    for (var i = 0; i < json.materials.length; i++) {

                        material.materials.push(parseMaterial(json.materials[i]));
                    }
                }

                self.materials[json.uid] = material;
                self.editable_materials.push(material);
                return material;
            }

            function parseFaceMaterial(json) {
                var material = new THREE.MeshFaceMaterial();
                material.uuid = THREE.Math.generateUUID();
                for (var i = 0; i < json.materials.length; i++) {
                    if (json.materials[i] !== undefined) {
                        if (self.materials[json.materials[i]] !== undefined)
                            material.materials.push(self.materials[json.materials[i]]);

                    }
                }
                self.materials[json.uid] = material
            }

            // for(each in this.materials){
            // 	if(this.materials[each] instanceof THREE.MeshFaceMaterial) {
            // 		continue;
            // 	} else {
            // 		this.current_material = this.materials[each];
            // 		break;
            // 	}
            // }

        },

        write: function () {
            result = [];
            result_face_materials = [];
            var m;
            var e_result;
            for (var UID in this.materials) {
                e_result = {};
                m = this.materials[UID];
                e_result.uid = m.uuid;

                if (m instanceof THREE.MeshFaceMaterial) {
                    var fm_children = m.materials;
                    if (fm_children.length > 0) {
                        e_result.type = "MeshFaceMaterial";
                        e_result.materials = [];
                        for (var es = 0; es < fm_children.length; es++) {
                            e_result.materials.push(fm_children[es].uuid);
                        }
                    }
                    result_face_materials.push(e_result);
                    continue;
                }

                if (m instanceof THREE.MeshPhongMaterial) {
                    e_result.type = "MeshPhongMaterial";
                } else if (m instanceof THREE.MeshLambertMaterial) {
                    e_result.type = "MeshLambertMaterial";
                } else if (m instanceof THREE.MeshBmwglMaterial) {
                    e_result.type = "MeshBmwglMaterial";
                }


                // output colors
                var color_parameter_default = {
                    color: 16777215,
                    ambient: 16777215,
                    emissive: 16777215,
                    specular: 1118481,
                    light: 16777215
                }
                for (var each in color_parameter_default) {
                    if (m[each] !== undefined) {
                        if (m[each] !== color_parameter_default[each]) e_result[each] = m[each].getHex();
                    }
                }

                // output index
                var index_parameter_default = {
                    shininess: 30,
                    vertexColors: false,
                    blending: THREE.NormalBlending,
                    side: THREE.FrontSide,
                    opacity: 1.0,
                    transparent: false,
                    wireframe: false,
                    combine: THREE.MixOperation,
                    isPhong: 1,
                    reflectivity: 0
                };
                for (var each in index_parameter_default) {
                    if (m[each] !== undefined) {
                        if (m[each] !== index_parameter_default[each]) e_result[each] = m[each];
                    }
                }

                // output map uuid
                var map_parameters = [
                    "map",
                    "specularMap",
                    "normalMap",
                    "bumpMap",
                    "lightMap"
                ];
                for (var i in map_parameters) {
                    if (m[map_parameters[i]] !== undefined && m[map_parameters[i]] !== null) {
                        e_result[map_parameters[i]] = m[map_parameters[i]]["uuid"];
                    }
                }


                var temp = false;
                for (var e in e_result) {
                    temp = true;
                    break;
                }

                if (temp) result.push(e_result);
            }

            return [result, result_face_materials];
        }
    };

    return JXMaterialManager;

});