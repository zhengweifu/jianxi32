import React, { Component, PropTypes } from 'react';

import Is from '../utils/Is';

require('../sasses/clearfix.scss');

function getStyles(props) {
	return {
		root: {
			marginLeft: -props.gutterWidth,
			marginRight: -props.gutterWidth,
		},

		item: {
			float: 'left',
			boxSizing: 'border-box',
			paddingLeft: props.gutterWidth,
			paddingRight: props.gutterWidth,
		},
	};
}

export default class GridList extends Component {
	static propTypes = {
		children: PropTypes.node,
		cols: PropTypes.number,
		gutterWidth: PropTypes.number,
		style: PropTypes.object,
	};

	static defaultProps = {
		cols: 2,
		gutterWidth: 5
	};

	render() {

		const styles = getStyles(this.props);

		let { children, cols } = this.props;

		if(!Is(children, 'Array')) {
			children = [children];
		}

		const wrappedChildren = children.map((child, index) => {
			const itemStyle = Object.assign({}, styles.item, {
				width: `${(100 / cols)}%`
			});
			return (
				<div key={'grid_' + index} style={Object.assign({}, itemStyle)}>{child}</div>
			);
		});

		return (
			<div style={Object.assign({}, styles.root, this.props.style)} className='clearfix'>{wrappedChildren}</div>
		);
	}
}