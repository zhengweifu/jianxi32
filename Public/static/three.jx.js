// File:src/JX.js

THREE.JX = {
	version : "1.0.0"
};


/**
 * [getTextSize description]
 * @param  {[type]} text    [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
THREE.JX.getTextSize = function(text, options) {
	options = options || {};
    options.font = options.font || 'Times';
    options.fontSize = options.fontSize || '16pt';
    options.fontWeight = options.fontWeight || 'normal';

	var result = {w: 0, h: 0};

	if(!THREE.JX.JX_MEASURE_DIV) {
		THREE.JX.JX_MEASURE_DIV = document.createElement('div');
		document.body.appendChild(THREE.JX.JX_MEASURE_DIV);
		THREE.JX.JX_MEASURE_DIV.style.position = "absolute";
		THREE.JX.JX_MEASURE_DIV.style.visibility = 'hidden';
		THREE.JX.JX_MEASURE_DIV.style.left = -10000;
		THREE.JX.JX_MEASURE_DIV.style.top = THREE.JX.JX_MEASURE_DIV.style.left;
		THREE.JX.JX_MEASURE_DIV.style.width = 'auto';
    	THREE.JX.JX_MEASURE_DIV.style.height = 'auto';
	}

	var _div = THREE.JX.JX_MEASURE_DIV;
	_div.style.fontSize = options.fontSize;
	_div.style.fontFamily = options.font;
	_div.style.fontWeight = options.fontWeight;

	_div.innerHTML = text;

	result.w = _div.offsetWidth;
	result.h = _div.offsetHeight;

	if(!THREE.JX.JX_CANVAS_CONTEXT) {
		var _canvas = document.createElement('canvas');
		THREE.JX.JX_CANVAS_CONTEXT = _canvas.getContext('2d');
	}

	if(THREE.JX.JX_CANVAS_CONTEXT) {
		THREE.JX.JX_CANVAS_CONTEXT.font = options.fontSize + " " + options.font + " " + options.fontWeight;
		result.w = THREE.JX.JX_CANVAS_CONTEXT.measureText(text).width;
	}

	return result;
};

/**
 * [pointInPolygon description]
 * @param  {[type]} point  [THREE.Vector2]
 * @param  {[type]} points [THREE.Vector2 array]
 * @return {[type]}        [bool]
 */
THREE.JX.pointInPolygon = function(point, points) {
	var i, p1, p2;
	var nCross = 0, nCount = points.length;
	for(i=0; i<nCount; i++) {
		p1 = points[i];
		p2 = points[(i+1)%nCount];
		if(p1.y == p2.y) {
			continue;
		}

		if(point.y < Math.min(p1.y, p2.y)) {
			continue;
		}

		if(point.y >= Math.max(p1.y, p2.y)) {
			continue;
		}

		var x = (point.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;

		if(x > point.x) nCross++;
	}

	return (nCross % 2 == 1);

};

THREE.JX.vector2ApplyMatrix4 = function(v2, m4) {
	var e = m4.elements;
	var x = v2.x, y = v2.y;

	v2.x = e[ 0 ] * x + e[ 4 ] * y + e[ 12 ];
	v2.y = e[ 1 ] * x + e[ 5 ] * y + e[ 13 ];

	return v2;
};

THREE.JX.getMousePosition = function(dom, x, y) { // x = event.clientX, y = event.clientY, 转element坐标
	var rect = dom.getBoundingClientRect();
	// return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
	return [ x - rect.left, y - rect.top ];
};

THREE.JX.getDeckardCoordinate = function(dom, x, y) { // x = event.clientX, y = event.clientY, 转迪卡坐标
	var rect = dom.getBoundingClientRect();
	return [ x - rect.left - rect.width * 0.5, rect.height * 0.5 - y + rect.top ];
}

// swap array elements
THREE.JX.swapArrayElements = function(arr, index1, index2) {
	arr[index1] = arr.splice(index2, 1, arr[index1])[0];
	return arr;
}

// get element indexOf array 
THREE.JX.elementIndexOfArray = function(arr, element) {
	for(var i=0, l=arr.length; i<l; i++) {
		if(arr[i] === element) {
			return i;
		}
	}

	return -1;
};

// element move up
THREE.JX.moveUpArrayElement = function(arr, element) {
	var index = THREE.JX.elementIndexOfArray(arr, element);
	if(index > 0) {
		THREE.JX.swapArrayElements(arr, index-1, index);
	}
};

// element move down
THREE.JX.moveDownArrayElement = function(arr, element) {
	var index = THREE.JX.elementIndexOfArray(arr, element);
	if(index > -1 && index < arr.length - 1) {
		THREE.JX.swapArrayElements(arr, index, index+1);
	}
};
// File:src/JXNode.js

THREE.JX.JXNode = function() {
	THREE.Object3D.call(this);

	this.type = "JXNode";

	this.boundingBox = new THREE.Box2();

	this.width = 0;

	this.height = 0;

	this.drawHepler = false;

	this.gizmoHepler = undefined;
};

THREE.JX.JXNode.prototype = Object.create(THREE.Object3D.prototype);

THREE.JX.JXNode.prototype.constructor = THREE.JX.JXNode;

THREE.JX.JXNode.prototype.clone = function(recursive) {
	return new this.constructor().copy(this, recursive);
};

THREE.JX.JXNode.prototype.copy = function(source, recursive) {
	if(recursive === undefined) recursive = true;

	THREE.Object3D.prototype.copy.call( this, source, recursive );

	this.boundingBox.copy(source.boundingBox);

	this.width = source.width;

	this.height = source.height;

	return this;
};

THREE.JX.JXNode.prototype.pointInJXNode = function(point) {
	/**
	 * p1 + + + + p2
	 * +           +
	 * +           +
	 * +           +
	 * +           +
	 * p4 + + + + p3
	 */

	var bbx = this.boundingBox;
	var p1 = new THREE.Vector2(bbx.min.x, bbx.max.y),
		p2 = bbx.max.clone(),
		p3 = new THREE.Vector2(bbx.max.x, bbx.min.y),
		p4 = bbx.min.clone();

	THREE.JX.vector2ApplyMatrix4(p1, this.matrixWorld);
	THREE.JX.vector2ApplyMatrix4(p2, this.matrixWorld);
	THREE.JX.vector2ApplyMatrix4(p3, this.matrixWorld);
	THREE.JX.vector2ApplyMatrix4(p4, this.matrixWorld);

	var points = [p1, p2, p3, p4];

	return THREE.JX.pointInPolygon(point, points);
};
// File:src/JXText.js

THREE.JX.JXText = function() {

	THREE.JX.JXNode.call(this);

	this.type = "JXText";

	// content
	this.content = "www.jianxi.com";
	this.useColor = true;
	this.color = new THREE.Color();
	this.size = 1.0;
	this.space = 0.0;
	this.font = "Arial";

	// stroke
	this.useStroke = false;
	this.strokeColor = new THREE.Color(0x888888);
	this.strokeCap = "round"; // butt, round, square
	this.strokeJoin = "round"; // miter, round, 
	this.strokeSize = 1;

	// shadow
	this.useShadow = false;
	this.shadowColor = new THREE.Color(0x000000);
	this.shadowDistance = 3.0;
	this.shadowAngle = 100;
	this.shadowBlur = 0;

	// arc
	this.arc = 0;

	this.subTransforms = [];

	this.needUpdate = true;
};

THREE.JX.JXText.prototype = Object.create(THREE.JX.JXNode.prototype);

THREE.JX.JXText.prototype.constructor = THREE.JX.JXText;

THREE.JX.JXText.prototype.clone = function(recursive) {
	return new this.constructor().copy(this, recursive);
};

THREE.JX.JXText.prototype.copy = function(source, recursive) {
	if(recursive === undefined) recursive = true;

	THREE.JX.JXNode.prototype.copy.call( this, source, recursive );

	this.content = source.content;
	this.useColor = source.useColor;
	this.color.copy(source.color);
	this.size = source.size;
	this.space = source.space;
	this.font = source.font;

	this.useStroke = source.useStroke;
	this.strokeColor.copy(source.strokeColor);
	this.strokeCap = source.strokeCap;
	this.strokeJoin = source.strokeJoin;
	this.strokeSize = source.strokeSize;

	this.useShadow = source.useShadow;
	this.shadowColor.copy(source.shadowColor);
	this.shadowDistance = source.shadowDistance;
	this.shadowAngle = source.shadowAngle;
	this.shadowBlur = source.shadowBlur;

	this.arc = source.arc;

	return this;
};

THREE.JX.JXText.prototype.updateSubTransform = function() {
	this.subTransforms.length = 0;

	var options = {
		font : this.font,
		fontSize : this.size + 'pt'
	};
	var tb = THREE.JX.getTextSize(this.content, options);
	var h = tb.h;

	var l = tb.w + this.space * (this.content.length - 1);

	var a = this.arc, ta = (l / (l + this.space)) * 2 * Math.PI;
	if(a > ta) a = ta;
	else if(a < -ta) a = -ta;

	// l *= this.scale.x;
	var r = l/2;
	if(a != 0) r = l / a;
	var etw, ea, ta=0, tl=0;

	if(a == 0) {
		this.width = l;
		this.height = h;
	} else {
		var _a = Math.abs(a), _r = Math.abs(r), _h = Math.abs(h);
		if(_a >= Math.PI) {
			this.width = 2 * _r + _h;
			this.height = (_r + _h/2) * (1 - Math.cos(_a/2));
		} else {
			this.width = 2 * (_r + _h/2) * Math.sin(_a/2);
			this.height = (_r + _h/2) -((_r - _h/2) * Math.cos(_a/2));
		}
	}

	// set boundingBox
	// var b_x = this.width * this.scale.x/2;
	// if(a > 0) {
	// 	this.boundingBox.min.set(-b_x, h * this.scale.y * 0.5 - this.height * this.scale.y);
	// 	this.boundingBox.max.set(b_x, h * this.scale.y * 0.5);
	// } else {
	// 	this.boundingBox.min.set(-b_x, -h * this.scale.y * 0.5);
	// 	this.boundingBox.max.set(b_x, this.height * this.scale.y - h * this.scale.y * 0.5);
	// }

	// var b_x = this.width * 0.5;
	// if(a >= 0) {
	// 	this.boundingBox.min.set(-b_x, h * 0.5 - this.height);
	// 	this.boundingBox.max.set(b_x, h * 0.5);
	// } else {
	// 	this.boundingBox.min.set(-b_x, -h * 0.5);
	// 	this.boundingBox.max.set(b_x, this.height - h * 0.5);
	// }

	var b_x = this.width * 0.5, b_y = this.height * 0.5, _center = new THREE.Vector2();
	this.boundingBox.min.set(-b_x, -b_y);
	this.boundingBox.max.set( b_x,  b_y);
	if(a >= 0) {
		_center.set(0, (h - this.height) / 2);
	} else {
		_center.set(0, (this.height - h) / 2);
	}

	var pos_x, pos_y, rot;
	for(var i=0; i<this.content.length; i++) {

		etw = THREE.JX.getTextSize(this.content[i], options).w; 
		ea = a * (tl/l - 0.5);

		if(a != 0) {
			pos_x = r * Math.sin(ea);
			pos_y = r * (1 - Math.cos(ea));
			rot = ea;
		} else {
			pos_x = tl - l/2;
			pos_y = 0;
			rot = 0;
		}
		
		// console.log(this.subTransforms[i].content, this.subTransforms[i].position);
		ta = ea;
		tl += etw + this.space;

		// move position to center
		pos_x += _center.x;
		pos_y += _center.y;

		this.subTransforms.push({
			content: this.content[i],
			position: {x: pos_x, y: pos_y},
			rotate: rot
		});
	}

	return this.subTransforms;
};

THREE.JX.JXText.prototype.update = function(force) {
	if(this.needUpdate === true || force === true) {
		this.updateSubTransform();
		this.needUpdate = false;
	}
};
// File:src/JXSprite.js

THREE.JX.JXSprite = function(image, color, strokeColor, strokeCap, strokeJoin, strokeSize, shadowColor, shadowDistance, shadowAngle, shadowBlur) {

	THREE.JX.JXNode.call(this);

	this.type = "JXSprite";

	// image
	this.useImage = true;
	this.image = image;

	this.useColor = false;
	this.color = color !== undefined ? color : new THREE.Color();

	// stroke
	this.useStroke = false;
	this.strokeColor = strokeColor !== undefined ? strokeColor : new THREE.Color(0x888888);
	this.strokeCap = strokeCap !== undefined ? strokeCap : "round"; // butt, round, square
	this.strokeJoin = strokeJoin !== undefined ? strokeJoin : "round"; // miter, round, 
	this.strokeSize = strokeSize !== undefined ? strokeSize : 1;

	// shadow
	this.useShadow = false;
	this.shadowColor = shadowColor !== undefined ? shadowColor : new THREE.Color(0x000000);
	this.shadowDistance = shadowDistance !== undefined ? shadowDistance : 3.0;
	this.shadowAngle = shadowAngle !== undefined ? shadowAngle : 100;
	this.shadowBlur = shadowBlur !== undefined ? shadowBlur : 2.0;

	this.width = 200;
	this.height = 200;
};

THREE.JX.JXSprite.prototype = Object.create(THREE.JX.JXNode.prototype);

THREE.JX.JXSprite.prototype.constructor = THREE.JX.JXSprite;

THREE.JX.JXSprite.prototype.clone = function(recursive) {
	return new this.constructor().copy(this, recursive);
};

THREE.JX.JXSprite.prototype.copy = function(source, recursive) {
	if(recursive === undefined) recursive = true;

	THREE.JX.JXNode.prototype.copy.call( this, source, recursive );

	this.useImage = source.useImage;
	this.image = source.image;

	this.useColor = source.useColor;
	this.color.copy(source.color);

	this.useStroke = source.useStroke;
	this.strokeColor.copy(source.strokeColor);
	this.strokeCap = source.strokeCap;
	this.strokeJoin = source.strokeJoin;
	this.strokeSize = source.strokeSize;

	this.useShadow = source.useShadow;
	this.shadowColor.copy(source.shadowColor);
	this.shadowDistance = source.shadowDistance;
	this.shadowAngle = source.shadowAngle;
	this.shadowBlur = source.shadowBlur;

	return this;
};

THREE.JX.JXSprite.prototype.computBoundingBox = function() {
	var w = this.width, 
		h = this.height,
		half_w = w / 2,
		half_h = h / 2;

	this.boundingBox.min.set(-half_w, -half_h);

	this.boundingBox.max.set(half_w, half_h);

	return this.boundingBox;
}

THREE.JX.JXSprite.prototype.update = function(force) {
	if(this.needUpdate === true || force === true) {
		this.computBoundingBox();
		this.needUpdate = false;
	}
};
// File:src/JXPolygonMask.js

THREE.JX.JXPolygonMask = function(vertices, strokeColor, strokeCap, strokeJoin, strokeSize) {

	THREE.JX.JXNode.call(this);

	this.type = "JXPolygonMask";

	// stroke
	this.useStroke = false;
	this.strokeColor = strokeColor !== undefined ? strokeColor : new THREE.Color(0x888888);
	this.strokeCap = strokeCap !== undefined ? strokeCap : "round"; // butt, round, square
	this.strokeJoin = strokeJoin !== undefined ? strokeJoin : "round"; // miter, round, 
	this.strokeSize = strokeSize !== undefined ? strokeSize : 1;

	this.vertices = vertices;
};


THREE.JX.JXPolygonMask.prototype = Object.create(THREE.JX.JXNode.prototype);

THREE.JX.JXPolygonMask.prototype.constructor = THREE.JX.JXPolygonMask;

THREE.JX.JXPolygonMask.prototype.computBoundingBox = function() {

	this.boundingBox.setFromPoints(this.vertices);

	return this.boundingBox;
}

THREE.JX.JXPolygonMask.prototype.update = function(force) {
	if(this.needUpdate === true || force === true) {
		this.computBoundingBox();
		this.needUpdate = false;
	}
};
// File:src/JXSpriteLoader.js

THREE.JX.JXSpriteLoader = function( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.JX.JXSpriteLoader.prototype = {

	constructor: THREE.JX.JXSpriteLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var sprite = new THREE.JX.JXSprite();

		var loader = new THREE.ImageLoader( this.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.load( url, function ( image ) {

			sprite.height *= (image.height / image.width);

			sprite.update(true);

			sprite.image = image;

			sprite.needsUpdate = true;

			if ( onLoad !== undefined ) {

				onLoad( sprite );

			}

		}, onProgress, onError );

		return sprite;

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	}

};

// File:src/JXTransformControls.js

THREE.JX.JXTransformControls = function(dom, renderer, mask) {
	this.object = undefined;

	this.mask = mask;

	var STATE = { NONE: - 1, ROTATE: 0, ZOOMLT: 1, ZOOMRT: 2, ZOOMLB: 3, ZOOMRB: 4, PAN: 5, DELETE: 6 };
	var state = STATE.NONE;

	var translateGizmo = new THREE.JX.JXSprite();
	translateGizmo.width = this.gizmoSize;
	translateGizmo.height = this.gizmoSize;
	translateGizmo.useStroke = true;
	translateGizmo.strokeColor.fromArray(this.defaultColor);
	translateGizmo.computBoundingBox();

	translateGizmo.state = STATE.PAN;

	var scaleGizmo = {
		"LT" : translateGizmo.clone(), // left top
		"RT" : translateGizmo.clone(), // right top
		"LB" : translateGizmo.clone(), // left bottom
		"RB" : translateGizmo.clone()	// right bottom
	};

	scaleGizmo["LT"].state = STATE.ZOOMLT;
	scaleGizmo["RT"].state = STATE.ZOOMRT;
	scaleGizmo["LB"].state = STATE.ZOOMLB;
	scaleGizmo["RB"].state = STATE.ZOOMRB;

	var rotationGizmo = translateGizmo.clone();
	rotationGizmo.state = STATE.ROTATE

	var deleteGizmo = translateGizmo.clone();
	deleteGizmo.state = STATE.DELETE;

	this.transformGizmo = {
		translateGizmo : translateGizmo,
		scaleGizmo : scaleGizmo,
		rotationGizmo : rotationGizmo,
		deleteGizmo : deleteGizmo
	};

	this.gizmo = new THREE.Group();
	this.gizmo.add(scaleGizmo["LT"]);
	this.gizmo.add(scaleGizmo["RT"]);
	this.gizmo.add(scaleGizmo["LB"]);
	this.gizmo.add(scaleGizmo["RB"]);
	this.gizmo.add(rotationGizmo);
	this.gizmo.add(deleteGizmo);
	this.gizmo.add(translateGizmo);

	this.gizmo.visible = false;// default hide

	var _min_scale = 0.01;

	var p = new THREE.Vector2(),
		oldPointer = new THREE.Vector2(),
		pointer = new THREE.Vector2(),
		oldScale = new THREE.Vector2(),
		oldRotation = 0.0,
		scale = new THREE.Vector2(),
		width = dom.clientWidth, 
		height = dom.clientHeight, 
		halfWidth = width/2, 
		halfHeight = height/2,
		scope = this;

	var getIntersect = function( point ) {
		for(var o=0; o<scope.gizmo.children.length; o++) {
			if(scope.gizmo.children[o].pointInJXNode(point)) {
				return scope.gizmo.children[o];
			}
		}

		return null;
	};


	var intersect;
	var onMouseDown = function(event) {
		
		if(!scope.gizmo.visible || !scope.object) return;

		p.fromArray(THREE.JX.getDeckardCoordinate(event.target, event.clientX, event.clientY));
		intersect = getIntersect(p);
		
		if(intersect) state = intersect.state;
		else state = STATE.NONE;
		
		if(state != STATE.NONE) {

			if(scope.mask && scope.mask.useStroke !== undefined) scope.mask.useStroke = true; // show mask strole
			
			// oldPointer.fromArray(THREE.JX.getMousePosition(event.target, event.clientX, event.clientY));
			oldPointer.set(event.clientX, event.clientY);
			oldScale.set(scope.object.scale.x, scope.object.scale.x);
			oldRotation = scope.object.rotation.z;

			intersect.strokeColor.fromArray(scope.activeColor);

			renderer.needUpdate = true;
			if(state != STATE.DELETE) {
				dom.addEventListener("mousemove", onMouseMove, false);
				dom.addEventListener("mouseout", onMouseUp, false);
				dom.addEventListener("dblclick", onMouseUp, false);
			}
			dom.addEventListener("mouseup", onMouseUp, false);
		}
	};

	var onMouseMove = function(event) {
		// pointer.fromArray(THREE.JX.getMousePosition(event.target, event.clientX, event.clientY));
		pointer.set(event.clientX, event.clientY);

		var moveX = pointer.x - oldPointer.x;

		var moveY = pointer.y - oldPointer.y;
		
		var _scale = 1;

		if(state === STATE.PAN) {

			scope.object.position.x += moveX * _scale;

			scope.object.position.y -= moveY * _scale;

			oldPointer.copy(pointer);

		} else if(state === STATE.ROTATE) {

			pointer.fromArray(THREE.JX.getDeckardCoordinate(event.target, event.clientX, event.clientY));

			scope.object.rotation.z = Math.atan2(pointer.y - scope.object.position.y, pointer.x - scope.object.position.x);

		} else if(state === STATE.ZOOMRT || state === STATE.ZOOMRB || state === STATE.ZOOMLT || state === STATE.ZOOMLB) {

			if(state === STATE.ZOOMRT || state === STATE.ZOOMRB) {
				_scale = 1 + moveX / 50;
			} else {
				_scale = 1 - moveX / 50;
			}

			scope.object.scale.x = oldScale.x * _scale;
			scope.object.scale.y = oldScale.y * _scale;

			if(scope.object.scale.x <= _min_scale) scope.object.scale.x = _min_scale;
			if(scope.object.scale.y <= _min_scale) scope.object.scale.y = _min_scale;
		} 

		scope.update(scope.object);
		renderer.needUpdate = true;
	};

	var onMouseUp = function(event) {
		if(state === STATE.DELETE) {
			scope.object.parent.remove(scope.object);

		}

		if(scope.mask && scope.mask.useStroke !== undefined) scope.mask.useStroke = false;

		intersect.strokeColor.fromArray(scope.defaultColor);
		renderer.needUpdate = true;
		dom.removeEventListener( 'mousemove', onMouseMove, false );
		dom.removeEventListener( 'mouseup', onMouseUp, false );
		dom.removeEventListener( 'mouseout', onMouseUp, false );
		dom.removeEventListener( 'dblclick', onMouseUp, false );
	};

	dom.addEventListener('mousedown', onMouseDown, false);

};

THREE.JX.JXTransformControls.prototype.constructor = THREE.JX.JXTransformControls;

THREE.JX.JXTransformControls.prototype.spaceSize = 5;

THREE.JX.JXTransformControls.prototype.gizmoSize = 10;

THREE.JX.JXTransformControls.prototype.defaultColor = [0.2, 0.8, 0.3];
THREE.JX.JXTransformControls.prototype.activeColor = [1.0, 0.734, 0.0];

THREE.JX.JXTransformControls.prototype.update = function(object) {
	this.object = object;

	if(!this.object) return;

	object.update(true);

	// translate gizmo control
	var _w = (object.boundingBox.max.x - object.boundingBox.min.x),
		_h = (object.boundingBox.max.y - object.boundingBox.min.y);
	this.transformGizmo.translateGizmo.width = _w * object.scale.x + this.spaceSize * 2;
	this.transformGizmo.translateGizmo.height = _h * object.scale.y + this.spaceSize * 2;

	this.transformGizmo.translateGizmo.update(true);

	var bbx = this.transformGizmo.translateGizmo.boundingBox;

	// delete gizmo control
	this.transformGizmo.deleteGizmo.position.set(bbx.min.x - this.gizmoSize, (bbx.max.y + bbx.min.y) / 2, 0);

	// rotation gizmo control
	this.transformGizmo.rotationGizmo.position.set(bbx.max.x + this.gizmoSize, (bbx.max.y + bbx.min.y) / 2, 0);

	// scale gizmo control
	this.transformGizmo.scaleGizmo["LT"].position.set(bbx.min.x, bbx.max.y, 0);
	this.transformGizmo.scaleGizmo["RT"].position.set(bbx.max.x, bbx.max.y, 0);
	this.transformGizmo.scaleGizmo["LB"].position.set(bbx.min.x, bbx.min.y, 0);
	this.transformGizmo.scaleGizmo["RB"].position.set(bbx.max.x, bbx.min.y, 0);

	// this.gizmo tanslate and rotation
	this.gizmo.position.copy(object.position);
	this.gizmo.rotation.copy(object.rotation);

}
// File:src/JXShirtViewport2D.js

var Viewport2D = function(inCanvas, shapeGroup, mask) {
	var canvas = inCanvas;

	var width = canvas.clientWidth, height = canvas.clientHeight, halfWidth = width/2, halfHeight = height/2;

	var scene = new THREE.Scene();

	var camera = new THREE.OrthographicCamera(-width/2, width/2, -height/2, height/2, 0.1, 1000);

	var renderer = new THREE.JX.JXCanvasRenderer({canvas: canvas, alpha: true});

	// var shapeGroup = new THREE.Group();


	this.onIntersect = undefined;
	this.onNotIntersect = undefined;

	this.current_object = undefined;

	var i, scope = this;

	// for(i=0; i<objects.length; i++) shapeGroup.add(objects[i]);
	
	// gizmos
	var gizmo = new THREE.JX.JXTransformControls(canvas, renderer, mask);
	var gizmoGroup = new THREE.Group();
	gizmoGroup.add(gizmo.gizmo);

	scene.add(shapeGroup);

	scene.add(mask);

	scene.add(gizmoGroup);

	this.setCurrent = function(object) {
		if(this.current_object == object) return;

		this.current_object = object;

		if(this.current_object) {
			if(!gizmo.gizmo.visible) gizmo.gizmo.visible = true;

			if(scope.onIntersect) scope.onIntersect(scope.current_object);

		} else {
			if(gizmo.gizmo.visible) gizmo.gizmo.visible = false;

			if(scope.onNotIntersect) scope.onNotIntersect();

		}

		this.update();
	};

	this.getGizmo = function() {
		return gizmo;
	};

	this.update = function() {
		gizmo.update(this.current_object);
		renderer.needUpdate = true;
	};

	// setCurrent(text);

	var render = function() {
		scene.updateMatrixWorld();

		renderer.render(scene, camera);
	};

	var renderLoop = function() {
		requestAnimationFrame(renderLoop);
		render();
	};

	renderLoop();

	var onDownPosition = new THREE.Vector2();
	var onUpPosition = new THREE.Vector2();
	var getIntersect = function( point, objects ) {
		for(var i=objects.length-1; i>=0; i--) {
			if(objects[i].pointInJXNode(point)) {
				// console.log(objects[i]);
				return objects[i];
			}
		}

		return undefined;
	};

	var onMouseDown = function(event) {

		// onDownPosition.fromArray(THREE.JX.getMousePosition(event.target, event.clientX, event.clientY));
		onDownPosition.set(event.clientX, event.clientY);

		canvas.addEventListener('mouseup', onMouseUp, false);
	};

	var onMouseUp = function(event) {
		// onUpPosition.fromArray(THREE.JX.getMousePosition(event.target, event.clientX, event.clientY));
		onUpPosition.set(event.clientX, event.clientY);

		if ( onDownPosition.distanceTo( onUpPosition ) == 0 ) {
			onUpPosition.fromArray(THREE.JX.getDeckardCoordinate(event.target, event.clientX, event.clientY));
			scope.setCurrent(getIntersect(onUpPosition, shapeGroup.children));
		}

		canvas.removeEventListener( 'mouseup', onMouseUp, false );
	};

	canvas.addEventListener('mousedown', onMouseDown, false);
};
// File:src/JXCanvasRenderer.js

THREE.JX.JXCanvasRenderer = function(parameters) {
    console.log( 'THREE.JX.JXCanvasRenderer', THREE.JX.version );

    parameters = parameters || {};

    var _canvas = (parameters.canvas !== undefined ? parameters.canvas : document.createElement("canvas"));

    var _canvasWidth = _canvas.width,
        _canvasHeight = _canvas.height,
        _canvasWidthHalf = Math.floor( _canvasWidth / 2 ),
        _canvasHeightHalf = Math.floor( _canvasHeight / 2 ),

        _viewportX = 0,
        _viewportY = 0,
        _viewportWidth = _canvasWidth,
        _viewportHeight = _canvasHeight,

        pixelRatio = 1,

        _context = _canvas.getContext( '2d', {
            alpha: parameters.alpha === true
        } ),
        _clearColor = new THREE.Color( 0x000000 ),
        _clearAlpha = parameters.alpha === true ? 0 : 1,

        _contextGlobalAlpha = 1,
        _contextGlobalCompositeOperation = 0,
        _contextStrokeStyle = null,
        _contextFillStyle = null,
        _contextLineWidth = null,
        _contextLineCap = null,
        _contextLineJoin = null,
        _contextLineDash = [];

    var self = this;

    this.needUpdate = true;

    this.init = function() {
        _clearColor = new THREE.Color( 0x000000 ),
        _clearAlpha = parameters.alpha === true ? 0 : 1,

        _contextGlobalAlpha = 1,
        _contextGlobalCompositeOperation = 0,
        _contextStrokeStyle = null,
        _contextFillStyle = null,
        _contextLineWidth = null,
        _contextLineCap = null,
        _contextLineJoin = null,
        _contextLineDash = [];
    };

    this.clear = function() {
        this.init();
        _context.clearRect(_viewportX, _viewportY, _viewportWidth, _viewportHeight);
    };

    var setTransform = function(object, isScale, w, h) {
        w = w || 0;
        h = h || 0;

        isScale = !!isScale

        var m4;
        if(!isScale) {
            var _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3();
            object.matrixWorld.decompose(_p, _q, _s);
            _s.set(1, 1, 1);
            m4 = new THREE.Matrix4();
            m4.compose(_p, _q, _s);
        } else {
            m4 = object.matrixWorld.clone();
        }

        // reversed canvas rotate
        m4.elements[1] = -m4.elements[1];
        m4.elements[4] = -m4.elements[4];

        var a = m4.elements[0],
            b = m4.elements[1],
            c = m4.elements[4],
            d = m4.elements[5],

            e = m4.elements[12] + _canvasWidthHalf 
                - (w/2 * Math.cos(object.rotation.z) * object.scale.x
                + h/2 * Math.sin(object.rotation.z) * object.scale.y),
            f = _canvasHeightHalf - m4.elements[13]
                - (w/2 * Math.sin(object.rotation.z) * object.scale.x 
                - h/2 * Math.cos(object.rotation.z) * object.scale.y);
        // console.log(a, b, c, d, e, f);
        _context.setTransform(a, b, c, d, e, f);
    };

    var renderHepler = function(object, heplerOffset, smallSize) {
        heplerOffset = heplerOffset || 5;

        var heplerPosition_x = object.boundingBox.min.x * object.scale.x - heplerOffset,
            heplerPosition_y = -object.boundingBox.max.y * object.scale.y - heplerOffset,
            helperWidth = object.boundingBox.max.x * 2 * object.scale.x + heplerOffset * 2,
            helperHeight = (object.boundingBox.max.y - object.boundingBox.min.y) * object.scale.y + heplerOffset * 2;

        smallSize = smallSize || 10;
        setStrokeStyle("#669911");
        _context.strokeRect(heplerPosition_x-smallSize, heplerPosition_y-smallSize, smallSize, smallSize);
        _context.strokeRect(heplerPosition_x+helperWidth, heplerPosition_y-smallSize, smallSize, smallSize);
        _context.strokeRect(heplerPosition_x-smallSize, heplerPosition_y+helperHeight, smallSize, smallSize);
        _context.strokeRect(heplerPosition_x+helperWidth, heplerPosition_y+helperHeight, smallSize, smallSize);
        _context.strokeRect(heplerPosition_x, heplerPosition_y, helperWidth, helperHeight);
    };

    var renderShadow = function(object) {
        _context.shadowColor = object.shadowColor.getStyle();
        _context.shadowOffsetX = object.shadowDistance * -Math.cos(object.shadowAngle * Math.PI / 180);
        _context.shadowOffsetY = object.shadowDistance * Math.sin(object.shadowAngle * Math.PI / 180);
        _context.shadowBlur = object.shadowBlur;
    };

    var disableShadow = function() {
        _context.shadowColor = "rgb(0, 0 ,0, 0)";
        _context.shadowOffsetX = 0;  
        _context.shadowOffsetY = 0;
        _context.shadowBlur = 0;
    };

    var setStroke = function(object) {
        setLineWidth(object.strokeSize); 
        setStrokeStyle(object.strokeColor.getStyle());
        setLineCap(object.strokeCap);
        setLineJoin(object.strokeJoin);
    };

    // render JXText
    var renderText = function(text) {
        text.update();

        _context.font= text.size + "pt " + text.font;

        // console.log(text.boundingBox.min.y, text.boundingBox.max.y);
        setTransform(text, true);
        _context.textBaseline="middle";
        for(var i=0; i<text.subTransforms.length; i++) {
            _context.save();
            _context.translate(text.subTransforms[i].position.x, text.subTransforms[i].position.y);
            // console.log(text.subTransforms[i].rotate);
            _context.rotate(text.subTransforms[i].rotate);
            // _context.scale(text.scale.x, text.scale.y);

            if(text.useShadow) renderShadow(text);

            if(text.useStroke) {
                setStroke(text);
                _context.strokeText(text.subTransforms[i].content, 0, 0);
                disableShadow();
            }

            if(text.useColor) {
                setFillStyle(text.color.getStyle());
                _context.fillText(text.subTransforms[i].content, 0, 0);
                disableShadow();
            }
            _context.restore();
            self.init();
        }
    };

    var renderSprite = function(sprite) {
        sprite.update();

        setTransform(sprite, true);
        _context.translate(-sprite.width/2, -sprite.height/2);

        if(sprite.useShadow) renderShadow(sprite);

        if(sprite.useImage && sprite.image) {
            var sprite_width = sprite.width * sprite.scale.x;
            if(sprite.image.width > sprite_width) {
                // 图片抗锯齿处理
                var oc = document.createElement('canvas'),
                    octx = oc.getContext('2d');
                var steps = Math.ceil(Math.log(sprite.image.width / sprite_width ) / Math.log(2));

                oc.width = sprite.image.width * 0.5;
                oc.height =  sprite.image.height * 0.5;

                octx.drawImage(sprite.image, 0, 0, oc.width , oc.height);

                var _pow, _w, _h, d_w = oc.width, d_h = oc.height;
                for(var s=1; s<steps; s++) {
                    _pow = Math.pow(2, s);
                    _w = sprite.image.width / _pow;
                    _h = sprite.image.height / _pow;
                    octx.drawImage(oc, 0, 0, d_w , d_h, 0, 0, _w, _h);
                    d_w = _w;
                    d_h = _h;
                }

                _context.drawImage(oc, 0, 0, d_w, d_h, 0, 0, sprite.width, sprite.height);
            } else {
                _context.drawImage(oc, 0, 0, sprite.width, sprite.height);
            }

            disableShadow();
        }

        if(sprite.useColor) {
            setFillStyle(sprite.color.getStyle());
            _context.fillRect(0, 0, sprite.width, sprite.height);

            disableShadow();
        }

        if(sprite.useStroke) {
            setStroke(sprite);
            _context.strokeRect(0, 0, sprite.width, sprite.height);
            disableShadow();
        }
    };

    var toCanvasCoord = function(v2) {
        var result = {x: 0, y: 0};
        result.x = v2.x + _canvasWidthHalf;
        result.y = v2.y + _canvasHeightHalf;

        return result;
    };

    var renderMask = function(mask) {
        var l=mask.vertices.length;

        if(l < 3) return;


        setTransform(mask, true);

        _context.beginPath();

        var s_p = mask.vertices[0], c_p;

        _context.moveTo(s_p.x, s_p.y);

        for(var i=1; i<l; i++) {
            c_p = mask.vertices[i];

            _context.lineTo(c_p.x, c_p.y);
        }

        _context.lineTo(s_p.x, s_p.y);

        if(mask.useStroke) {
            setStroke(mask);
            _context.stroke();
        }

        _context.globalCompositeOperation="destination-in";

        _context.fill();

        _context.globalCompositeOperation="source-over";
    };

    // render object recursive
    var renderObject = function(object) {
        if(object.visible) {
            if(object instanceof THREE.JX.JXText) {
                renderText(object);
            } else if(object instanceof THREE.JX.JXSprite) {
                renderSprite(object);
            } else if(object instanceof THREE.JX.JXPolygonMask) {
                renderMask(object);
            }

            for(var i=0; i<object.children.length; i++) {
                renderObject(object.children[i]);
            }
        }
    };

    // render
    this.render = function(scene, camera) {
        if(this.needUpdate) {
            this.clear();
            _context.save();
            // // create grid
            // _context.beginPath();
            // setStrokeStyle("#669911");
            // _context.moveTo(0, _canvasHeightHalf);
            // _context.lineTo(_canvasWidth, _canvasHeightHalf);
            // _context.moveTo(_canvasWidthHalf, 0);
            // _context.lineTo(_canvasWidthHalf, _canvasHeight);
            // _context.stroke();
            renderObject(scene);

            _context.restore();

            this.needUpdate = false;
        }
    };

    function setLineWidth( value ) {

        if ( _contextLineWidth !== value ) {

            _context.lineWidth = value;
            _contextLineWidth = value;

        }

    }

    function setLineCap( value ) {

        // "butt", "round", "square"

        if ( _contextLineCap !== value ) {

            _context.lineCap = value;
            _contextLineCap = value;

        }

    }

    function setLineJoin( value ) {

        // "round", "bevel", "miter"

        if ( _contextLineJoin !== value ) {

            _context.lineJoin = value;
            _contextLineJoin = value;

        }

    }

    function setStrokeStyle( value ) {

        if ( _contextStrokeStyle !== value ) {

            _context.strokeStyle = value;
            _contextStrokeStyle = value;

        }

    }

    function setFillStyle( value ) {

        if ( _contextFillStyle !== value ) {

            _context.fillStyle = value;
            _contextFillStyle = value;

        }

    }

    function setLineDash( value ) {

        if ( _contextLineDash.length !== value.length ) {

            _context.setLineDash( value );
            _contextLineDash = value;

        }

    }
}
