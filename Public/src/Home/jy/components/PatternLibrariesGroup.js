import React from 'react';
import ImageItem from '../../../Common/components/ImageItem';
import { DEFAULT_ACTIVE_COLOR, DEFAULT_GRAY_COLOR } from '../config';
import GridList from '../../../Common/components/GridList';

export default class PatternLibrariesGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.activeIndex
    };
  }

  renderItems() {
    return this.props.items.map((item, index) => {
      let mactive = (this.state.activeIndex == index) ? true : false;
      return (
        <div key={index} style={{margin: '5px 0'}}>
          <ImageItem
            img={item.img}
            title={item.describtion}
            defaultBorderColor={DEFAULT_GRAY_COLOR}
            activeColor={DEFAULT_ACTIVE_COLOR}
            onClick={e => {
              this.setState({activeIndex: index});
              if(this.props.onItemClick) {
                this.props.onItemClick(e, item.img, item.describtion, index);
              }
            }}
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
      <GridList cols={5}>
        {this.renderItems()}
      </GridList>
    );
  }
}

PatternLibrariesGroup.defaultProps = {
  activeIndex: -1,
  items: []
};

PatternLibrariesGroup.propTypes = {
  activeIndex: React.PropTypes.number,
  items: React.PropTypes.array,
  onItemClick: React.PropTypes.func
};
