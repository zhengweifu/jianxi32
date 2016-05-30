import React, { Component, PropTypes } from 'react';

import { fade, lighten } from '../utils/colorManipulator';

import { GREY100, GREY400 } from '../styles/colors';

import Paper from './Paper';

function getStyles(props) {
	return {
		root: {
			display: props.fullWidth ? 'block' : 'inline-block'
		},
		button: {
			padding: '0px 20px',
			textAlign: 'center'
		},
		item: {
			display: 'inline-block'
		},
		label: {
			color: props.labelColor,
			display: 'inline-block',
			padding: '10px 0px'
		},
		icon: {
			display: 'inline-block',
			verticalAlign: 'middle'
		}
	};
}

export default class RaisedButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovered: false
		};
	}

	static propTypes = {
		style: PropTypes.object,
		bgColor: PropTypes.string,
		fullWidth: PropTypes.bool,
		label: PropTypes.string,
		labelColor: PropTypes.string,
		leftIcon: PropTypes.node,
		rightIcon: PropTypes.node,
		onMouseDown: PropTypes.func,
		onMouseUp: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onTouchEnd: PropTypes.func,
		onTouchStart: PropTypes.func,
		onClick: PropTypes.func
	};

	static defaultProps = {
		bgColor: GREY400,
		fullWidth: false,
		label: 'RaisedButton',
		labelColor: GREY100
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
		const styles = getStyles(this.props);

		const bgColor = this.state.hovered ? lighten(this.props.bgColor, 0.2) : this.props.bgColor;

		let iconLeftStyle = Object.assign({}, styles.icon);

		let labelStyle = styles.label;

		let iconRightStyle = Object.assign({}, styles.icon);

		if(this.props.leftIcon && this.props.label) {
			iconLeftStyle['paddingRight'] = 5;
		}

		if(this.props.rightIcon && this.props.label) {
			iconRightStyle['paddingLeft'] = 5;
		}

		return (
			<Paper style={Object.assign({}, styles.root, this.props.style)} bgColor={bgColor}>
				<div style={styles.button} 
					onMouseLeave={this.handleMouseLeave.bind(this)}
					onMouseEnter={this.handleMouseEnter.bind(this)}
					onClick={e => {
						if(this.props.onClick) {
							this.props.onClick(e);
						}
					}}>
					<div style={styles.item}>
						<div style={iconLeftStyle}>{this.props.leftIcon}</div>
						<span style={labelStyle}>{this.props.label}</span>
						<div style={iconRightStyle}>{this.props.rightIcon}</div>
					</div>
				</div>
			</Paper>
		);
	}
}