import React from 'react';
import { Dialog, RaisedButton, List, ListItem, AppBar, GridList, GridTile } from 'material-ui';

import ProductItem from '../components/ProductItem';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import setPatternItemData from '../actions/setPatternItemData';

class PatternLibrariesPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
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
        bodyStyle={{maxHeight: 500, padding: 0, paddingTop: 0}}
        onRequestClose={this.onHandleClose.bind(this)}>
        <div className='row' style={{marginRight: 0, marginLeft: 0, borderBottom: '1px solid #ccc'}}>
          <div className='col-sm-2' style={{paddingLeft: 0}}>
            <List style={{borderRight: '1px solid #ccc'}}>
              <ListItem primaryText="动物" />
              <ListItem primaryText="植物" />
              <ListItem primaryText="名画" />
              <ListItem primaryText="建筑" />
              <ListItem primaryText="体育" />
              <ListItem primaryText="动漫" />
              <ListItem primaryText="明星" />
              <ListItem primaryText="书法" />
            </List>
          </div>
          <div className='col-sm-10'>
          </div>
        </div>
      </Dialog>
    );
  }
}

PatternLibrariesPanel.defaultProps = {
  activeTitleIndex: -1,
  activeItemIndex: -1,
  tilesData: []
};

PatternLibrariesPanel.propTypes = {
  activeTitleIndex: React.PropTypes.number,
  activeItemIndex: React.PropTypes.number,
  tilesData: React.PropTypes.array
};


function mapStateToProps(state) {
  return {
    activeTitleIndex: state.patternData.activeTitleIndex,
    activeItemIndex: state.patternData.activeItemIndex,
    tilesData: state.patternData.tilesData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPatternItemData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(PatternLibrariesPanel);
