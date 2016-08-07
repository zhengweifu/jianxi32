import React, { Component, PropTypes } from 'react';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../styles/constants';

import { GREY500 } from '../styles/colors';

class Label extends Component {
	static propTypes = {
		content: PropTypes.string,
		fontSize: PropTypes.number,
		fontFamily: PropTypes.string,
		color: PropTypes.string,
		height: PropTypes.number,
		style: PropTypes.object
	};

	static defaultProps = {
		content: 'Label',
		fontSize: FONT_SIZE_DEFAULT,
		fontFamily: FONT_FAMILY_DEFAULT,
		color: GREY500,
		height: 20,
		style: {}
	};

	render() {
		const {
			content,
			fontSize,
			fontFamily,
			color,
			height,
			style
		} = this.props;

		const defaultStyle = {
			verticalAlign: 'middle',
			height: height,
			lineHeight: `${height}px`,
			color: color,
			fontSize: fontSize,
			fontFamily: fontFamily
		};

		return (
			<span style={Object.assign({}, defaultStyle, style)}>{content}</span>
		);

	}

}

export default Label;