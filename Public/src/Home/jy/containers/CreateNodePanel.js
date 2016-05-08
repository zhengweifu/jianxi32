import React, { Component, PropTypes } from 'react';

import { GridList, RaisedButton } from 'material-ui';

import { EditorTitle } from 'material-ui/svg-icons';

import ButtonMenu from '../components/ButtonMenu';

import PatternLibrariesPanel from './PatternLibrariesPanel';

export default class CreateNodePanel extends Component {
  onHandleItemClick(event, index) {
    switch (index) {
      case 0:
        console.log('This is 0.');
        break;
      case 1:
        console.log('This is 1.');
        this.refs.patternLibrariesPanel.getWrappedInstance().setState({open: true});
        break;
      default:
        console.log('No index.');
    }
  }

  render() {
    return (
      <GridList
        cols={2}
        cellHeight={36}
        >
        <div>
          <ButtonMenu
            bgColor={this.props.bgColor}
            fbColor={this.props.fbColor}
            name='选择图片'
            width={182}
            onItemClick={this.onHandleItemClick.bind(this)}
            items={[
              '本地上传',
              '剪切画'
            ]}/>
          <PatternLibrariesPanel bgColor={this.props.bgColor} color={this.props.fbColor} ref='patternLibrariesPanel' />
        </div>
        <RaisedButton
        label='添加文字'
        onTouchTap={e => {
          console.log('添加文字');
        }}
        icon={<EditorTitle/>}
        fullWidth={true}
        style={{width: 182, marginLeft: 15}}
        backgroundColor={this.props.bgColor}
        labelColor={this.props.fbColor}/>
      </GridList>
    );
  }
}

CreateNodePanel.defaultProps = {};

CreateNodePanel.propTypes = {
  bgColor: PropTypes.string.isRequired,
  fbColor: PropTypes.string.isRequired
};
