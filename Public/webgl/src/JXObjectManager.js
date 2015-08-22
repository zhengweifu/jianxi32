define(function (require) {
    var THREE = require("./libs/three.js");
    var JX = require("./JX");
    var JXMeshLoader = require("./JXMeshLoader");

    var JXObjectManager = function (materials) {
        this.materials = materials;
        this.geometries = [];
        this.objects = [];
    }

    JXObjectManager.prototype = {
        read: function (json) {

            var count = json.objects.length;

            for (var i = 0; i < count; i++) {

                this.objects.push(this.eachRead(json.objects[i]));

            }
        },

        eachRead: function ( json ) {

            var self = this, object;

            switch ( json.type ) {

                case 'Scene':

                    object = new THREE.Scene();

                    break;

                case 'PerspectiveCamera':

                    object = new THREE.PerspectiveCamera(json.fov, json.aspect, json.near, json.far);

                    break;

                case 'OrthographicCamera':

                    object = new THREE.OrthographicCamera(json.left, json.right, json.top, json.bottom, json.near, json.far);

                    break;

                case 'AmbientLight':

                    object = new THREE.AmbientLight(json.color);

                    break;

                case 'DirectionalLight':

                    object = new THREE.DirectionalLight(json.color, json.intensity);

                    break;

                case 'PointLight':

                    object = new THREE.PointLight(json.color, json.intensity, json.distance, json.decay);

                    break;

                case 'SpotLight':

                    object = new THREE.SpotLight(json.color, json.intensity, json.distance, json.angle, json.exponent, json.decay);

                    break;

                case 'HemisphereLight':

                    object = new THREE.HemisphereLight(json.color, json.groundColor, json.intensity);

                    break;

                case 'Mesh':
                    var mat;

                    if (json.material !== undefined) {

                        mat = this.materials[json.material];

                    } else {

                        mat = new THREE.MeshPhongMaterial({color: 0x888888});

                        this.materials[mat.uuid] = mat;

                    }
                    //mat.side =THREE.DoubleSide;

                    var gPath = JX.getAbsPath(JX.PROJECTPATH, json.geometry);

                    var JX_Mesh_Loader = new JXMeshLoader();

                    JX_Mesh_Loader.load(gPath, function (geo, obj) {

                        self.geometries.push(geo);

                        obj = new THREE.Mesh(geo, mat);

                    });

                    object = JX_Mesh_Loader.obj;

                    break;

                case 'Line':

                    var mat;

                    if (json.material !== undefined) {

                        mat = this.materials[json.material];

                    } else {

                        mat = new THREE.MeshPhongMaterial({color: 0x888888});

                        this.materials[mat.uuid] = mat;

                    }
                    //mat.side =THREE.DoubleSide;

                    var gPath = JX.getAbsPath(JX.PROJECTPATH, json.geometry);

                    var JX_Mesh_Loader = new JXMeshLoader();

                    JX_Mesh_Loader.load(gPath, function (geo, obj) {

                        self.geometries.push(geo);

                        obj = new THREE.Line(geo, mat);

                    });

                    object = JX_Mesh_Loader.obj;

                    break;

                case 'PointCloud':

                    //object = new THREE.PointCloud(getGeometry(json.geometry), getMaterial(json.material));

                    break;

                case 'Sprite':

                    object = new THREE.Sprite(this.materials[json.material]);

                    break;

                case 'Group':

                    object = new THREE.Group();

                    break;

                default:

                    object = new THREE.Object3D();

                this.setCommonValues(json, object);

                if ( json.children !== undefined ) {

                    for ( var child in json.children ) {

                        object.add( this.parseObject( json.children[ child ] ) );

                    }

                }

                return object;
            }
        },

        setCommonValues: function (json, object) {
            if (json.uuid !== undefined) object.uuid = json.uuid;
            if (json.name !== undefined) object.name = json.name;

            if (json.color !== undefined) object.color.setHex(json.color);
            if (json.intensity !== undefined) object.intensity = json.intensity;

            if (json.matrix !== undefined) {
                var matrix = new THREE.Matrix4();
                matrix.fromArray(json.matrix);
                matrix.decompose(object.position, object.quaternion, object.scale);
            }

            if (json.visible !== undefined) object.visible = json.visible;
        },

        write: function () {
            var self = this;
            //var result = {};

            function _write(object) {
                var result = {}
                result.uid = object.uuid;

                if (object.name !== '') result.name = object.name;
                //if ( JSON.stringify( object.userData ) !== '{}' ) result.userData = object.userData;
                if (object.visible !== true) result.visible = object.visible;

                if (object instanceof THREE.Scene) {

                    result.type = 'Scene';

                } else if (object instanceof THREE.PerspectiveCamera) {

                    result.type = 'PerspectiveCamera';
                    result.fov = object.fov;
                    result.aspect = object.aspect;
                    result.near = object.near;
                    result.far = object.far;

                } else if (object instanceof THREE.OrthographicCamera) {

                    result.type = 'OrthographicCamera';
                    result.left = object.left;
                    result.right = object.right;
                    result.top = object.top;
                    result.bottom = object.bottom;
                    result.near = object.near;
                    result.far = object.far;

                } else if (object instanceof THREE.AmbientLight) {

                    result.type = 'AmbientLight';
                    result.color = object.color.getHex();
                    result.intensity = object.intensity;

                } else if (object instanceof THREE.DirectionalLight) {

                    result.type = 'DirectionalLight';
                    result.color = object.color.getHex();
                    result.intensity = object.intensity;

                } else if (object instanceof THREE.PointLight) {

                    result.type = 'PointLight';
                    result.color = object.color.getHex();
                    result.intensity = object.intensity;
                    result.distance = object.distance;

                } else if (object instanceof THREE.SpotLight) {

                    result.type = 'SpotLight';
                    result.color = object.color.getHex();
                    result.intensity = object.intensity;
                    result.distance = object.distance;
                    result.angle = object.angle;
                    result.exponent = object.exponent;

                } else if (object instanceof THREE.HemisphereLight) {

                    result.type = 'HemisphereLight';
                    result.color = object.color.getHex();
                    result.groundColor = object.groundColor.getHex();

                } else if (object instanceof THREE.Mesh) {

                    result.type = 'Mesh';
                    result.geometry = object.geometry.uuid;
                    result.material = object.material.uuid;


                } else if (object instanceof THREE.Sprite) {

                    result.type = 'Sprite';

                } else {

                    result.type = 'Object3D';
                }

                result.matrix = object.matrix.toArray();
                return result;
            }

            var output = {meshes: []};
            for (var m in this.meshes) {
                output.meshes.push(_write(this.meshes[m]));
            }
            return output;
        }
    };

    return JXObjectManager;

});