/**
 * 图片面板数据控制
 */

import { SET_IMG_PANEL_PROPS, SET_IMG_PANEL_VISIBLE } from '../actions/actionTypes';

const initState = {
  visible: false,
  props: {}
};

export function imgPanelData(state = initState, action) {
  switch (action.type) {
    case SET_IMG_PANEL_PROPS:
      return {
        visible: state.visible,
        props: action.props
      };;
    case SET_IMG_PANEL_VISIBLE:
      return {
        visible: action.visible,
        props: Object.assign({}, state.props)
      };
    default:
      return state;
  }
}
