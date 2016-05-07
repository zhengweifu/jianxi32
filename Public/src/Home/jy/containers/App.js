import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

import ButtonMenu from '../components/ButtonMenu';

import NodePanel from './NodePanel';

import ProductNumber from './ProductNumber';

import { Popover, RaisedButton, Menu, MenuItem, SvgIcon } from 'material-ui';

import { ImageDehaze } from 'material-ui/svg-icons/index';

import ColorGroup from '../components/ColorGroup';

import ProductPanel from './ProductPanel';

import PatternLibrariesPanel from './PatternLibrariesPanel';

import BuyerShowPanel from './BuyerShowPanel';

// console.log(PatternLibrariesPanel.getWrappedInstance());

export default class App extends React.Component {
  onHandleItemClick(event, index) {
    switch (index) {
      case 0:
        console.log('This is 0.');
        break;
      case 1:
        console.log('This is 1.');
        this.refs.patternLibrariesPanel.getWrappedInstance().setState({open: true});
        break;
      default:
        console.log('No index.');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <div style={{
          float: 'left',
          width: 600,
          height: 600}}>
          <canvas width={600} height={600} style={{border: '1px solid #ccc'}}></canvas>
          <BuyerShowPanel items={[1, 2, 3, 4, 5, 6]}/>
        </div>
        <div style={{
          float: 'left',
          marginLeft: 10,
          width: 400}}>
          <div style={{position: 'relative'}}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0
            }}>
              <RaisedButton
              label='选择产品'
              onTouchTap={e => {
                this.refs.productPanel.getWrappedInstance().setState({open: true});
              }}
              icon={<ImageDehaze />}
              backgroundColor={this.props.tangerine}
              labelColor='#eee'/>
              <ProductPanel bgColor='#ff8d5c' color='#eee' ref='productPanel' />
            </div>
            <div style={{
              paddingLeft: 130,
              height: 36,
              borderBottom: `2px solid ${this.props.tangerine}`}}>
              <div style={{
                paddingTop: 10,
                fontSize: 18
              }}>AIR100000000圆领 女款</div>
            </div>
          </div>

          <ProductNumber />
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

// <div>
//   <InputNumberSliderGroup defaultValue={0} max={360} min={-360} type='INT' label='位置'/>
//   <InputNumberSliderGroup defaultValue={0.5} max={10} min={0} type='NUMBER' label='旋转'/>
//   <ButtonMenu
//     name='选择图片'
//     width={200}
//     onItemClick={this.onHandleItemClick.bind(this)}
//     items={[
//       '本地上传',
//       '剪切画'
//     ]}/>
//   <ColorGroup
//     activeIndex={1}
//     ref='colorgroup'
//     items={[
//       '#ff0',
//       '#f00',
//       '#f0f',
//       '#fe0',
//       '#f10',
//       '#f4f',
//       '#f60',
//       '#830',
//       '#f8f',
//       '#f80',
//       '#f04',
//       '#f02',
//       '#3f0',
//       '#500',
//       '#70f'
//     ]}/>
//
//   <ColorGroup
//     activeIndex={3}
//     ref='scolorgroup'
//     items={[
//       '#ff0',
//       '#f00',
//       '#f0f',
//       '#fe0',
//       '#f10',
//       '#f4f',
//       '#f60',
//       '#830',
//       '#f8f',
//       '#f80',
//       '#f04',
//       '#f02',
//       '#3f0',
//       '#500',
//       '#70f'
//     ]}
//     onClick={(event, color) => {
//       console.log(color);
//     }}
//     />
//
//   <RaisedButton label='change color' onTouchTap={(event) => {
//     this.refs.colorgroup.setState({currentActiveIndex: 3});
//     this.refs.scolorgroup.setState({currentActiveIndex: 8});
//   }}/>
//
//   <RaisedButton
//     label='选择产品'
//     onTouchTap={e => {
//       this.refs.productPanel.getWrappedInstance().setState({open: true});
//     }}
//     icon={
//       <SvgIcon>
//         <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" data-reactid=".0.0.0.0.1:2:$/=10.0"></path>
//       </SvgIcon>
//     }
//     backgroundColor='#ff8d5c'
//     labelColor='#eee'/>
//
//   <ProductPanel bgColor='#ff8d5c' color='#eee' ref='productPanel' />
//
//   <PatternLibrariesPanel bgColor='#ff8d5c' color='#eee' ref='patternLibrariesPanel' />
//
//   <NodePanel />
//   <ProductNumber />
// </div>

App.defaultProps = {
  tangerine: '#ff8d5c'
};

App.propTypes = {
  tangerine: React.PropTypes.string
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
