import { 
  SET_TEXT_PANEL_PROPS,  
  SET_TEXT_PANEL_VISIBLE 
} from './actionTypes';

export function setTextPanelProps(props) {
  return {
    type: SET_TEXT_PANEL_PROPS,
    props: props
  };
}

export function setTextPanelVisible(visible) {
  return {
    type: SET_TEXT_PANEL_VISIBLE,
    visible: visible
  };
}
