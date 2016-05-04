import React from 'react';

export default class ProductItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };
  }

  onHandleClick(event) {
    this.setState({active: true});
    if(this.props.onClick) {
      this.props.onClick(event, this.props.img, this.props.title);
    }
  }

  render() {
    return (
      <div
        onClick={this.onHandleClick.bind(this)}
        style={{
          padding: 10,
          textAlign: 'center',
          border: this.state.active ? `1px solid ${this.props.activeColor}` : 'none'
        }}>
        <img src={this.props.img} style={{maxWidth: '100%'}}/>
        <span style={{fontSize: 12}}>{this.props.title}</span>
      </div>
    );
  }
}

ProductItem.defaultProps = {
  active: false,
  activeColor: '#ccc'
};

ProductItem.propTypes = {
  active: React.PropTypes.bool,
  activeColor: React.PropTypes.string,
  img: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};
