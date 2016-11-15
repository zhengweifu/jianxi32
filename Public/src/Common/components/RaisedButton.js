import React, { Component, PropTypes } from 'react';

import { fade, lighten } from '../utils/colorManipulator';

import { GREY100, GREY400 } from '../styles/colors';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../styles/constants';

import Paper from './Paper';

import IsMobile from '../utils/IsMobile';

const isMobile = IsMobile.Any();

function getStyles(props) {
	return {
		root: {
			display: props.fullWidth ? 'block' : 'inline-block'
		},
		button: {
			padding: '0px 10px',
			textAlign: 'center'
		},
		item: {
			display: 'inline-block'
		},
		label: {
			color: props.labelColor,
			display: 'inline-block',
			padding: '5px 0px',
			fontFamily: props.fontFamily,
			fontSize: props.fontSize
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
			hovered: false,
			toggled: props.toggled
		};
	}

	static propTypes = {
		style: PropTypes.object,
		styleButton: PropTypes.object,
		bgColor: PropTypes.string,
		hoverColor: PropTypes.string,
		fullWidth: PropTypes.bool,
		label: PropTypes.string,
		labelColor: PropTypes.string,
		fontSize: PropTypes.number,
		fontFamily: PropTypes.string,
		leftIcon: PropTypes.node,
		rightIcon: PropTypes.node,
		toggle: PropTypes.bool,
		toggled: PropTypes.bool,
		toggledColor: PropTypes.string,
		onMouseDown: PropTypes.func,
		onMouseUp: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onTouchEnd: PropTypes.func,
		onTouchStart: PropTypes.func,
		onClick: PropTypes.func
	};

	static defaultProps = {
		style: {},
		styleButton: {},
		bgColor: GREY400,
		fullWidth: false,
		label: 'RaisedButton',
		labelColor: GREY100,
		toggle: false,
		toggled: false,
		fontSize: FONT_SIZE_DEFAULT,
		fontFamily: FONT_FAMILY_DEFAULT
	};

	handleMouseEnter(e) {
		if(!isMobile) {
			this.setState({hovered: true});
			if(this.props.onMouseEnter) {
				this.props.onMouseEnter(e);
			}
		}
	}

	handleMouseLeave(e) {
		if(!isMobile) {
			this.setState({hovered: false});
			if(this.props.onMouseLeave) {
				this.props.onMouseLeave(e);
			}
		}
	}
    componentWillReceiveProps(newProps) {
        if(newProps.toggled !== undefined) {
            this.setState({
                toggled: newProps.toggled
            });
        }
    }

	render() {
		const {
			label,
			labelColor,
			bgColor,
			hoverColor,
			leftIcon,
			rightIcon,
			style,
			styleButton,
			toggle,
			toggled,
			toggledColor,
			onClick
		} = this.props;

		const styles = getStyles(this.props);

        let nbgColor = toggle && this.state.toggled ? toggledColor ? toggledColor : lighten(bgColor, 0.2) : bgColor;

		nbgColor = this.state.hovered ? hoverColor ? hoverColor : lighten(bgColor, 0.2) : nbgColor;

		let iconLeftStyle = Object.assign({}, styles.icon);

		let labelStyle = styles.label;

		let iconRightStyle = Object.assign({}, styles.icon);

		if(leftIcon && label) {
			iconLeftStyle['paddingRight'] = 5;
		}

		if(rightIcon && label) {
			iconRightStyle['paddingLeft'] = 5;
		}

		const leftElement = leftIcon ? <div style={iconLeftStyle}>{React.cloneElement(leftIcon, {color: labelColor})}</div> : null;
		const centerElement = <span style={labelStyle}>{label}</span>;
		const rightElement = rightIcon ? <div style={iconRightStyle}>{React.cloneElement(rightIcon, {color: labelColor})}</div> : null;

		return (
			<Paper style={Object.assign({}, styles.root, style)} bgColor={nbgColor}>
				<div style={Object.assign({}, styles.button, styleButton)} 
					onMouseLeave={this.handleMouseLeave.bind(this)}
					onMouseEnter={this.handleMouseEnter.bind(this)}
					onClick={e => {
						if(toggle) {
                            this.setState({toggled: !this.state.toggled});
                        }
						if(onClick) {
							onClick(e);
						}
					}}>
					<div style={styles.item}>
						{leftElement}
						{centerElement}
						{rightElement}
					</div>
				</div>
			</Paper>
		);
	}
}