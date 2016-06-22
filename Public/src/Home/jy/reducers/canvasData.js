import { ADD_CANVAS, SET_CANVAS_ACTIVE_INDEX } from '../actions/actionTypes';

const initState = {
	activeIndex: -1,
	items: [] // {bg: 'xxx.jpg', genius: 'xxx.jpg', clipTo : function()}
};

export function canvasData(state = initState, action) {
	switch (action.type) {
		case ADD_CANVAS:
			return (() => {
				let newState = copyState(state);
				newState.items.push(action.data);
				return newState;
			})();
		case SET_CANVAS_ACTIVE_INDEX:
			return (() => {
				let newState = copyState(state);
				newState.activeIndex = action.data;
				return newState;
			})();
		default:
			return state;
	}
}

function copyState(state) {
  return {
    activeIndex : state.activeIndex,
    items: state.items.map((item) => {
      return Object.assign({}, item);
    })
  };
}