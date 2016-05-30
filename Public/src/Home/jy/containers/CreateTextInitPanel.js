import React, { Component, PropTypes } from 'react';

import { RaisedButton, TextField } from 'material-ui';

import Modal from '../../../Common/components/Modal';

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
    return (
      <Modal
        open={this.state.open}
        onOkClick={e => {
          let v = this.textHint;

          if(this.textValue) {
            v = this.textValue;
          }

          let nodeId = AddText(v);

          this.props.addNode({id: nodeId, kind: '文字', describtion: v});

          this.onHandleClose();
        }}>
        <TextField
          hintText={this.textHint}
          floatingLabelText='文字内容'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={(e, value) => this.textValue = value}
        />
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addNode
  }, dispatch);
}

export default connect(null, mapDispatchToProps, null, {withRef: true})(CreateTextInitPanel);
