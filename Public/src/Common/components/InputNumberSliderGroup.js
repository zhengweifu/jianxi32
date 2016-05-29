import React, { Component, PropTypes } from 'react';

import InputNumberSlider from './InputNumberSlider'; 

import VerticalSeparation from './VerticalSeparation';

import SvgIcon from './SvgIcon';

import SetToRange from '../utils/SetToRange';

import { CYAN500, GREY500 } from '../styles/colors';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../styles/constants';

const lockColor = CYAN500;

const unLockColor = GREY500;

const lockIconPath = <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'/>;

const unLockIconPath = <path d='M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z'/>;

function getStyles(props, state) {
	const { 
		defaults, 
		cellHeight, 
		gutterY, 
		iconSize,
		title,
		titleWidth, 
		titleColor, 
		titleFontSize,
		titleFontFamily } = props;

	const count = defaults.length;
	const height = count * cellHeight + gutterY * (count - 1);
	const borderColor = state.lock ? lockColor : unLockColor;
	const gutter = 5;
	return {
		root: {
			position: 'relative',
			height: height
		},
		title: {
			position: 'absolute',
			left: 0,
			top: 0,
			bottom: 0,
			// backgroundColor: '#ff0',
			verticalAlign: 'middle',
			height: height,
			lineHeight: `${height}px`,
			margin: 'auto',
			width: titleWidth,
			color: titleColor,
			fontSize: titleFontSize,
			fontFamily: titleFontFamily
		},
		slider: {
			position: 'absolute',
			left: title ? titleWidth : 0,
			top: 0,
			right: 25
		},
		icon: {
			position: 'absolute',
			backgroundColor: '#fff',
			height: iconSize + 2,
			top: (height - iconSize - 4) / 2,
			right: 0
		},
		line: {
			boxSizing: 'border-box',
			position: 'absolute',
			top: cellHeight / 2,
			bottom: cellHeight / 2,
			right: iconSize / 2,
			width: 3,

			borderColor: borderColor,
			borderStyle: 'solid',
			borderTopWidth: 1,
			borderRightWidth: 1,
			borderLeftWidth: 0,
			borderBottomWidth: 1,
			// borderTopRightRadius: 5
		}
	};
} 
	
export default class InputNumberSliderGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lock: props.lock,
			values: props.defaults
		};
	}

	onIconClick = () => {
		this.setState({lock: !this.state.lock});
	};

	static propTypes = {
		gutterY:  PropTypes.number,
		cellHeight: PropTypes.number,
		type: PropTypes.oneOf(['INT', 'NUMBER']),
		iconSize: PropTypes.number,
		defaults: PropTypes.arrayOf(PropTypes.number).isRequired,
		title: PropTypes.string,
		titleWidth: PropTypes.number,
		titleColor: PropTypes.string,
		labels: PropTypes.arrayOf(PropTypes.string),
		labelWidth: PropTypes.number,
		labelColor: PropTypes.string,
		max: PropTypes.number.isRequired,
		min: PropTypes.number.isRequired
	};

	static defaultProps = {
		gutterY: 5,
		iconSize: 16,
		labelWidth: 10,
		cellHeight: 30,
		titleWidth: 50,
		titleColor: GREY500,
		titleFontSize: FONT_SIZE_DEFAULT,
		titleFontFamily: FONT_FAMILY_DEFAULT,
		type: 'NUMBER'
	};

	renderItems() {
		const { lock, values } = this.state;
		const { cellHeight, max, min, type, labels, labelWidth, labelColor } = this.props;
		return values.map((value, index) => {
			const label = labels && labels.length > index ? labels[index] : undefined;
			return (
				<InputNumberSlider
					onChange={(e, v) => {
						if(lock) {
							const scale = (v - value) / (max - min);
							let newValues = [...values];
	
							for(let i = 0; i < newValues.length; i++) {
								newValues[i] += scale * (max - min);

								// newValues[i] = SetToRange(newValues[i], min, max);
							}

							this.setState({values: newValues});
						} else {
							let newValues = [...values];
							newValues[index] = v;
							this.setState({values: newValues});
						}
						
					}}
					label={label}
					type={type}
					labelWidth={labelWidth}
					labelColor={labelColor}
					cellHeight={cellHeight}
					key={'inputNumberSliderGroup_' + index} 
					max={max} min={min} 
					defaultValue={value} />
			);
		});
	}

	render() {
		const { iconSize, gutterY, title } = this.props;

		const icon = this.state.lock ?
			<SvgIcon color={lockColor}
				width={iconSize}
				height={iconSize}
				onClick={this.onIconClick}>
				{lockIconPath}
			</SvgIcon> :
			<SvgIcon color={unLockColor}
				width={iconSize}
				height={iconSize}
				onClick={this.onIconClick}>
				{unLockIconPath}
			</SvgIcon>;

		const styles = getStyles(this.props, this.state);

		const titleDiv = title ? <div style={styles.title}>{title}</div> : '';
		return (
			<div style={styles.root}>
				{titleDiv}
				<div style={styles.slider}>
					<VerticalSeparation gutter={gutterY}>
						{this.renderItems()}
					</VerticalSeparation>
				</div>
				<div style={styles.line}></div>
				<div style={styles.icon}>{icon}</div>
			</div>
		);
	}

}