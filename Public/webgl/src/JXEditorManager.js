define(function (require) {

    var THREE = require("./libs/three.js");

    var JXTextureManager = require("./JXTextureManager");

    var JXMaterialManager = require("./JXMaterialManager");

    var JXObjectManager = require("./JXObjectManager");

    var JXScriptManager = require("./JXScriptManager");

    var JXEditorManager = function () {
        this.scene = new THREE.Scene();

        this.textureManager = new JXTextureManager();

        this.materialManager = new JXMaterialManager();

        this.objectManager = new JXObjectManager();
    };

    JXEditorManager.prototype = {

        read: function (json) {

        },

        write: function () {

        }
    };

    return JXEditorManager;

});