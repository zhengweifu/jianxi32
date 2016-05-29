import React, { Component, PropTypes } from 'react';

import ColorGroup from '../../../Common/components/ColorGroup';

// import { Popover } from 'material-ui';
import Popover from '../../../Common/components/Popover';

import InputNumberSlider from '../../../Common/components/InputNumberSlider';

import VerticalSeparation from '../../../Common/components/VerticalSeparation';

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
          <div style={{paddingLeft: 5, paddingRight: 3}}>
            <InputNumberSlider defaultValue={this.props.size} max={10} min={0} type='INT' label='大小' labelWidth={50} labelFontSize={14} onChange={(e, v) => {
              if(this.props.onChangeSize) {
                this.props.onChangeSize(e, v);
              }
            }}/>
          </div>
        </VerticalSeparation>
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
