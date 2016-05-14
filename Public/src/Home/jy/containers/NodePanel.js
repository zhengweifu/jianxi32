import React from 'react';
import { List, ListItem, IconButton } from 'material-ui';

import { ImageImage, EditorTitle, EditorInsertEmoticon, ActionHighlightOff } from 'material-ui/svg-icons';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { setNode, addNode, removeNode, setNodeActiveIndex } from '../actions/index';

import PopupPanel from '../components/PopupPanel';

class NodePanel extends React.Component {
  renderItems() {
    return this.props.items.map((item, index) => {
      let mLeftIcon = <EditorInsertEmoticon />;
      switch (item.kind) {
        case '图片':
          mLeftIcon = <ImageImage />;
          break;
        case '文字':
          mLeftIcon = <EditorTitle />;
          break;
        default:
      }

      let bgColor = this.props.activeIndex === index ? this.props.activeColor : this.props.defaultColor;

      let describtion = item.describtion, subsize = 20;
      if(describtion.length > subsize) {
        describtion = describtion.substr(0, subsize - 2) + '...';
      }

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
          leftIcon={mLeftIcon}
          primaryText={describtion}
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
              <ActionHighlightOff color='#7c2905'/>
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
