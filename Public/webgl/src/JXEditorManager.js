define(function (require) {

    var THREE = require("./libs/three.js");

    var JXTextureManager = require("./JXTextureManager");

    var JXMaterialManager = require("./JXMaterialManager");

    var JXObjectManager = require("./JXObjectManager");

    var JXScriptManager = require("./JXScriptManager");

    var JXViewport3D = require("./JXViewport3D");

    var JXEditorManager = function (viewport, manager) {

        this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

        this.textureManager = new JXTextureManager();

        this.materialManager = new JXMaterialManager();

        this.objectManager = new JXObjectManager();

        this.scriptManager = new JXScriptManager();

        this.viewport3d = viewport;

    };

    JXEditorManager.prototype = {
        /**
         * 导入工程文件
         * @param url       工程文件路径
         * @param callback  回调函数调用
         */
        loadProject : function (url, onLoad, onProgress, onError) {

            var self = this;

            var loader = new THREE.XHRLoader( this.manager );

            loader.load(url, function () {

                var project_json = JSON.parse(event.target.responseText);

                self.read(project_json);

                onLoad(self);

            }, onProgress, onError);
        },

        /**
         * 读工程数据
         * @param json   工程文件数据
         */
        read : function (json) {
            this.textureManager.read(json.textures);

            this.materialManager.setTextures(this.textureManager.textures);
            this.materialManager.read(json.materials, json.faceMaterials);

            this.objectManager.setMaterials(this.materialManager.materials);
            this.objectManager.read(json.objects);

            for(var i=0; i<this.objectManager.objects.length; i++) {
                this.viewport3d.scene.add(this.objectManager.objects[i]);
            }
        },

        /**
         * 导出保存工程
         */
        write : function () {

        },

        /**
         * 添加物体
         * @param object
         */

        addObject : function (object) {

            this.viewport3d.scene.add(object);

            this.objectManager.objects.push(object);

        },

        /**
         * 添加贴图
         * @param texture
         */
        addTexture : function (texture) {
            this.textureManager.textures[texture.uuid] = texture;
        },

        /**
         * 添加材质
         * @param matrial
         */
        addMaterial : function (material) {
            this.materialManager.materials[material.uuid] = material;
        },

        /**
         * 添加脚本
         * @param script
         */
        addScript : function (script) {
            this.scriptManager.scripts[script.uuid] = script;
        },

        /**
         * 设置当前选择
         * @param object
         */
        select : function (object) {

        }
    };

    return JXEditorManager;

});