import React from 'react';
import InputNumber from '../components/InputNumber';

import { IconButton, GridList, GridTile } from 'material-ui';

import { ContentAddCircle, ContentRemoveCircle} from 'material-ui/svg-icons/index';

export default class ProductNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  render() {
    return (
      <GridList
        cols={3}
        style={{width: 150}}
        cellHeight={48}>
        <IconButton onTouchTap={e => {
          if(this.state.value > 1) {
            let newValue = this.state.value - 1;
            this.setState({value: newValue});
          }
        }}>
          <ContentRemoveCircle color='#12aabc'/>
        </IconButton>

        <InputNumber type='INT' value={this.state.value} onChange={(e, v) => {
          if(parseInt(v) < 1) {
            this.setState({value: 1});
          };
        }}/>

        <IconButton onTouchTap={e => {
          let newValue = this.state.value + 1;
          this.setState({value: newValue});
        }}>
          <ContentAddCircle color='#12aabc'/>
        </IconButton>
      </GridList>
    );
  }
}

ProductNumber.defaultProps = {
  value: 1
};
