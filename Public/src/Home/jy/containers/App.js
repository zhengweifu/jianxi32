import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

import NodePanel from './NodePanel';

import ProductNumber from './ProductNumber';

import { Popover, RaisedButton, Menu, MenuItem, SvgIcon } from 'material-ui';

import ColorGroup from '../components/ColorGroup';

import ProductHeaderPanel from './ProductHeaderPanel';

import CreateNodePanel  from './CreateNodePanel';

import BuyerShowPanel from './BuyerShowPanel';

import GeneralPropertiesPanel from './GeneralPropertiesPanel';

import TextPropertiesPanel from './TextPropertiesPanel';

import ColorSchemesPanel from './ColorSchemesPanel';

// console.log(PatternLibrariesPanel.getWrappedInstance());

export default class App extends React.Component {


  render() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <div style={{
          float: 'left',
          width: this.props.canvasWidth,
          height: this.props.canvasHeight}}>
          <canvas width={this.props.canvasWidth} height={this.props.canvasHeight} style={{border: '1px solid #ccc'}}></canvas>
          <BuyerShowPanel items={[1, 2, 3, 4, 5, 6]}/>
        </div>
        <div style={{
          float: 'left',
          marginLeft: 15,
          width: this.props.controllerWidth}}>
          <ProductHeaderPanel bgColor={this.props.tangerine} productDescribtion='AIR100000000圆领 女款'/>

          <ProductNumber />

          <CreateNodePanel bgColor={this.props.tangerine} fbColor={this.props.grayeee}/>

          <GeneralPropertiesPanel />

          <TextPropertiesPanel />

          <ColorSchemesPanel />

          <NodePanel />
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

App.defaultProps = {
  tangerine: '#ff8d5c',
  grayeee: '#eee',
  canvasWidth: 600,
  canvasHeight: 600,
  controllerWidth: 400,
  controllerHeight: 800
};

App.propTypes = {
  tangerine: React.PropTypes.string,
  grayeee: React.PropTypes.string,
  canvasWidth: React.PropTypes.number,
  canvasHeight: React.PropTypes.number,
  controllerWidth:React.PropTypes.number,
  controllerHeight: React.PropTypes.number
};

// function mapStateToProps(state) {
//   return {
//     patternOpen: state.patternData.open
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     setPatternOpen
//   }, dispatch);
// }
