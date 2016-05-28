import React, { Component, PropTypes } from 'react';

import { GUTTER } from '../styles/constants';

import Paper from './Paper';

function getStyles(props) {
	return {
		root: {
			position: 'absolute',
			top: 0,
			left: 0,
			padding: GUTTER,
			width: 100,
		}
	};
}

export default class Popover extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open
		};
	}
	static propTypes = {
		children: PropTypes.node,
		anchorEl: PropTypes.object,
		onRequestClose: PropTypes.func,
		open: PropTypes.bool,
 		style: PropTypes.object,
 		zDepth: PropTypes.number
	};

	static defaultProps = {
		onRequestClose: () => {},
		open: false,
		zDepth: 1
	};

	render() {
		const { children } = this.props;
		const styles = getStyles(this.props);
		return (
			<Paper style={styles.root}>
				{children}
			</Paper>
		);
	}

}