import React from 'react';
import ProductItem from '../components/ProductItem';

export default class PatternLibrariesGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.activeIndex
    };
  }

  onHandleItemClick(event, src, title, other) {
    if(other !== null) {
      this.setState({
        activeIndex: other,
      });
    }
    // console.log(src, title, other);
  }

  renderItems() {
    return this.props.items.map((item, index) => {
      let mactive = (this.state.activeIndex == index) ? true : false;
      return (
        <div key={index} className='col-sm-2' style={{margin: '5px 0'}}>
          <ProductItem
            img={item.img}
            title={item.describtion}
            onClick={this.onHandleItemClick.bind(this)}
            other={index}
            active={mactive}/>
        </div>
      );
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.activeIndex !== undefined) {
      this.setState({
        activeIndex: newProps.activeIndex,
      });
    }
  }

  render() {
    return (
      <div className='row' style={{}}>
        {this.renderItems()}
      </div>
    );
  }
}

PatternLibrariesGroup.defaultProps = {
  activeIndex: -1,
  items: []
};

PatternLibrariesGroup.propTypes = {
  activeIndex: React.PropTypes.number,
  items: React.PropTypes.array
};
