import { SET_GENERAL_PANEL_PROPS, SET_GENERAL_PANEL_VISIBLE } from './actionTypes';

export function setGeneralPanelProps(props) {
  return {
    type: SET_GENERAL_PANEL_PROPS,
    props: props
  };
}

export function setGeneralPanelVisible(visible) {
  return {
    type: SET_GENERAL_PANEL_VISIBLE,
    visible: visible
  };
}
