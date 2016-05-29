import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom';

import VerticalSeparation from '../../../Common/components/VerticalSeparation';

import InputNumberSlider from '../../../Common/components/InputNumberSlider';

import Grid from '../../../Common/components/Grid';

import Col from '../../../Common/components/Col';

import TextColorPanel from './TextColorPanel';

import TextStrokePanel from './TextStrokePanel';

import TextShadowPanel from './TextShadowPanel';

import ColorItem from '../../../Common/components/ColorItem';

import { RaisedButton, TextField, SelectField, MenuItem } from 'material-ui';

// import ReactGridLayout from 'react-grid-layout';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { setTextColorActiveIndex, addTextColor, setTextColorPanelVisible,
         setTextStrokeActiveIndex, addTextStroke, setTextStrokePanelVisible, setTextStrokeSize,
         setTextShadowActiveIndex, addTextShadow, setTextShadowPanelVisible, setTextShadowSize,
         setTextPanelProps } from '../actions';

import { SetTextProps, GetTextWidth } from '../core';

import IS from '../../../Common/utils/IS';

class TextPropertiesPanel extends Component {

  setTextProp(key, value) {
    let newTextProps = JSON.parse(JSON.stringify(this.props.textProps));
    newTextProps[key] = value;

    switch(key) {
      case 'radius':
        newTextProps[key] = Math.abs(value);
        if(value < 0) {
          newTextProps['reverse'] = true;
        } else {
          newTextProps['reverse'] = false;
        }
        break;
      case 'text':
      case 'fontFamily':
      case 'fontSize':
      case 'strokeWidth':
      case 'spacing':
        newTextProps[key] = value;
        break;
      default:
        newTextProps[key] = value;
    }

    this.props.setTextPanelProps(newTextProps);

    SetTextProps(newTextProps);
  }

  separationShadow(shadow) {
    let result = {
      hShadow: 0,
      vShadow: 0,
      blur: 0,
      color: 'transparent'
    };

    if(shadow) {
      if(IS(shadow, 'String')) {
        let split = shadow.split(/px /g);
        if(split.length > 0) {
          result.hShadow = parseInt(split[0]);
        }

        if(split.length > 1) {
          result.vShadow = parseInt(split[1]);
        }

        if(split.length > 2) {
          result.blur = parseInt(split[2]);
        }

        if(split.length > 3) {
          result.color = split[3];
        }
      } else if(IS(shadow, 'Object')) {
        result.hShadow = shadow.offsetX;
        result.vShadow = shadow.offsetY;
        result.blur = shadow.blur;
        result.color = shadow.color;
      }
    }

    return result;
  }

  mergeShadow(hShadow, vShadow, blur, color) {
    return `${hShadow}px ${vShadow}px ${blur}px ${color}`;
  }

  renderColorItem() {
    let currentTextColorString = this.props.activeColorIndex >= 0 ? 
      this.props.colorItems[this.props.activeColorIndex] : 
      this.props.textProps.fill;
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{marginBottom: 10}}>颜色</div>
        <ColorItem defaultBgColor={currentTextColorString}
          ref={ref => {
            this.textColorItem = ref;
            this.colorPanelAnchorEl = ReactDOM.findDOMNode(ref);
          }}
          active={this.props.colorPanelVisible}
          onClick={(e, color) => {
            let index;
            if(color !== 'transparent') {
              index = this.props.colorItems.findIndex(item => item === color);
              if(index === -1) {
                this.props.addTextColor(color);
                index = this.props.colorItems.length - 1;
              }
            } else {
              index = this.props.colorItems.length - 1;
            }
            this.props.setTextColorActiveIndex(index);
            this.props.setTextColorPanelVisible(!this.props.colorPanelVisible);
          }}/>
      </div>
    );
  }

  renderStrokeColorItem() {
    let currentTextStrokeColorString = this.props.activeStrokeColorIndex >= 0 ? 
      this.props.strokeColorItems[this.props.activeStrokeColorIndex] : 
      this.props.textProps.stroke;
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{marginBottom: 10}}>描边</div>
        <ColorItem defaultBgColor={currentTextStrokeColorString}
          ref={ref => {
            this.textStrokeColorItem = ref;
            this.strokePanelAnchorEl = ReactDOM.findDOMNode(ref);
          }}
          active={this.props.strokePanelVisible}
          onClick={(e, color) => {
            let index;
            if(color !== 'transparent') {
              index = this.props.strokeColorItems.findIndex(item => item === color);
              if(index === -1) {
                this.props.addTextStroke(color);
                index = this.props.strokeColorItems.length - 1;
              }
            } else {
              index = this.props.strokeColorItems.length - 1;
            }

            this.props.setTextStrokeActiveIndex(index);

            this.props.setTextStrokePanelVisible(!this.props.strokePanelVisible);

            // if(this.strokePanelAnchorEl) {
            //   this.textStrokePanel.setState({anchorEl: this.strokePanelAnchorEl});
            // }
          }}/>
      </div>
    );
  }

  renderShadowColorItem(shadowProps) {
    let currentTextShadowColorString = this.props.activeShadowColorIndex >= 0 ? 
      this.props.shadowColorItems[this.props.activeShadowColorIndex] : 
      shadowProps.color;
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{marginBottom: 10}}>阴影</div>
        <ColorItem defaultBgColor={currentTextShadowColorString}
        ref={ref => {
          this.textShadowColorItem = ref;
          this.shadowPanelAnchorEl = ReactDOM.findDOMNode(ref);
        }}
        active={this.props.shadowPanelVisible}
        onClick={(e, color) => {
          let index;
          if(color !== 'transparent') {
            index = this.props.shadowColorItems.findIndex(item => item === color);
            console.log(index);
            if(index === -1) {
              this.props.addTextShadow(color);
              index = this.props.shadowColorItems.length - 1;
            }
          } else {
            index = this.props.shadowColorItems.length - 1;
          }

          this.props.setTextShadowActiveIndex(index);

          this.props.setTextShadowPanelVisible(!this.props.shadowPanelVisible);

          // if(this.shadowPanelAnchorEl) {
          //   this.textShadowPanel.setState({anchorEl: this.shadowPanelAnchorEl});
          // }
        }}/>
      </div>
    );
  }

  renderColorPanel() {
    // console.log(this.props);
    return (
      <TextColorPanel
        onClick={(e, color, index) => {
          this.props.setTextColorActiveIndex(index);

          this.setTextProp('fill', color);
        }}
        ref={ref => this.textColorPanel = ref}
        open={this.props.colorPanelVisible}
        activeIndex={this.props.activeColorIndex}
        onRequestClose={e => {
          this.props.setTextColorPanelVisible(false);
        }}
        items={this.props.colorItems}/>
    );
  }
  // open={this.props.colorPanelVisible}

  renderStrokePanel() {
    return (
      <TextStrokePanel
        onClick={(e, color, index) => {
          this.props.setTextStrokeActiveIndex(index);
          this.setTextProp('stroke', color);
        }}
        ref={ref => this.textStrokePanel = ref}
        open={this.props.strokePanelVisible}
        activeIndex={this.props.activeStrokeColorIndex}
        onRequestClose={e => {
          this.props.setTextStrokePanelVisible(false);
        }}
        size={this.props.textProps.strokeWidth}
        onChangeSize={(e, v) => {
          this.setTextProp('strokeWidth', v);
        }}
        items={this.props.strokeColorItems}/>
    );
  }

  renderShadowPanel(shadowProps) {
    return (
      <TextShadowPanel
        onClick={(e, color, index) => {
          this.props.setTextShadowActiveIndex(index);

          this.setTextProp('shadow', this.mergeShadow(
            shadowProps.hShadow,
            shadowProps.vShadow,
            shadowProps.blur,
            color
          ));
        }}
        ref={ref => this.textShadowPanel = ref}
        open={this.props.shadowPanelVisible}
        activeIndex={this.props.activeShadowColorIndex}
        onRequestClose={e => {
          this.props.setTextShadowPanelVisible(false);
        }}
        hShadow={shadowProps.hShadow}
        vShadow={shadowProps.vShadow}
        blur={shadowProps.blur}
        onChangeHShadow={(e, v) => {
          this.setTextProp('shadow', this.mergeShadow(
            v,
            shadowProps.vShadow,
            shadowProps.blur,
            shadowProps.color
          ));
        }}
        onChangeVShadow={(e, v) => {
          this.setTextProp('shadow', this.mergeShadow(
            shadowProps.hShadow,
            v,
            shadowProps.blur,
            shadowProps.color
          ));
        }}
        onChangeBlur={(e, v) => {
          this.setTextProp('shadow', this.mergeShadow(
            shadowProps.hShadow,
            shadowProps.vShadow,
            v,
            shadowProps.color
          ));
        }}
        items={this.props.shadowColorItems}/>
    );
  }

  renderFontFamilies() {
    let fontFamilies = [
      'Arial',
      'Helvetica',
      'Geneva',
      'Verdana',
      'Monaco',
      'Myriad Pro',
      'Lucida Grande',
      'Ubuntu',
      'Delicious 500',
      'CA BND Web Bold 700',
      'Impact',
      'Times New Roman',
      'DejaVu Serif 400',
      'Georgia',
      'Hoefler Text',
      'Cochin',
      'Tallys 400',
      'Courier New',
      'Andale Mono',
      'OdessaScript 500',
      'Gothic',
      'Encient German Gothic 400',
      'Marker Felt',
      'Vampire95',
      'Globus 500',
      'CrashCTT 400',
      'Comic Sans MS',
      'Modernist One 400',
      'Capitalist',
      'Lest',
      'Quake Cyr',
      'Terminator Cyr',
      'Sherwood'
    ];

    let fonts = fontFamilies.map((item, index) => {
      return <MenuItem key={'fontFamily_' + index} value={item} primaryText={item} />;
    });

    return (
      <SelectField
        value={this.props.textProps.fontFamily ? this.props.textProps.fontFamily : fontFamilies[0]}
        fullWidth={true}
        onChange={(e, valueIndex) => {
          this.setTextProp('fontFamily', fontFamilies[valueIndex]);
        }}>
        {fonts}
      </SelectField>
    );

  }

  getTextAngle() {
    let textWidth = GetTextWidth(this.props.textProps.text, this.props.textProps.fontSize, this.props.textProps.fontFamily, this.props.textProps.strokeWidth, this.props.textProps.spacing);

    let textAngle = 0;

    if(textWidth > 0) {
      textAngle = Math.floor(textWidth / this.props.textProps.radius  * 180 / Math.PI);
    }

    if(this.props.textProps.reverse) {
      textAngle *= -1;
    }


    return textAngle;
  }

  setTextRadius(v) {
    v = v !== 0 ? v : 0.01;
    let textWidth = GetTextWidth(this.props.textProps.text, this.props.textProps.fontSize, this.props.textProps.fontFamily, this.props.textProps.strokeWidth, this.props.textProps.spacing);
    let r = textWidth * 180 / (Math.PI * v);
    this.setTextProp('radius', r);
  }

  render() {
    let buttonStyle = {
      width: '100%',
    };

    let buttonBgColor = '#eee';


    // console.log(this.textColorPanel);
    let shadowProps = this.separationShadow(this.props.textProps.shadow);
    return (
      <VerticalSeparation gutter={20}>
        <TextField
          hintText='www.janexi.com'
          value={this.props.textProps.text ? this.props.textProps.text : ''}
          fullWidth={true}
          onChange={(e, v) => {
            this.setTextProp('text', v);
          }}/>
        <div>
          <Grid>
            <Col width={ 5 / 8}>
              <div>字体</div>
              {this.renderFontFamilies()}
            </Col>
            <Col width={ 1 / 8}>
              {this.renderColorItem()}
            </Col>
            <Col width={ 1 / 8}>
              {this.renderStrokeColorItem()}
            </Col>
            <Col width={ 1 / 8}>
              {this.renderShadowColorItem(shadowProps)}
            </Col>
          </Grid>
          {this.renderColorPanel()}
          {this.renderStrokePanel()}
          {this.renderShadowPanel(shadowProps)}
        </div>
        
        <InputNumberSlider defaultValue={this.props.textProps.fontSize ? this.props.textProps.fontSize : 10}
        max={50} min={5} type='INT' label='字号' labelWidth={50} labelFontSize={14} onChange={ (e, v) => {
          this.setTextProp('fontSize', v);
        }}/>
        <InputNumberSlider defaultValue={this.props.textProps.spacing ? this.props.textProps.spacing : 1} 
          max={20} min={0} type='INT' label='间距' labelWidth={50} labelFontSize={14} onChange={ (e, v) => {
            this.setTextProp('spacing', v);
          }}/>
        <InputNumberSlider defaultValue={this.getTextAngle()} max={360} min={-360} type='INT' label='弧度' labelWidth={50} labelFontSize={14} onChange={ (e, v) => {
            this.setTextRadius(v);
          }}/>
      </VerticalSeparation>

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
    shadowSize: state.textShadowPanelData.size,
    textProps: state.textPanelData.props,
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
    setTextShadowSize,
    setTextPanelProps
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(TextPropertiesPanel);
