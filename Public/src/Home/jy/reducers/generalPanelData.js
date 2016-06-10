/**
 * 图片面板数据控制
 */

import { SET_GENERAL_PANEL_PROPS, SET_GENERAL_PANEL_VISIBLE } from '../actions/actionTypes';

const initState = {
  visible: false,
  props: {}
};

export function generalPanelData(state = initState, action) {
  switch (action.type) {
    case SET_GENERAL_PANEL_PROPS:
      return {
        visible: state.visible,
        props: action.props
      };;
    case SET_GENERAL_PANEL_VISIBLE:
      return {
        visible: action.visible,
        props: Object.assign({}, state.props)
      };
    default:
      return state;
  }
}
