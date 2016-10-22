import { 
	ADD_CANVAS,
  SET_CANVAS_IMAGE,
  REMOVE_CANVAS,
	SET_CANVAS_ACTIVE_INDEX,
	ADD_NODE_DATA,
	ADD_NODE, 
	REMOVE_NODE, 
	SET_NODE, 
	SET_NODE_ACTIVE_INDEX, 
	MOVE_NODE
} from '../actions/actionTypes';


export function addCanvas(data) { // data is {img: 'xxx.jpg', genius: 'xxx.jpg' clipSvg: 'xxx.svg'}
	return {
		type: ADD_CANVAS,
		data: data
	};
}

export function setCanvasImage(index, image) {
  return {
    type: SET_CANVAS_IMAGE,
    index: index,
    image: image
  };
}

export function removeCanvas(index) {
  return {
    type: REMOVE_CANVAS,
    index: index
  };
} 

export function setCanvasActiveIndex(index) {
	return {
		type: SET_CANVAS_ACTIVE_INDEX,
		data: index
	};
}

export function addNodeData() {
  return {
    type: ADD_NODE_DATA,
    data: {
    	activeIndex: -1,
    	items: []
    }
  };
}

export function addNode(data) {
  return {
    type: ADD_NODE,
    data: data
  };
}

export function setNode(index, data) {
  return {
    type: SET_NODE,
    index: index,
    data: data
  };
}

export function setNodeActiveIndex(index) {
  return {
    type: SET_NODE_ACTIVE_INDEX,
    index: index
  };
}

export function removeNode(index) {
  return {
    type: REMOVE_NODE,
    index: index
  };
}

export function moveNode(from, to) {
  return {
    type: MOVE_NODE,
    from: from,
    to: to
  };
}

