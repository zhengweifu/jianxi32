import React, { Component, PropTypes } from 'react';

import InputNumberSlider from './InputNumberSlider'; 

import SvgIcon from './SvgIcon';

import SetToRange from '../utils/SetToRange';

const lockColor = 'rgb(0, 188, 212)';
const unLockColor = 'rgb(200, 200, 200)';

const lockIconPath = <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'/>;

const unLockIconPath = <path d='M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z'/>;

function getStyles(props, state) {
	const count = props.defaults.length;
	const height = count * 24;
	const borderColor = state.lock ? lockColor : unLockColor;
	return {
		root: {
			position: 'relative',
			height: height
		},
		slider: {
			position: 'absolute',
			left: 0,
			top: 0,
			right: 25
		},
		icon: {
			position: 'absolute',
			top: (height - props.iconSize + 4) / 2,
			right: 0
		},
		topLine: {
			position: 'absolute',
			top: 12,
			right: props.iconSize / 2,
			width: 3,
			height: (height - props.iconSize - 26) / 2,
			borderColor: borderColor,
			borderStyle: 'solid',
			borderTopWidth: 1,
			borderRightWidth: 1,
			borderLeftWidth: 0,
			borderBottomWidth: 0,
			// borderTopRightRadius: 5
		},
		bottomLine: {
			position: 'absolute',
			bottom: 8,
			right: props.iconSize / 2,
			width: 3,
			height: (height - props.iconSize - 25) / 2,
			borderColor: borderColor,
			borderStyle: 'solid',
			borderTopWidth: 0,
			borderRightWidth: 1,
			borderLeftWidth: 0,
			borderBottomWidth: 1,
			// borderBottomRightRadius: 5
		},
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
		type: PropTypes.oneOf(['INT', 'NUMBER']),
		iconSize: PropTypes.number,
		defaults: PropTypes.arrayOf(PropTypes.number).isRequired,
		labels: PropTypes.arrayOf(PropTypes.string),
		labelWidth: PropTypes.number,
		max: PropTypes.number.isRequired,
		min: PropTypes.number.isRequired
	};

	static defaultProps = {
		iconSize: 16,
		labelWidth: 10,
		type: 'NUMBER'
	};

	renderItems() {
		const { lock, values } = this.state;
		const { max, min, type, labels, labelWidth } = this.props;
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
					key={'inputNumberSliderGroup_' + index} 
					max={max} min={min} 
					defaultValue={value} />
			);
		});
	}

	render() {
		const { iconSize } = this.props;

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
		return (
			<div style={styles.root}>
				<div style={styles.slider}>{this.renderItems()}</div>
				<div style={styles.topLine}></div>
				<div style={styles.icon}>{icon}</div>
				<div style={styles.bottomLine}></div>
			</div>
		);
	}

}