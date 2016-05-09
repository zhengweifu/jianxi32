import React, { Component, PropTypes } from 'react';
import SimpleItem from './SimpleItem';

export default class ImageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };
  }

  onHandleClick(event) {
    this.setState({active: true});
    if(this.props.onClick) {
      let other = this.props.other ? this.props.other : null;
      this.props.onClick(event, this.props.img, this.props.title);
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.active !== undefined) {
      this.state.active = newProps.active;
    }
  }

  render() {
    return (
      <SimpleItem
        title={this.props.title}
        active={this.state.active}
        onClick={(e, title) => {
          this.setState({active: true});
          if(this.props.onClick) {
            this.props.onClick(e, title, this.props.img);
          }
        }}>
        <img src={this.props.img} style={{maxWidth: '100%'}}/>
      </SimpleItem>
    );
  }
}

ImageItem.defaultProps = {
  active: false,
  activeColor: '#ccc'
};

ImageItem.propTypes = {
  active: PropTypes.bool,
  activeColor: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
