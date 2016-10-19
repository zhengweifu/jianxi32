import { productData } from './productData';

import { patternData } from './patternData';

// import { nodeData } from './nodeData';

import { colorSchemeData } from './colorSchemeData';

import { textColorPanelData } from './textColorPanelData';

import { textStrokePanelData } from './textStrokePanelData';

import { textShadowPanelData } from './textShadowPanelData';

import { textPanelData } from './textPanelData';

import { imgPanelData } from './imgPanelData';

import { generalPanelData } from './generalPanelData';

import { canvasData } from './canvasData';

import { combineReducers } from 'redux';

export default combineReducers({
  productData,
  patternData,
  // nodeData,
  colorSchemeData,
  textColorPanelData,
  textStrokePanelData,
  textShadowPanelData,
  textPanelData,
  imgPanelData,
  generalPanelData,
  canvasData
});
