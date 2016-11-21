import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom';

import { GUTTER } from '../styles/constants';

import Paper from './Paper';

import { GREY300 } from '../styles/colors';

import Dom from '../utils/dom';
 
import { GetElementHeight } from '../utils/basic';

function getStyles(props, state) {
	const {
		zDepth,
		maxHeight,
		isUseSlideAnimation
	} = props;
	return {
		root: {
			position: 'relative',
			top: 0,
			left: 0,
			width: '100%',
			display: isUseSlideAnimation ? 'block' : (state.open ? 'block' : 'none')
		},
		self: {
			// backgroundColor: '#f00',
			border: `1px solid ${GREY300}`,
			position: 'absolute',
			top: 0,
			left: 0,
			padding: GUTTER,
			width: '100%',
			maxHeight: isUseSlideAnimation ? (state.open ? maxHeight : 0) : maxHeight,
			transition: `max-height ${maxHeight}ms ease-out`,
			overflow: 'hidden',
			zIndex: zDepth,
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
		onRequestClose: PropTypes.func,
		open: PropTypes.bool,
		isUseSlideAnimation: PropTypes.bool,
 		style: PropTypes.object,
 		outClickClose: PropTypes.bool,
 		maxHeight: PropTypes.number,
 		zDepth: PropTypes.number
	};

	static defaultProps = {
		open: false,
		isUseSlideAnimation: false,
		zDepth: 10,
		outClickClose: true,
		maxHeight: 300
	};

	handleRequestClose = (e) => {
		// console.log( Dom.isDescendant(this.element, e.target), document.documentElement.contains(e.target));
		if(!(e.target == this.element || Dom.isDescendant(this.element, e.target))) {
			// console.log('xx: ', this.state.open);
			if(this.state.open) {
				this.setState({open : false});
			}
			if(this.props.onRequestClose) {
				this.props.onRequestClose(e);
			}
			window.removeEventListener('mouseup', this.handleRequestClose, false);
		}

	};

	componentWillReceiveProps(newProps) {
		if(newProps.open !== this.state.open ) {
			this.setState({open: newProps.open});
		}
	}

	render() {
		if(this.state.open && this.props.outClickClose) {
			setTimeout(() => {
				window.addEventListener('mouseup', this.handleRequestClose, false);
			}, 1000);
		}

		const { children, style } = this.props;
		const styles = getStyles(this.props, this.state);
		return (
			<div style={styles.root}>
				<Paper style={Object.assign({}, styles.self, style)} ref={ref => this.element = ReactDOM.findDOMNode(ref)}>
					{children}
				</Paper>
			</div>
		);
	}

}