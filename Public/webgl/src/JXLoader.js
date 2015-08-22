/**
 * Created by zwf on 15/8/14.
 */

define(function (require) {
    var THREE = require("./libs/three.js");
    var JXMeshLoader = require('./JXMeshLoader');

    var JXLoader = {

        loadFile : function ( file, editorManager ) {

            var filename = file.name;
            var extension = filename.split( '.' ).pop().toLowerCase();

            var reader = new FileReader();

            switch ( extension ) {
                case 'mesh':
                    reader.addEventListener ( 'load', function ( event ) {
                        var contents = event.target.result;

                        var geometry = new JXMeshLoader().parse( contents );

                        var material = new THREE.MeshPhongMaterial();

                        var mesh = new THREE.Mesh(geometry, material);

                        editorManager.addObject( mesh );
                        editorManager.select( mesh );

                        editorManager.addMaterial(material);


                    }, false);

                    //if ( reader.readAsBinaryString !== undefined ) {
                    //
                    //    reader.readAsBinaryString( file );
                    //
                    //} else {

                    reader.readAsArrayBuffer( file );

                    //}

                    break;


                case 'obj':

                    reader.addEventListener( 'load', function ( event ) {

                        var contents = event.target.result;

                        var object = new THREE.OBJLoader().parse( contents );
                        object.name = filename;

                        editorManager.addObject( object );
                        editorManager.select( object );

                    }, false );
                    reader.readAsText( file );

                    break;

                case 'stl' :

                    reader.addEventListener( 'load', function ( event ) {

                        var contents = event.target.result;

                        var geometry = new THREE.STLLoader().parse( contents );
                        geometry.sourceType = "stl";
                        geometry.sourceFile = file.name;

                        var material = new THREE.MeshPhongMaterial();

                        var mesh = new THREE.Mesh( geometry, material );
                        mesh.name = filename;

                        editorManager.addObject( mesh );
                        editorManager.select( mesh );

                        editorManager.addMaterial( material );

                    }, false );

                    if ( reader.readAsBinaryString !== undefined ) {

                        reader.readAsBinaryString( file );

                    } else {

                        reader.readAsArrayBuffer( file );

                    }

                    break;
            }
        }

    };

    return JXLoader;
});