import React from 'react';
import { Dialog, RaisedButton, List, ListItem, AppBar, GridList, GridTile } from 'material-ui';

import PatternLibrariesGroup from '../components/PatternLibrariesGroup';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { setPatternItemData }from '../actions';

class PatternLibrariesPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      currentActiveTitleIndex: props.activeTitleIndex,
      currentActiveItemIndex: props.activeItemIndex,
      currentShowTitleIndex: props.showTitleIndex
    };
  }

  onHandleOpen(event) {
    this.setState({open: true});
  }

  onHandleClose(event) {
    this.setState({open: false});
  }

  onHandleItemClick(event, src, title, itemIndex) {
    this.setState({
      currentActiveTitleIndex: this.state.currentShowTitleIndex,
      currentActiveItemIndex: itemIndex
    });

    // console.log(src, title, other);
  }

  renderList() {
    return this.props.tilesData.map((data, index) => {
      let mstyle = (this.state.currentActiveTitleIndex == index) ? {backgroundColor: 'rgb(0, 188, 212)'} : {};
      return (
        <ListItem
          key={index}
          primaryText={data.title}
          style={mstyle}
          onTouchTap={e => {
            this.setState({currentShowTitleIndex : index});
          }}/>
      );
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.activeTitleIndex !== undefined || newProps.activeItemIndex !== undefined) {
      this.setState({
        currentActiveTitleIndex: newProps.activeTitleIndex,
        currentActiveItemIndex: newProps.activeItemIndex,
        currentShowTitleIndex: newProps.showTitleIndex
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

    let mindex = this.state.currentShowTitleIndex;

    let patternItems = (mindex != -1) ? this.props.tilesData[mindex].items : [];

    let mactiveIndex = (this.state.currentActiveTitleIndex == mindex) ? this.state.currentActiveItemIndex : -1;
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        bodyStyle={{maxHeight: 500, padding: 0, paddingTop: 0}}
        onRequestClose={this.onHandleClose.bind(this)}>
        <div className='row' style={{marginRight: 0, marginLeft: 0, borderBottom: '1px solid #ccc'}}>
          <div className='col-sm-2' style={{paddingLeft: 0, paddingRight: 0}}>
            <List style={{borderRight: '1px solid #ccc'}}>
              {this.renderList()}
            </List>
          </div>
          <div className='col-sm-10'>
            <PatternLibrariesGroup
              activeIndex={mactiveIndex}
              onItemClick={this.onHandleItemClick.bind(this)}
              items={patternItems}/>
          </div>
        </div>
      </Dialog>
    );
  }
}

PatternLibrariesPanel.defaultProps = {
  activeTitleIndex: -1,
  activeItemIndex: -1,
  showTitleIndex: -1,
  tilesData: []
};

PatternLibrariesPanel.propTypes = {
  activeTitleIndex: React.PropTypes.number,
  activeItemIndex: React.PropTypes.number,
  showTitleIndex: React.PropTypes.number,
  tilesData: React.PropTypes.array
};


function mapStateToProps(state) {
  return {
    activeTitleIndex: state.patternData.activeTitleIndex,
    activeItemIndex: state.patternData.activeItemIndex,
    showTitleIndex: state.patternData.showTitleIndex,
    tilesData: state.patternData.tilesData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPatternItemData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(PatternLibrariesPanel);
