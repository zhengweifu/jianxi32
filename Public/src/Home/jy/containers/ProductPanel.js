import React from 'react';
import { Dialog, RaisedButton, AppBar, GridList, GridTile } from 'material-ui';

import ProductItem from '../components/ProductItem';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { setProductItemData } from '../actions';

class ProductPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      currentActiveTitleIndex: props.activeTitleIndex,
      currentActiveItemIndex: props.activeItemIndex,
    };
  }

  onHandleOpen(event) {
    this.setState({open: true});
  }

  onHandleClose(event) {
    this.setState({open: false});
  }

  onHandleItemClick(event, src, title, other) {
    if(other !== null) {
      this.setState({
        currentActiveTitleIndex: other[0],
        currentActiveItemIndex: other[1]
      });
    }
    // console.log(src, title, other);
  }

  renderItems(items, titleIndex) {
    return items.map((item, index) => {
      let mactive = (titleIndex == this.state.currentActiveTitleIndex && index == this.state.currentActiveItemIndex) ? true : false;
      return (
        <div key={index} className='col-sm-2' style={{margin: '5px 0'}}>
          <ProductItem
            img={item.img}
            title={item.describtion}
            onClick={this.onHandleItemClick.bind(this)}
            other={[titleIndex, index]}
            active={mactive}/>
        </div>
      );
    });
  }

  renderList() {
    return this.props.tilesData.map((data, index) => {
      return (
        <div key={index}>
          <div style={{
            padding: '6px 10px',
            fontSize: 14,
            borderRadius: 2,
            backgroundColor: this.props.bgColor,
            color: this.props.color
          }}>{data.title}</div>
          <div className='row'>
            {this.renderItems(data.items, index)}
          </div>
        </div>
      );
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.activeTitleIndex !== undefined || newProps.activeItemIndex !== undefined) {
      this.setState({
        currentActiveTitleIndex: newProps.activeTitleIndex,
        currentActiveItemIndex: newProps.activeItemIndex,
      });
    }
  }

  render() {
    const actions = [
      <RaisedButton
        label='取消'
        secondary={true}
        style={{marginRight: 10}}
        onTouchTap={this.onHandleClose.bind(this)}
      />,
      <RaisedButton
        label='确定'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onHandleClose.bind(this)}
      />,
    ];
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        bodyStyle={{overflow: 'auto', maxHeight: 500}}
        onRequestClose={this.onHandleClose.bind(this)}>
        {this.renderList()}
      </Dialog>
    );
  }
}

ProductPanel.defaultProps = {
  activeTitleIndex: -1,
  activeItemIndex: -1,
  tilesData: []
};

ProductPanel.propTypes = {
  activeTitleIndex: React.PropTypes.number,
  activeItemIndex: React.PropTypes.number,
  bgColor: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  tilesData: React.PropTypes.array
};


function mapStateToProps(state) {
  return {
    activeTitleIndex: state.productData.activeTitleIndex,
    activeItemIndex: state.productData.activeItemIndex,
    tilesData: state.productData.tilesData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setProductItemData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(ProductPanel);
