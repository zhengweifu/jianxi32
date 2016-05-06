import React from 'react';
import { List, ListItem, IconButton, SvgIcon } from 'material-ui';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { setNode, addNode, removeNode, setNodeActiveIndex } from '../actions/index';

class NodePanel extends React.Component {
  renderItems() {
    return this.props.items.map((item, index) => {
      let leftIconPath = 'M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z';
      switch (item.kind) {
        case '图片':
          leftIconPath = 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z';
          break;
        case '文字':
          leftIconPath = 'M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z';
          break;
        default:
      }

      let bgColor = this.props.activeIndex === index ? this.props.activeColor : this.props.defaultColor;

      return (
        <ListItem
          onTouchTap={e => {
            console.log('click ...', index);
            // this.setState({activeIndex: index});
            this.props.setNodeActiveIndex(index);
            if(this.props.onItemClick) {
              this.props.onItemClick(e, item, index);
            }
          }}
          key={index}
          style={{
            marginBottom: 5,
            backgroundColor: bgColor}}
          leftIcon={
            <SvgIcon>
              <path d={leftIconPath}></path>
            </SvgIcon>
          }
          primaryText={item.describtion}
          rightIconButton={
            <IconButton
              onTouchTap={e => {
                console.log('delete ...', index);
                this.props.removeNode(index);
                if(this.props.onRemoveClick) {
                  this.props.onRemoveClick(e, item, index);
                }
              }}
              >
              <SvgIcon color='#7c2905'>
                <path d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'></path>
              </SvgIcon>
            </IconButton>}>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <List>
        {this.renderItems()}
      </List>
    );
  }
}

NodePanel.defaultProps = {
  activeIndex: -1,
  defaultColor: '#e7d3ca',
  activeColor: '#ff8d5c',
  items: []
};


NodePanel.propTypes = {
  activeIndex: React.PropTypes.number,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    kind: React.PropTypes.oneOf(['图片', '文字']),
    describtion: React.PropTypes.string
  })),
  defaultColor: React.PropTypes.string,
  activeColor: React.PropTypes.string,
  onItemClick: React.PropTypes.func,
  onRemoveClick: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    activeIndex: state.nodeData.activeIndex,
    items: state.nodeData.items
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setNode,
    removeNode,
    addNode,
    setNodeActiveIndex
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null)(NodePanel);
