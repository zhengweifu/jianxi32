import React, { Component, PropTypes } from 'react';

import { RaisedButton, Dialog, TextField } from 'material-ui';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { addNode } from '../actions';

import { AddText } from '../core';

class CreateTextInitPanel extends Component {
  constructor(props) {
    super(props);

    this.textHint = 'www.jianexi.com';

    this.state = {
      open: false
    };
  }

  onHandleOpen(event) {
    this.setState({open: true});
  }

  onHandleClose(event) {
    this.setState({open: false});
  }

  render() {
    const actions = [
      <RaisedButton
        label='取消'
        secondary={true}
        style={{marginRight: 10}}
        onTouchTap={this.onHandleClose.bind(this)}/>,
      <RaisedButton
        label='确定'
        primary={true}
        keyboardFocused={true}
        onTouchTap={e => {
          let v = this.textHint;

          if(this.textValue) {
            v = this.textValue;
          }

          let nodeId = AddText(v);

          this.props.addNode({id: nodeId, kind: '文字', describtion: v});

          this.onHandleClose();
        }}/>
    ];
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        bodyStyle={{overflow: 'auto', maxHeight: 500}}
        onRequestClose={this.onHandleClose.bind(this)}>
        <TextField
          hintText={this.textHint}
          floatingLabelText='文字内容'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={(e, value) => this.textValue = value}
        />
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addNode
  }, dispatch);
}

export default connect(null, mapDispatchToProps, null, {withRef: true})(CreateTextInitPanel);
