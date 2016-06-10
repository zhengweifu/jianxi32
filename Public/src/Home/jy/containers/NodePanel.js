import React from 'react';
// import { List, ListItem, IconButton } from 'material-ui';

import List from '../../../Common/components/List';
import IconButton from '../../../Common/components/IconButton';
import SvgIcon from '../../../Common/components/SvgIcon';

import { image } from '../../../Common/svgIcons/google/Image';

import { visibility, highlightOff } from '../../../Common/svgIcons/google/Action';

// import { ImageImage, EditorTitle, EditorInsertEmoticon, ActionHighlightOff } from 'material-ui/svg-icons';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { setNode, addNode, removeNode, setNodeActiveIndex } from '../actions/index';

class NodePanel extends React.Component {
  getItems() {
    return this.props.items.map((item) => {
      let describtion = item.describtion, subsize = 20;
      if(describtion.length > subsize) {
        describtion = describtion.substr(0, subsize - 2) + '...';
      }
      return {
        left: <IconButton 
          icon={<SvgIcon><path d={visibility}/></SvgIcon>}
          />, 
        title: describtion, 
        right: <IconButton 
          icon={<SvgIcon><path d={highlightOff}/></SvgIcon>}
          />
      };
    });
  }

  render() {
    const items = this.getItems();
    console.log(items);
    return (
      <List items={items}
        onClick={(e, title, index) => {
          console.log('click ...', index);
          this.props.setNodeActiveIndex(index);
          if(this.props.onItemClick) {
            this.props.onItemClick(e, title, index);
          }
        }}/>
    );
  }
}

NodePanel.defaultProps = {
  open: false,
  activeIndex: -1,
  defaultColor: '#e7d3ca',
  activeColor: '#ff8d5c',
  items: []
};


NodePanel.propTypes = {
  open: React.PropTypes.bool,
  activeIndex: React.PropTypes.number,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    kind: React.PropTypes.oneOf(['图片', '文字']),
    describtion: React.PropTypes.string,
    id: React.PropTypes.number
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
