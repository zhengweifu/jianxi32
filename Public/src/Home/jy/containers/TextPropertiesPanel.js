import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom';

import PopupPanel from '../components/PopupPanel';

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

import TextColorPanel from './TextColorPanel';

import TextStrokePanel from './TextStrokePanel';

import TextShadowPanel from './TextShadowPanel';

import ColorItem from '../components/ColorItem';

import { GridList, RaisedButton, TextField, SelectField, MenuItem } from 'material-ui';

import ReactGridLayout from 'react-grid-layout';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { setTextColorActiveIndex, addTextColor, setTextColorPanelVisible,
         setTextStrokeActiveIndex, addTextStroke, setTextStrokePanelVisible, setTextStrokeSize,
         setTextShadowActiveIndex, addTextShadow, setTextShadowPanelVisible, setTextShadowSize} from '../actions';

class TextPropertiesPanel extends Component {

  renderColorPanel() {
    let currentTextColorString = this.props.activeColorIndex >= 0 ? this.props.colorItems[this.props.activeColorIndex] : '#FFFFFF';
    return <div key='1' style={{textAlign: 'center'}}>
      <div style={{marginBottom: 10}}>颜色</div>
      <ColorItem defaultBgColor={currentTextColorString}
        ref={ref => {
          this.textColorItem = ref;
          this.colorPanelAnchorEl = ReactDOM.findDOMNode(ref);
        }}
        active={this.props.colorPanelVisible}
        onClick={(e, color) => {
          let index;
          if(color !== 'null') {
            index = this.props.colorItems.findIndex(item => item === color);
            if(index === -1) {
              this.props.addTextColor(color);
              index = this.props.colorItems.length - 1;
            }
          } else {
            index = this.props.colorItems.length;
          }

          this.props.setTextColorActiveIndex(index);

          this.props.setTextColorPanelVisible(!this.props.colorPanelVisible);


          if(this.colorPanelAnchorEl) {
            this.textColorPanel.setState({anchorEl: this.colorPanelAnchorEl});
          }
        }}/>
      <TextColorPanel
        onClick={(e, color, index) => {
          this.props.setTextColorActiveIndex(index);
        }}
        ref={ref => this.textColorPanel = ref}
        anchorEl = {this.colorPanelAnchorEl}
        open={this.props.colorPanelVisible}
        activeIndex={this.props.activeColorIndex}
        onRequestClose={e => {
          this.props.setTextColorPanelVisible(false);
        }}
        items={this.props.colorItems}/>
    </div>;
  }

  renderStrokePanel() {
    let currentTextStrokeColorString = this.props.activeStrokeColorIndex >= 0 ? this.props.strokeColorItems[this.props.activeStrokeColorIndex] : '#FFFFFF';
    return <div key='2' style={{textAlign: 'center'}}>
      <div style={{marginBottom: 10}}>描边</div>
      <ColorItem defaultBgColor={currentTextStrokeColorString}
      ref={ref => {
        this.textStrokeColorItem = ref;
        this.strokePanelAnchorEl = ReactDOM.findDOMNode(ref);
      }}
      active={this.props.strokePanelVisible}
      onClick={(e, color) => {
        let index;
        if(color !== 'null') {
          index = this.props.strokeColorItems.findIndex(item => item === color);
          if(index === -1) {
            this.props.addTextStroke(color);
            index = this.props.strokeColorItems.length - 1;
          }
        } else {
          index = this.props.strokeColorItems.length;
        }

        this.props.setTextStrokeActiveIndex(index);

        this.props.setTextStrokePanelVisible(!this.props.strokePanelVisible);

        if(this.strokePanelAnchorEl) {
          this.textStrokePanel.setState({anchorEl: this.strokePanelAnchorEl});
        }
      }}/>
      <TextStrokePanel
        onClick={(e, color, index) => {
          this.props.setTextStrokeActiveIndex(index);
        }}
        ref={ref => this.textStrokePanel = ref}
        anchorEl = {this.strokePanelAnchorEl}
        open={this.props.strokePanelVisible}
        activeIndex={this.props.activeStrokeColorIndex}
        onRequestClose={e => {
          this.props.setTextStrokePanelVisible(false);
        }}
        size={this.props.strokeSize}
        items={this.props.strokeColorItems}/>
    </div>;
  }

  renderShadowPanel() {
    let currentTextShadowColorString = this.props.activeShadowColorIndex >= 0 ? this.props.shadowColorItems[this.props.activeShadowColorIndex] : '#000';
    return <div key='3' style={{textAlign: 'center'}}>
      <div style={{marginBottom: 10}}>阴影</div>
      <ColorItem defaultBgColor={currentTextShadowColorString}
      ref={ref => {
        this.textShadowColorItem = ref;
        this.shadowPanelAnchorEl = ReactDOM.findDOMNode(ref);
      }}
      active={this.props.shadowPanelVisible}
      onClick={(e, color) => {
        let index;
        if(color !== 'null') {
          index = this.props.shadowColorItems.findIndex(item => item === color);
          console.log(index);
          if(index === -1) {
            this.props.addTextShadow(color);
            index = this.props.shadowColorItems.length - 1;
          }
        } else {
          index = this.props.shadowColorItems.length;
        }

        this.props.setTextShadowActiveIndex(index);

        this.props.setTextShadowPanelVisible(!this.props.shadowPanelVisible);

        if(this.shadowPanelAnchorEl) {
          this.textShadowPanel.setState({anchorEl: this.shadowPanelAnchorEl});
        }
      }}/>
      <TextShadowPanel
        onClick={(e, color, index) => {
          this.props.setTextShadowActiveIndex(index);
        }}
        ref={ref => this.textShadowPanel = ref}
        anchorEl = {this.shadowPanelAnchorEl}
        open={this.props.shadowPanelVisible}
        activeIndex={this.props.activeShadowColorIndex}
        onRequestClose={e => {
          this.props.setTextShadowPanelVisible(false);
        }}
        size={this.props.shadowSize}
        items={this.props.shadowColorItems}/>
    </div>;
  }

  render() {
    let buttonStyle = {
      width: '100%',
    };

    let buttonBgColor = '#eee';

    let layout1 = [
      {i: '0', x: 0, y: 0, w: 2, h: 1, static: true},
      {i: '1', x: 2, y: 0, w: 1, h: 1, static: true},
      {i: '2', x: 3, y: 0, w: 1, h: 1, static: true},
      {i: '3', x: 4, y: 0, w: 1, h: 1, static: true},
    ];
    // console.log(this.textColorPanel);

    // console.log('cc: ', currentTextColorString);
    return (
      <PopupPanel label='文字属性' bodyHeight={280} overflow='hidden' open={true}>
        <TextField
          hintText='www.janexi.com'
          fullWidth={true}
        />
        <ReactGridLayout
          layout={layout1}
          width={400}
          rowHeight={50}
          cols={5}>
          <div key='0'>
            <div>字体</div>
            <SelectField
              value={1}
              fullWidth={true}
              onChange={e => {}}>
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
          </div>
          {this.renderColorPanel()}
          {this.renderStrokePanel()}
          {this.renderShadowPanel()}
        </ReactGridLayout>
        <div style={{paddingLeft: 5, paddingRight: 5, marginBottom: 20}}>
          <InputNumberSliderGroup defaultValue={12} max={20} min={5} type='INT' label='字号'/>
          <InputNumberSliderGroup defaultValue={1} max={10} min={0} type='INT' label='间距'/>
          <InputNumberSliderGroup defaultValue={0} max={360} min={-360} type='INT' label='弧度'/>
        </div>

      </PopupPanel>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeColorIndex: state.textColorPanelData.currentColorIndex,
    colorItems: state.textColorPanelData.colors,
    colorPanelVisible: state.textColorPanelData.visible,
    activeStrokeColorIndex: state.textStrokePanelData.currentColorIndex,
    strokeColorItems: state.textStrokePanelData.colors,
    strokePanelVisible: state.textStrokePanelData.visible,
    strokeSize: state.textStrokePanelData.size,
    activeShadowColorIndex: state.textShadowPanelData.currentColorIndex,
    shadowColorItems: state.textShadowPanelData.colors,
    shadowPanelVisible: state.textShadowPanelData.visible,
    shadowSize: state.textShadowPanelData.size
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setTextColorActiveIndex,
    addTextColor,
    setTextColorPanelVisible,
    setTextStrokeActiveIndex,
    addTextStroke,
    setTextStrokePanelVisible,
    setTextStrokeSize,
    setTextShadowActiveIndex,
    addTextShadow,
    setTextShadowPanelVisible,
    setTextShadowSize
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(TextPropertiesPanel);
