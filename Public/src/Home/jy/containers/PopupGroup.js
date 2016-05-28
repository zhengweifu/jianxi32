import React, { Component, PropTypes } from 'react';

import PopupPanel from '../../../Common/components/PopupPanel';

export default class PopupGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opens: props.opens
    };
  }

  renderItems() {

    return this.props.items.map((item, index) => {
      if(this.state.opens.length < index + 1) {
        this.state.opens.push(false);
      }
      let visible = item.visible;

      return (
        <PopupPanel
          key={'PopupPanel_' + index}
          bodyHeight={item.height}
          overflow='hidden'
          style={{
            marginTop: 10,
            display: visible ? 'block' : 'none'
          }}
          onTouchTap={e => {
            let newOpens = this.state.opens.map(() => false);
            newOpens[index] = !this.state.opens[index];
            this.setState({opens: newOpens});
          }}
          open={this.state.opens[index]}
          label={item.title}>
          {item.content}
        </PopupPanel>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderItems()}
      </div>
    );
  }
}

PopupGroup.defaultProps = {
  opens: []
};

PopupGroup.propTypes = {
  opens: PropTypes.arrayOf(PropTypes.bool)
};
