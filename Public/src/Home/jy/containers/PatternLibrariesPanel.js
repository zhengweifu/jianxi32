import React from 'react';
// import { RaisedButton, List, ListItem } from 'material-ui';
import RaisedButton from '../../../Common/components/RaisedButton';
import List from '../../../Common/components/List';

import Modal from '../../../Common/components/Modal';

import Grid from '../../../Common/components/Grid';

import Col from '../../../Common/components/Col';

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
    let items = this.props.tilesData.map((data, index) => {
      //let mstyle = (this.state.currentActiveTitleIndex == index) ? {backgroundColor: 'rgb(0, 188, 212)'} : {};
      return {
        title: data.title
      };
    });
    return (
      <List 
        items={items} 
        onClick={(e, title, index) => {
          this.setState({currentShowTitleIndex : index});
        }}/>
      );
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
    const {
      tilesData
    } = this.props;

    const {
      currentActiveTitleIndex,
      currentActiveItemIndex,
      currentShowTitleIndex,
      open
    } = this.state;

    let mindex = currentShowTitleIndex;

    let patternItems = (mindex != -1) ? tilesData[mindex].items : [];

    let mactiveIndex = (currentActiveTitleIndex == mindex) ? currentActiveItemIndex : -1;
    return (
      <Modal 
        open={open}
        onOkClick={e => {
          let svgUrl = tilesData[currentActiveTitleIndex]['items'][currentActiveItemIndex].img;
          window.PRODUCT.AddSvg(svgUrl);
          console.log(svgUrl);
          // this.setState({open: false});
        }}
        >
        <Grid>
          <Col width={1 / 5}>
            {this.renderList()}
          </Col>
          <Col width={4 / 5}>
            <PatternLibrariesGroup
              activeIndex={mactiveIndex}
              onItemClick={this.onHandleItemClick.bind(this)}
              items={patternItems}/>
          </Col>
        </Grid>
      </Modal>
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
