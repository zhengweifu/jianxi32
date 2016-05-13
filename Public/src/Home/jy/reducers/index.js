import { productData } from './productData';

import { patternData } from './patternData';

import { nodeData } from './nodeData';

import { colorSchemeData } from './colorSchemeData';

import { textColorPanelData } from './textColorPanelData';

import { textStrokePanelData } from './textStrokePanelData';

import { combineReducers } from 'redux';

export default combineReducers({
  productData,
  patternData,
  nodeData,
  colorSchemeData,
  textColorPanelData,
  textStrokePanelData
});
