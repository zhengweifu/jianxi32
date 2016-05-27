import React, { Component, PropTypes } from 'react';

import Paper from './Paper';

export default class Popover extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	render() {
		const {children} = this.props;
		return (
			<Paper>
				{children}
			</Paper>
		);
	}

}