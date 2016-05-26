import React, { Component, PropTypes } from 'react';

function getStyles(props, state) {
	return {
		root: {
			display: 'inline-block',
			fill: state.hovered ? props.color : props.hoverColor,
			height: 24,
			width: 24,
			userSelect: 'none'
		}
	};
}

export default class SvgIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		};
	}

	static propTypes = {
		children: PropTypes.node,
		color: PropTypes.string,
		hoverColor: PropTypes.string,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		viewBox: PropTypes.string,
		style: PropTypes.object
	};

	static defaultProps = {
		color: '#ccc',
		hoverColor: '#eee',
		viewBox: '0 0 24 24'
	};

	handleMouseEnter(e) {
		this.setState({hovered: true});
		if(this.props.onMouseEnter) {
			this.props.onMouseEnter(e);
		}
	}

	handleMouseLeave(e) {
		this.setState({hovered: false});
		if(this.props.onMouseLeave) {
			this.props.onMouseLeave(e);
		}
	}

	render() {
		const styles = getStyles(this.props, this.state);
		return (
			<svg
				viewBox={this.props.viewBox}
				onMouseEnter={this.handleMouseEnter.bind(this)}
        		onMouseLeave={this.handleMouseLeave.bind(this)}
				style={Object.assign({}, styles.root, this.props.style)}>
				{this.props.children}
			</svg>
		);
	}
}