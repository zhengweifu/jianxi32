import React from 'react';

import { RaisedButton, IconButton, SvgIcon } from 'material-ui';


export default class NodeItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <RaisedButton label="Default" fullWidth={true} backgroundColor='#e7d3ca' labelPosition='before' style={{}} />
        <IconButton tooltip="bottom-left" touch={true} tooltipPosition="bottom-left" style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 10
          }}>
          <SvgIcon>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" data-reactid=".0.0.0.0.1:2:$/=10.0"></path>
          </SvgIcon>
        </IconButton>
      </div>
    );
  }
}

NodeItem.defaultProps = {
};

NodeItem.propTypes = {};
