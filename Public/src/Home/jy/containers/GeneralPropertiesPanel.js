import React, { Component, PropTypes } from 'react';

import InputNumberSlider from '../../../Common/components/InputNumberSlider';
import InputNumberSliderGroup from '../../../Common/components/InputNumberSliderGroup';

import VerticalSeparation from '../../../Common/components/VerticalSeparation';

import GridList from '../../../Common/components/GridList';

import Grid from '../../../Common/components/Grid';

import Col from '../../../Common/components/Col';

import { GREY500, ORANGE700, CYAN500, REDA100 } from '../../../Common/styles/colors';

import RaisedButton from '../../../Common/components/RaisedButton';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { setGeneralPanelProps, removeNode, moveNode } from '../actions';

// import { ToCenterV, ToCenterH, SetGeneralProps, GetActiveObjectProps, RemoveObject } from '../core';

class GeneralPropertiesPanel extends Component {
  setGeneralProp(key, value) {
    if(key) {
      window.PRODUCT.SetGeneralProps(key, value);
    }

    let newGeneralProps = window.PRODUCT.GetActiveObjectProps().generalProps;//JSON.parse(JSON.stringify(this.props.generalProps));
    this.props.setGeneralPanelProps(newGeneralProps);
  }
  render() {
    const {
      generalProps
    } = this.props;
    // console.log(generalProps);
    const left = generalProps.left || 0,
      top = generalProps.top || 0,
      multiplierX =  generalProps.flipX ? -1 : 1, 
      multiplierY = generalProps.flipY ? -1 : 1,
      scaleX = (generalProps.scaleX || 1) * multiplierX,
      scaleY = (generalProps.scaleY || 1) * multiplierY,
      angle = generalProps.angle || 0;

    return (
      <div>
        <VerticalSeparation gutter={10}>
          <InputNumberSliderGroup
            max={360}
            min={-360}
            labels={['x', 'y']}
            labelWidth={10}
            labelColor={ORANGE700}
            title='位置'
            defaults={[left, top]}
            onChange={(e, values) => {
              // console.log(values);
              this.setGeneralProp({left: values[0], top: values[1]});
            }}
          />
          <InputNumberSlider 
            defaultValue={angle} 
            max={360} min={-360} 
            // type='INT'
            labelFontSize={14} 
            label='旋转' labelWidth={60}
            onChange={(e, value) => {
              console.log(value);
              this.setGeneralProp('angle', value);
            }}
          />

          <InputNumberSliderGroup
            lock={true}
            max={5}
            min={-5}
            labels={['x', 'y']}
            labelWidth={10}
            labelColor={ORANGE700}
            title='缩放'
            defaults={[scaleX, scaleY]}
            onChange={(e, values) => {
              // console.log(values);
              const opts = {
                flipX: values[0] >= 0 ? false : true,
                flipY: values[1] >= 0 ? false : true,
                scaleX: Math.abs(values[0]), 
                scaleY: Math.abs(values[1])
              };
              this.setGeneralProp(opts);
            }}
          />
          <GridList cols={4}>
            <RaisedButton
              label='上移一层'
              bgColor={CYAN500}
              fullWidth={true}
              onClick={e => {
                const result = window.PRODUCT.ToDownLayer();
                if(result) {
                  console.log(result);
                  this.props.moveNode(result.from, result.to);
                }
              }}
            />
            <RaisedButton
              label='下移一层'
              bgColor={CYAN500}
              fullWidth={true}
              onClick={e => {
                const result = window.PRODUCT.ToUpLayer();
                if(result) {
                  this.props.moveNode(result.from, result.to);
                }
              }}
            />
            <RaisedButton
              label='水平居中'
              bgColor={CYAN500}
              fullWidth={true}
              onClick={e => {
                window.PRODUCT.ToCenterH();
                this.setGeneralProp();
              }}
            />
            <RaisedButton
              label='垂直居中'
              bgColor={CYAN500}
              fullWidth={true}
              onClick={e => {
                window.PRODUCT.ToCenterV();
                this.setGeneralProp();
              }}
            />
          </GridList>
          <RaisedButton
              label='删除'
              bgColor={REDA100}
              fullWidth={true}
              onClick={e => {
                const nodeId = window.PRODUCT.RemoveObject();
                // console.log(this.porps.removeNode, this.props.activeNodeIndex);
                const index = state.canvasData.nodeData[this.props.activeCanvasIndex].activeIndex;
                this.props.removeNode(index);
              }}
            />
        </VerticalSeparation>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    generalProps: state.generalPanelData.props,
    activeCanvasIndex: state.canvasData.activeIndex
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setGeneralPanelProps,
    removeNode,
    moveNode
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(GeneralPropertiesPanel);
