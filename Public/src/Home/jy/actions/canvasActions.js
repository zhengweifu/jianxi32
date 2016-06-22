import { ADD_CANVAS, SET_CANVAS_ACTIVE_INDEX } from './actionTypes';


export function addCanvas(data) { // data is {img: 'xxx.jpg', genius: 'xxx.jpg' clipSvg: 'xxx.svg'}
	return {
		type: ADD_CANVAS,
		data: data
	};
}

export function setCanvasActiveIndex(index) {
	return {
		type: SET_CANVAS_ACTIVE_INDEX,
		data: index
	};
}

