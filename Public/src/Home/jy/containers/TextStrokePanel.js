import React, { Component, PropTypes } from 'react';

import ColorGroup from '../components/ColorGroup';

import { Popover } from 'material-ui';

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

export default class TextStrokePanel extends Component {
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
        <ColorGroup
          activeIndex={this.props.activeIndex}
          onClick={(e, item, index) => {
            if(this.props.onClick) {
              this.props.onClick(e, item, index);
            }
          }}
          items={this.props.items}/>
        <div style={{paddingLeft: 5, paddingRight: 3}}>
          <InputNumberSliderGroup defaultValue={this.props.size} max={10} min={0} type='INT' label='描边大小' onChange={(e, v) => {
            if(this.props.onChangeSize) {
              this.props.onChangeSize(e, v);
            }
          }}/>
        </div>
      </Popover>
    );
  }
}

TextStrokePanel.defaultProps = {
  open: false,
  anchorEl: null,
  size: 1
};

TextStrokePanel.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  activeIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  size: PropTypes.number
};
