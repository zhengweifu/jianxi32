import React from 'react';
import { Dialog, RaisedButton, FontIcon, SvgIcon, AppBar, GridList, GridTile } from 'material-ui';

import ProductItem from '../components/ProductItem';

export default class ProductPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      currentActiveIndex: props.activeIndex
    };
  }

  onHandleOpen(event) {
    this.setState({open: true});
  }

  onHandleClose(event) {
    this.setState({open: false});
  }

  onHandleClick(event, src, title) {
    console.log(src, title);
  }

  renderItems(items) {
    return items.map((item, index) => {
      return (
        <div key={index} className='col-sm-2' style={{margin: '10px 0'}}>
          <ProductItem img={item.img} title={item.title} active={this.state.currentActiveIndex === index ? true : false}/>
        </div>
      );
    });
  }

  renderList() {
    return this.props.tilesData.map((data, index) => {
      return (
        <div key={index}>
          <div style={{
            padding: '10px 10px',
            fontSize: 14,
            borderRadius: 2,
            backgroundColor: this.props.bgColor,
            color: this.props.color
          }}>{data.title}</div>
          <div className='row'>
            {this.renderItems(data.items)}
          </div>
        </div>
      );
    });
  }

  render() {
    const actions = [
      <RaisedButton
        label='Cancel'
        secondary={true}
        onTouchTap={this.onHandleClose.bind(this)}
      />,
      <RaisedButton
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onHandleClose.bind(this)}
      />,
    ];
    return (
      <div>
        <RaisedButton
          label='选择产品'
          onTouchTap={this.onHandleOpen.bind(this)}
          icon={
            <SvgIcon>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" data-reactid=".0.0.0.0.1:2:$/=10.0"></path>
            </SvgIcon>
          }
          backgroundColor={this.props.bgColor}
          labelColor={this.props.color}/>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.onHandleClose.bind(this)}>
          {this.renderList()}
        </Dialog>
      </div>
    );
  }
}

ProductPanel.defaultProps = {
  active: false
};

ProductPanel.propTypes = {
  active: React.PropTypes.bool,
  bgColor: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  tilesData: React.PropTypes.array
};
