import React, { Component, PropTypes } from 'react';

// import { TextField } from 'material-ui';
import Grid from '../../../Common/components/Grid';

import Col from '../../../Common/components/Col';

import Label from '../../../Common/components/Label';

import Input from '../../../Common/components/Input';

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
  static propTypes = {
    open: PropTypes.bool
  };

  static defaultProps = {
    open: false
  };

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
        <Grid>
          <Col width={1 / 10}><Label content='文字内容' height={40}/></Col>
          <Col width={9 / 10}><Input
            height={40}
            placeholder={this.textHint}
            onChange={(e, value) => this.textValue = value}/></Col>
        </Grid>
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
