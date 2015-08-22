/**
 * Created by zwf on 15/8/15.
 */

define(function ( require ) {
    var THREE = require("./libs/three.js");
    var JX = require("./JX");

    var JXMeshLoader =  function ( manager ) {

        this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

        this.binary = true;

        this.object = null;
    };

    JXMeshLoader.prototype = {
        
        constructor: JXMeshLoader,

        load: function ( url, onLoad, onProgress, onError ) {

            var scope = this;

            var loader = new THREE.XHRLoader( scope.manager );
            loader.setCrossOrigin( this.crossOrigin );

            if(this.binary) {
                loader.setResponseType("arraybuffer");
            }

            loader.load( url, function ( text ) {

                onLoad( scope.parse( text, url ), scope.object );

            }, onProgress, onError );

        },
        
        parse: function(data, url) { //geometry json

            function isBitSet(value, position) {
                return value & (1 << position);
            }
            var vertices = [],
                normals = [],
                uvs = [],
                faces = [],
                colors = [],
                uvLayers = 0;

            if(this.binary) {
                function parseString(data, offset, length) {
                    var charArray = new Uint8Array( data, offset, length);
                    var text = "";
                    for ( var i = 0; i < length; i ++ ) {
                        text += String.fromCharCode( charArray[ offset + i ]);
                    }
                    return text;
                }

                function parseUChar8(data, offset) {
                    var charArray = new Uint8Array(data, offset, 1);
                    return charArray[0];
                }

                function parseUInt32(data, offset) {
                    var intArray = new Uint32Array(data.slice(offset, offset+4), 0, 1);
                    return intArray[0];
                }

                function parseFloat32(data, offset) {
                    var floatArray = new Float32Array(data.slice(offset, offset+4), 0, 1);
                    return floatArray[0];
                }

                var point = 0,
                    i, j;

                uvLayers = parseUChar8(data, point);

                point += 1;

                var uv_counts = [];
                for(i=0; i<uvLayers; i++) {
                    uv_counts.push(parseUInt32(data, point));
                    point += 4;
                }

                var normal_count = parseUInt32(data, point);
                point += 4;

                var vertex_count = parseUInt32(data, point);
                point += 4;

                var face_infos = parseUInt32(data, point);
                point += 4;

                // uvs
                var uv;
                for(i=0; i<uv_counts.length; i++) {
                    uv = [];

                    for(j=0; j<uv_counts[i]*2; j++) {
                        uv.push(parseFloat32(data, point));
                        point += 4;
                    }
                    if(uv.length > 0) uvs.push(uv);
                }

                // normals
                for(i=0; i<normal_count*3; i++) {
                    normals.push(parseFloat32(data, point));
                    point += 4;
                }

                // vertices
                for(i=0; i<vertex_count*3; i++) {
                    vertices.push(parseFloat32(data, point));
                    point += 4;
                }

                // faces
                for(i=0; i<face_infos; i++) {
                    faces.push(parseUInt32(data, point));
                    point += 4;
                }

            } else {
                var json = data;
                vertices = json.data.vertices;
                normals = json.data.normals;
                uvs = json.data.uvs;
                faces = json.data.faces;
                colors = json.data.colors;
                // uv layers
                if(uvs !== undefined) {
                    if (uvs.length > 0) {
                        // disregard empty arrays
                        for(var i=0; i<uvs.length; i++) {
                            if(uvs[i].length) uvLayers++;
                        }
                    }
                }
            }

            var geometry = new THREE.Geometry();

            // uuid
            if(url !== undefined)
                geometry.uuid = JX.getRelativePath(JX.PROJECTPATH, url);


            // vertices
            if(vertices.length > 0) {
                for(var i=0; i<vertices.length; i+=3) {
                    var vertex = new THREE.Vector3(vertices[i], vertices[i+1], vertices[i+2]);
                    geometry.vertices.push(vertex);
                }
            }


            // faces
            var faces_size = faces.length
            if(faces_size > 0) {
                var offset = 0;
                var type, face, material_index, uv_index, u, v, normal_index, color_index, face_number;

                var isTriangle,
                    hasMaterial,
                    hasFaceVertexUv,
                    hasFaceNormal,
                    hasFaceVertexNormal,
                    hasFaceColor,
                    hasFaceVertexColor;

                while(offset < faces_size) {
                    //
                    type = faces[offset++];
                    isTriangle          = !isBitSet(type, 0);
                    hasMaterial         = isBitSet(type, 1);
                    hasFaceVertexUv     = isBitSet(type, 3);
                    hasFaceNormal       = isBitSet(type, 4);
                    hasFaceVertexNormal = isBitSet(type, 5);
                    hasFaceColor	    = isBitSet(type, 6);
                    hasFaceVertexColor  = isBitSet(type, 7);

                    //
                    if(isTriangle) {
                        // new a face
                        face = new THREE.Face3();
                        face.a = faces[offset++];
                        face.b = faces[offset++];
                        face.c = faces[offset++];

                        // material is true
                        if(hasMaterial) {
                            material_index = faces[offset++];
                            face.materialIndex = material_index;
                        }

                        // face vertex uv is true
                        face_number = geometry.faces.length;
                        if(uvs !== undefined) {
                            if(hasFaceVertexUv) {
                                if(uvLayers > 0) {
                                    for(var i=0; i<uvLayers; i++) {
                                        if(geometry.faceVertexUvs[i] === undefined) {
                                            geometry.faceVertexUvs.push([]);
                                        }

                                        geometry.faceVertexUvs[i][face_number] = [];
                                        for(var j=0; j<3; j++) {
                                            uv_index = faces[offset++];
                                            u = uvs[i][uv_index*2];
                                            v = uvs[i][uv_index*2 + 1];
                                            geometry.faceVertexUvs[i][face_number].push(new THREE.Vector2(u, v));
                                        }
                                    }
                                }
                            }
                        }

                        // if have not uv2, copy uv1 to uv2, beacuse light map is uv2
                        if(geometry.faceVertexUvs.length === 1) {
                            geometry.faceVertexUvs.push(geometry.faceVertexUvs[0]);
                        }


                        // face normal is true
                        if(hasFaceNormal) {
                            normal_index = faces[offset++] * 3;
                            face.normal.set(
                                normals[normal_index],
                                normals[normal_index + 1],
                                normals[normal_index + 2]
                            );
                        }

                        // face vertex normal is true
                        if(hasFaceVertexNormal) {
                            for(var i=0; i<3; i++) {
                                normal_index = faces[offset++] * 3;
                                face.vertexNormals.push(
                                    new THREE.Vector3(
                                        normals[normal_index],
                                        normals[normal_index + 1],
                                        normals[normal_index + 2]
                                    )
                                );
                            }
                        }

                        // face color is true
                        if(hasFaceColor) {
                            color_index = faces[offset++];
                            face.color.setHex(colors[color_index]);
                        }

                        // face vertex color is true
                        if(hasFaceVertexColor) {
                            for(var i=0; i<3; i++) {
                                color_index = faces[offset++];
                                face.vertexColors.push(new THREE.Color(colors[color_index]));
                            }
                        }

                        geometry.faces.push(face);
                    }
                }
            }

            // compute face normals
            if(!hasFaceVertexNormal && !hasFaceNormal)
                geometry.computeFaceNormals();

            return geometry;

        }
    };

    return JXMeshLoader;
});
