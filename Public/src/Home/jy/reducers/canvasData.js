import { 
	ADD_CANVAS, 
	SET_CANVAS_ACTIVE_INDEX,
	ADD_NODE_DATA,
	ADD_NODE, 
	REMOVE_NODE, 
	SET_NODE, 
	SET_NODE_ACTIVE_INDEX, 
	MOVE_NODE
} from '../actions/actionTypes';

const initState = {
	activeIndex: 0,
	items: [], // {bg: 'xxx.jpg', genius: 'xxx.jpg', clipTo : function()}, ...
	nodeData: [] // {activeIndex: -1, items: []}, ...
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
		case ADD_NODE_DATA:
			return (() => {
				let newState = copyState(state);
				newState.nodeData.push(action.data);
				return newState;
			})();
		case ADD_NODE:
			return (() => {
				let newState = copyState(state);
				let currentNodeData = newState.nodeData[newState.activeIndex];
				currentNodeData.items.push(action.data);
				return newState;
			})();
		case REMOVE_NODE:
			return (() => {
				let newState = copyState(state);
				let dindex = action.index;
				let currentNodeData = newState.nodeData[newState.activeIndex];
				if(dindex > -1 && dindex <= currentNodeData.items.length) {
					currentNodeData.items.splice(dindex, 1);
					if(currentNodeData.activeIndex < 0 || (currentNodeData.activeIndex == 0 && dindex == 0)) {
						currentNodeData.activeIndex = -1;
					} else if(currentNodeData.activeIndex > dindex) {
						currentNodeData.activeIndex -= 1;
					}
				}
				return newState;
			})();
		case SET_NODE:
			return (() => {
				let newState = copyState(state);
				let currentNodeData = newState.nodeData[newState.activeIndex];
				Object.assign(currentNodeData.items[action.index], action.data);
				return newState;
			})();
		case SET_NODE_ACTIVE_INDEX:
			return (() => {
				let newState = copyState(state);
				let currentNodeData = newState.nodeData[newState.activeIndex];
				currentNodeData.activeIndex = action.index;
				return newState;
			})();
		case MOVE_NODE:
			return (() => {
				let newState = copyState(state);
				let currentNodeData = newState.nodeData[newState.activeIndex];
				currentNodeData.items.splice(action.to, 0, currentNodeData.items.splice(action.from, 1)[0]);
				if(currentNodeData.activeIndex !== -1) {
					if(action.from === currentNodeData.activeIndex) {
						currentNodeData.activeIndex = action.to;
					} else {
						currentNodeData.activeIndex = currentNodeData.items.findIndex(
							(item, index) => item.id == state.items[currentNodeData.activeIndex]['id']
						);
						//console.log(currentNodeData.activeIndex);
					}
				}
				return newState;
			})();
		default:
			return state;
	}
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}