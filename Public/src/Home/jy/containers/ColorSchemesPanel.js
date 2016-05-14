import React, { Component, PropTypes } from 'react';

import PopupPanel from '../components/PopupPanel';

import ImageItem from '../components/ImageItem';

import { GridList } from 'material-ui';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { setColorSchemeActiveIndex } from '../actions';

class ColorSchemesPanel extends Component {
  renderItems() {
    return this.props.items.map((item, index) => {
      return (
        <ImageItem
          key={index}
          title={item.describtion}
          img={item.img}
          active={this.props.activeIndex == index ? true : false}
          onClick={(e, describtion, img) => {
            this.props.setColorSchemeActiveIndex(index);
            if(this.props.onItemClick) {
              this.props.onItemClick(e, describtion, img);
            };
          }}/>
      );
    });
  }

  render() {
    return (
      <GridList
        cellHeight={100}
        cols={4}>
        {this.renderItems()}
      </GridList>
    );
  }
}

ColorSchemesPanel.defaultProps = {
  activeIndex: -1,
  items: []
};

ColorSchemesPanel.propTypes = {
  activeIndex: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string,
    describtion: PropTypes.string
  }))
};

function mapStateToProps(state) {
  return {
    activeIndex: state.colorSchemeData.activeIndex,
    items: state.colorSchemeData.items
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setColorSchemeActiveIndex
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorSchemesPanel);
