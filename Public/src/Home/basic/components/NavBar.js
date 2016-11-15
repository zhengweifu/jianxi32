import React, { Component, PropTypes } from 'react';

import GridList from '../../../Common/components/GridList';

import VerticalMiddle  from '../../../Common/components/VerticalMiddle';

require('../../../Common/sasses/clearfix.scss');

function getStyles(props) {
	const itemWidth = 150;
	return {
		root: {
			width: '100%',
			backgroundColor: 'rgba(230, 230, 230, 0.95)'
		},

		left: {
			float: 'left',
			marginLeft: 150
		},

		right: {
			float: 'right',
			width: itemWidth * props.items.length,
			marginRight: 200
		}
	};
}

class NavBar extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	activeIndex: 0
        };
    }

	static propTypes = {
		logo: PropTypes.string.isRequired,
		items: PropTypes.array,
		height: PropTypes.number,
		activeBgColor: PropTypes.string,
		defaultColor: PropTypes.string,
		activeColor: PropTypes.string,
		rootStyle: PropTypes.object
	};

	static defaultProps = {
		height: 84,
		activeBgColor: '#ff8d5c',
		defaultColor: '#777777',
		activeColor: '#ffffff',
		rootStyle: {}
	};

	render() {
		const { logo, items, rootStyle, height, activeBgColor, defaultColor, activeColor } = this.props;

		const styles = getStyles(this.props);

		const itemElements = items.map((item, index) => {
			return <div key={`navbar_item_${index}`} style={{
				padding: `${(height - 22) / 2}px 0px`,
				backgroundColor: this.state.activeIndex == index ? activeBgColor : 'transparent',
				color: this.state.activeIndex == index ? activeColor : defaultColor
			}} onClick={e => {
				this.setState({activeIndex: index});
			}}>{item}</div>;
		});

		const pcElement = <div style={Object.assign({}, styles.root, rootStyle)}>
			<div className='clearfix'>
				<div style={styles.left}><VerticalMiddle height={height}><img src={logo}/></VerticalMiddle></div>
				<div style={styles.right}><GridList cols={items.length} center={true}>
					{itemElements}
				</GridList></div>
			</div>
		</div>;

		return pcElement;
	}

}

export default NavBar;