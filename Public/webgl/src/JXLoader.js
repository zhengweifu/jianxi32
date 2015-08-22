/**
 * Created by zwf on 15/8/14.
 */

define(function (require) {
    var THREE = require("./libs/three.js");

    var JXLoader = function() {

    };

    JXLoader.prototype.loadFile = function ( file ) {

        var filename = file.name;
        var extension = filename.split( '.' ).pop().toLowerCase();

        var reader = new FileReader();

        switch ( extension ) {
            case 'obj':

                reader.addEventListener( 'load', function ( event ) {

                    var contents = event.target.result;

                    var object = new THREE.OBJLoader().parse( contents );
                    object.name = filename;

                    //editor.addObject( object );
                    //editor.select( object );

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

                    //editor.addObject( mesh );
                    //editor.select( mesh );

                }, false );

                if ( reader.readAsBinaryString !== undefined ) {

                    reader.readAsBinaryString( file );

                } else {

                    reader.readAsArrayBuffer( file );

                }

                break;
        }
    };

    return JXLoader();
});