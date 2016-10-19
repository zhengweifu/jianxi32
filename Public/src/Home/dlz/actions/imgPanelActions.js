import { SET_IMG_PANEL_PROPS, SET_IMG_PANEL_VISIBLE } from './actionTypes';

export function setImgPanelProps(props) {
  return {
    type: SET_IMG_PANEL_PROPS,
    props: props
  };
}

export function setImgPanelVisible(visible) {
  return {
    type: SET_IMG_PANEL_VISIBLE,
    visible: visible
  };
}
