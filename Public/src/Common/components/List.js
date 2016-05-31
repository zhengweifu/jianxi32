import React, { Component, PropTypes } from 'react';

import { CYAN200, GREY300, GREY600 } from '../styles/colors';

import { GUTTER, FONT_FAMILY_DEFAULT, FONT_SIZE_DEFAULT } from '../styles/constants';

import { fade, darken } from '../utils/colorManipulator';

function getStyles(props) {
	return { 
		root: {
			listStyle: 'none',
			margin: 0,
			padding: 0
		},

		item: {
			padding: 10,
			color: props.color,
			fontFamily: props.fontFamily,
			fontSize: props.fontSize,
			margin: props.gutter,
			position: 'relative'
		},

		itemLeft: {
			position: 'absolute',
			left: 10,
			top: 0,
			bottom: 0,
			height: 24,
			margin: 'auto'
		},

		itemCenter: {
		},

		itemRight: {
			position: 'absolute',
			right: 10,
			top: 0,
			bottom: 0,
			height: 24,
			margin: 'auto'
		}
	};
}

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: props.items,
			hoverIndex: -1,
			activeIndex: -1
		};

		this.placeholder = document.createElement('li');
		this.placeholder.style.height = '40px';
		this.placeholder.style.boxSizing = 'border-box';
		this.placeholder.style.margin = `${props.gutter}px`;
		this.placeholder.style.border = `2px dashed ${CYAN200}`;
	}

	static propsTypes = {
		items: PropTypes.arrayOf(PropTypes.objectOf({
			leftIcon: PropTypes.node,
			title: PropTypes.string,
			rightIcon: PropTypes.node
		})),
		style: PropTypes.object,
		itemStyle: PropTypes.object,
		color: PropTypes.string,
		bgColor: PropTypes.string,
		hoverColor: PropTypes.string,
		activeColor: PropTypes.string,
		onMouseLeave: PropTypes.func,
		onMouseEnterv: PropTypes.func,
		onClick: PropTypes.func,
		gutter: PropTypes.number,
		fontSize: PropTypes.number,
		fontFamily: PropTypes.string
	};

	static defaultProps = {
		color: GREY600,
		bgColor: GREY300,
		activeColor: CYAN200,
		fontSize: FONT_SIZE_DEFAULT,
		fontFamily: FONT_FAMILY_DEFAULT,
		gutter: GUTTER
	};

	dragStart = (e) => {
		this.dragged = e.currentTarget;
		e.dataTransfer.effectAllowed = 'move';

		// Firefox requires calling dataTransfer.setData
		// for the drag to properly work
		e.dataTransfer.setData('text/html', e.currentTarget);
	};

	dragEnd = (e) => {
		this.dragged.style.display = 'block';
		this.dragged.parentNode.removeChild(this.placeholder);

		// Update state
		let items = this.state.items;
		let from = Number(this.dragged.dataset.id);
		let to = Number(this.over.dataset.id);
		if(from < to) {
			to--;
		}

		items.splice(to, 0, items.splice(from, 1)[0]);
		this.setState({items: items, hoverIndex: to, activeIndex: to});
	};

	dragOver = (e) => {
		e.preventDefault();
		this.dragged.style.display = 'none';
		if(e.target.className == 'placeholder') {
			return;
		}
		this.over = e.target;
		e.target.parentNode.insertBefore(this.placeholder, e.target);
	};

	render() {
		const { style, itemStyle, color, bgColor, hoverColor, activeColor, onMouseEnter, onMouseLeave, onClick } = this.props;

		let styles = getStyles(this.props);
		return (
			<ul style={Object.assign(styles.root, style)}>
				{ this.state.items.map((item, index) => {
					let backgroundColor = bgColor;

					if(index === this.state.activeIndex) {
						if(activeColor) {
							backgroundColor = activeColor;
						}
					}

					if(index === this.state.hoverIndex) {
						backgroundColor = hoverColor ? backgroundColor : darken(backgroundColor, 0.1);
					}

					let centerStyle = {};

					let leftElement = '', rightElement = '';

					if(item.leftIcon) {
						centerStyle.marginLeft = 30;
						const leftIconCloned = React.cloneElement(item.leftIcon, {
							color: color
						});
						leftElement = <div style={styles.itemLeft}>{leftIconCloned}</div>;
					}

					const centerElement = <div style={centerStyle}>{item.title}</div>;

					if(item.rightIcon) {
						const rightIconCloned = React.cloneElement(item.rightIcon, {
							color: color
						});
						rightElement = <div style={styles.itemRight}>{rightIconCloned}</div>;
					}

					return (
						<li key={item.title + '_' + index}
							data-id={index}
							style={Object.assign({}, styles.item, itemStyle, {backgroundColor: backgroundColor})}
							draggable='true'
							onDragEnd={this.dragEnd}
							onDragStart={this.dragStart}
							onDragOver={this.dragOver}
							onMouseLeave={e => {
								this.setState({hoverIndex: -1});
								if(onMouseLeave) {
									onMouseLeave(e, item.title, index);
								}
							}}
							onMouseEnter={e => {
								this.setState({hoverIndex: index});
								if(onMouseEnter) {
									onMouseEnter(e, item.title, index);
								}
							}}
							onClick={e => {
								this.setState({activeIndex: index});
								if(onClick) {
									onClick(e, item.title, index);
								}
							}}>
							{leftElement}
							{centerElement}
							{rightElement}
						</li>
					);
				})}
			</ul>
		);
	}
}