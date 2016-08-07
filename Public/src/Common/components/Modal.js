import React, { Component, PropTypes } from 'react';

import Overlay from './Overlay';

import Paper from './Paper';

import { OVERLAY_ZINDEX, MODAL_ZINDEX, MODAL_MAX_WIDTH } from '../styles/constants';

import { CYAN500, GREY300, PINK300 } from '../styles/colors';

import IconButton from './IconButton';

import SvgIcon from './SvgIcon';

import { clear } from '../svgIcons/google/Content';

require('../sasses/clearfix.scss');

import RaisedButton from './RaisedButton';

function getStyles(props, state) {
	const padding = 20;
	return {
		modal: {
			position: 'fixed',
			top: 0,
			left: 0,
			right:0,
			display: state.open ? 'block' : 'none',
			width: '75%',
			maxWidth: MODAL_MAX_WIDTH,
			margin: '80px auto',
			zIndex: MODAL_ZINDEX
		},

		overlay: {
			zIndex: OVERLAY_ZINDEX
		},

		modalHeader: {
			padding: padding,
			borderBottom: `1px solid ${GREY300}`,
			position: 'relative'
		},

		close: {
			position: 'absolute',
			top: 0,
			right: 0,
			padding: 16
		},

		modalBody: {
			padding: padding
		},

		modalFooter: {
			padding: `8px ${padding}px`,
			borderTop: `1px solid ${GREY300}`,
		}
	};
}

export default class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open
		};
	}

	static propTypes = {
		children: PropTypes.node,
		open: PropTypes.bool,
		overlayStyle: PropTypes.object,
		title: PropTypes.string,
		useActions: PropTypes.bool,
		actions: PropTypes.node,
		onOkClick: PropTypes.func
	};

	static defaultProps = {
		open: false,
		overlayStyle: {},
		useActions: true
	};

	componentWillReceiveProps(newProps) {
		if(newProps !== undefined && newProps.open !== this.state.open) {
			this.setState({open: newProps.open});
		}
	}

	render() {
		let { overlayStyle, title, actions, children, useActions, onOkClick } = this.props;

		if(React.Children.count(actions) <= 0 && useActions) {
			actions = [
				<RaisedButton label='取消' style={{marginRight: 10, padding: '0px 20px'}} bgColor={PINK300} onClick={e => {
					this.setState({open : false});
				}}/>,
				<RaisedButton label='确定' style={{padding: '0px 20px'}} bgColor={CYAN500} onClick={e => {
					if(onOkClick) {
						onOkClick(e);
					}
				}}/>
			];
		} 

		const styles = getStyles(this.props, this.state);

		const footer = actions && useActions ? 
				<div style={styles.modalFooter}>
					<div className='clearfix'><div style={{float: 'right'}}>
						{ React.Children.toArray(actions) }
					</div></div>
				</div> : '';

		const header = title && title.length > 0 ?
				<div style={styles.modalHeader}>
					{title}
					<div style={styles.close} onClick={e => {
						this.setState({open: false});
					}}>
						<IconButton color={GREY300} hoverColor={PINK300} padding={0}><SvgIcon>
							<path d={clear}/>
						</SvgIcon></IconButton>
					</div>
				</div> : '';
		return (
			<div>
				<div style={styles.modal}>
					<Paper>
						{header}
						<div style={styles.modalBody}>{children}</div>
						{footer}
					</Paper>
				</div>
				<Overlay show={this.state.open} style={Object.assign({}, styles.overlay, overlayStyle)}/>
				
			</div>
		);
	}
}