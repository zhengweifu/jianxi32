import React, { Component, PropTypes } from 'react';

import InputNumber from './InputNumber';
import Slider from './Slider';

import SetToRange from '../utils/SetToRange';

function getStyles(props) {
	const { label, labelWidth, inputWidth, labelColor, labelFontSize, labelFontFamily } = props;
	const gutter = 5;
	return {
		root: {
			position: 'relative',
			height: 24
		},
		label: {
			position: 'absolute',
			left: 0,
			top: 0,
			bottom: 0,
			height: labelFontSize,
			margin: 'auto',
			width: labelWidth,
			color: labelColor,
			fontSize: labelFontSize,
			fontFamily: labelFontFamily
		},
		input: {
			position: 'absolute',
			left: label ? (labelWidth + gutter) : 0,
			top: 0,
			width: inputWidth
		},
		slider: {
			position: 'absolute',
			top: 8,
			left: label ? (labelWidth + inputWidth + gutter * 2) : (inputWidth + gutter),
			right: 0
		}
	};
}

export default class InputNumberSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.defaultValue
		};
	}

	static defaultProps = {
		fixed: 2,
		type: 'NUMBER',
		labelColor: '#f5f',
		labelFontSize: 12,
		labelFontFamily: '"Times New Roman",Georgia,Serif',
		labelWidth: 30,
		inputWidth: 55,
		defaultValue: 0,
		max: 10,
		min: 0
	};

	static propTypes = {
		fixed: PropTypes.number,
		label: PropTypes.string,
		labelColor: PropTypes.string,
		labelFontSize: PropTypes.number,
		labelFontFamily: PropTypes.string,
		labelWidth: PropTypes.number,
		inputWidth: PropTypes.number,
		onChange: PropTypes.func,
		defaultValue: PropTypes.number,
		value: PropTypes.number,
		type: PropTypes.oneOf(['INT', 'NUMBER']),
		max: PropTypes.number,
		min: PropTypes.number
	};

	componentWillMount() {
		let value = this.props.value;
		if (value === undefined) {
			value = this.props.defaultValue !== undefined ? this.props.defaultValue : this.props.min;
		}
		this.setState({value: value});
	}

	componentWillReceiveProps(newProps) {
		if(newProps.defaultValue !== undefined) {
			this.setState({
				value: newProps.defaultValue
			});
		}
	}

	onSliderHandleChange(event, value) {
		this.setState({value: value});

		if(this.props.onChange) {
			this.props.onChange(event, value);
		}
	}

	onInputHandleChange(event, value) {
		// value = parseFloat(event.target.value);
		this.setState({value: value});

		if(this.props.onChange) {
			this.props.onChange(event, value);
		}
	}

	render() {
		const { label, min, max, type } = this.props;

		let sliderValue = SetToRange(this.state.value, min, max);

		const styles = getStyles(this.props);
		const labelDiv = label ? <div style={styles.label}>{label}</div> : '';
		return (
			<div style={styles.root}>
				{labelDiv}
				<div style={styles.input}>
					<InputNumber
						value={Number(this.state.value.toFixed(this.props.fixed))}
						onChange={this.onInputHandleChange.bind(this)}
						type={type}/>
				</div>

				<Slider
					value={sliderValue}
					onChange={this.onSliderHandleChange.bind(this)}
					max={max}
					min={min}
					step={type === 'INT' ? 1 : 0.01}
					style={styles.slider}/>
			</div>
		);
	}
}
