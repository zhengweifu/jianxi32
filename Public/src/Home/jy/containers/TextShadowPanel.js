import React, { Component, PropTypes } from 'react';

import ColorGroup from '../../../Common/components/ColorGroup';

import { Popover } from 'material-ui';

import InputNumberSlider from '../../../Common/components/InputNumberSlider';

import VerticalSeparation from '../../../Common/components/VerticalSeparation';

export default class TextShadowPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      anchorEl: props.anchorEl
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.open !== undefined) {
      this.setState({open: newProps.open});
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'middle', vertical: 'top'}}
        onRequestClose={e => {
          this.setState({
            open: false,
          });

          if(this.props.onRequestClose) {
            this.props.onRequestClose(e);
          }
        }}
        style={{padding: '10px 5px', marginTop: 5, width: 400}}
        >
        <VerticalSeparation>
          <ColorGroup
            activeIndex={this.props.activeIndex}
            onClick={(e, item, index) => {
              if(this.props.onClick) {
                this.props.onClick(e, item, index);
              }
            }}
            items={this.props.items}/>

          <InputNumberSlider defaultValue={this.props.hShadow} max={20} min={-20} type='INT' label='水平' labelWidth={50} labelFontSize={14} onChange={(e, v) => {
            if(this.props.onChangeHShadow) {
              this.props.onChangeHShadow(e, v);
            }
          }}/>
          <InputNumberSlider defaultValue={this.props.vShadow} max={20} min={-20} type='INT' label='垂直' labelWidth={50} labelFontSize={14} onChange={(e, v) => {
            if(this.props.onChangeHShadow) {
              this.props.onChangeVShadow(e, v);
            }
          }}/>
          <InputNumberSlider defaultValue={this.props.blur} max={10} min={0} type='INT' label='模糊' labelWidth={50} labelFontSize={14} onChange={(e, v) => {
            if(this.props.onChangeHShadow) {
              this.props.onChangeBlur(e, v);
            }
          }}/>
        </VerticalSeparation>

      </Popover>
    );
  }
}

TextShadowPanel.defaultProps = {
  open: false,
  anchorEl: null,
  hShadow: 0,
  vShadow: 0,
  blur: 0
};

TextShadowPanel.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  activeIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  hShadow: PropTypes.number,
  vShadow: PropTypes.number,
  blur: PropTypes.number
};
