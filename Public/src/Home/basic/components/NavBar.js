import React, { Component, PropTypes } from 'react';

import GridList from '../../../Common/components/GridList';

import Label from '../../../Common/components/Label';

import IconButton from '../../../Common/components/IconButton';

import SvgIcon from '../../../Common/components/SvgIcon';

import VerticalMiddle from '../../../Common/components/VerticalMiddle';

import Popover from '../../../Common/components/Popover';

import { FONT_FAMILY } from '../../../config';

import { SCREEN_SIZE, GetDocumentSize } from '../../../Common/utils/basic';

import { dehaze, image } from '../../../Common/svgIcons/google/Image';

import { close } from '../../../Common/svgIcons/google/Navigation';

import { MorphReplace } from 'react-svg-morph';

require('../../../Common/sasses/clearfix.scss');

function getStyles(props) {
	const itemWidth = 150;
	return {
		root: {
			width: '100%',
			backgroundColor: 'rgba(230, 230, 230, 0.95)'
		},

		popover: {
			backgroundColor: 'rgba(230, 230, 230, 0.95)',
			border: 'none',
			borderTop: `2px solid ${props.activeBgColor}`,
			borderRadius: 0,
			padding: 0,
			boxShadow: 'none'
		},

		pcLeft: {
			float: 'left',
			marginLeft: 50
		},

		pcRight: {
			float: 'right',
			width: itemWidth * props.items.length,
			marginRight: 100
		},
		mobileLeft: {
			float: 'left',
			marginLeft: '10%'
		},

		mobileRight: {
			float: 'right',
			marginRight: '10%'
		}
	};
}

class IconOpen extends React.Component {
    render() {
        return (
            <svg width="24" fill="#00ea00" height="24" viewBox="0 0 24 24">
                <path d={dehaze}/>
            </svg>
        );
    }
}

class IconClose extends React.Component {
    render() {
        return (
            <svg width="24" height="24" fill="#666666" viewBox="0 0 24 24">
                <path d={close}/>
            </svg>
        );
    }
}

class NavBar extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	activeIndex: 0,
        	docWidth: GetDocumentSize().width,
        	open: false
        };

        window.addEventListener('resize', event => {
            this.setState({docWidth: GetDocumentSize().width});
        }, false );
    }

	static propTypes = {
		logo: PropTypes.string.isRequired,
		items: PropTypes.array,
		height: PropTypes.number,
		activeBgColor: PropTypes.string,
		defaultColor: PropTypes.string,
		activeColor: PropTypes.string,
		rootStyle: PropTypes.object,
		onItemClick: PropTypes.fun
	};

	static defaultProps = {
		height: 84,
		activeBgColor: '#ff8d5c',
		defaultColor: '#777777',
		activeColor: '#ffffff',
		rootStyle: {}
	};

	render() {
		const { logo, items, rootStyle, height, activeBgColor, defaultColor, activeColor, onItemClick } = this.props;

		const styles = getStyles(this.props);

		const itemElements = items.map((item, index) => {
			return <div key={`navbar_item_${index}`} style={{
				height: height,
				backgroundColor: this.state.activeIndex == index ? activeBgColor : 'transparent',
			}} onClick={e => {
				this.setState({activeIndex: index, open: false});
				if(onItemClick) {
					onItemClick(e, item, index);
				}
			}}><Label style={{padding: '0px 10px'}} content={item} fontFamily={FONT_FAMILY} fontSize={16} color={this.state.activeIndex == index ? activeColor : defaultColor} height={height}/></div>;
		});

		const pcElement = <div style={Object.assign({}, styles.root, rootStyle)}>
			<div className='clearfix'>
				<div style={styles.pcLeft}><VerticalMiddle height={height}><img src={logo}/></VerticalMiddle></div>
				<div style={styles.pcRight}><GridList cols={items.length} center={true}>
					{itemElements}
				</GridList></div>
			</div>
		</div>;
		console.log('xx:', this.state.open);

		// const menuLineWidth = 20, menuLineHeight = 2;

		// const menuItem = {
		// 	position: 'relative',
		// 	// height: 50,
		// 	// width: 50
		// 	// transform: 'rotate(45deg)'
		// };

		// const menuItemLine = {
		// 	position: 'absolute',
		// 	width: menuLineWidth,
		// 	height: menuLineHeight,
		// 	backgroundColor: activeBgColor,
		// 	transition: 'transform 500ms ease-out'
		// };

		// const sin45 = this.state.open ? 0.8509 : 0;
		// const cos45 = this.state.open ? 0.8509 : 1;

		// <VerticalMiddle height={height}><div style={menuItem} onClick={e => {
		// 	this.setState({open: !this.state.open});
		// }}>
		// 	<div style={Object.assign({}, menuItemLine, {
		// 		transform: `matrix(${cos45}, ${sin45}, ${-sin45}, ${cos45}, 0, 0)`
		// 	})}></div>
		// 	<div style={Object.assign({}, menuItemLine, {
		// 		transform: `matrix(${cos45}, ${-sin45}, ${sin45}, ${cos45}, 0, ${this.state.open ? 0 : 10})`
		// 	})}></div>
		// </div></VerticalMiddle>
		const mobileElement = <div style={Object.assign({}, styles.root, rootStyle)}>
			<div className='clearfix'>
				<div style={styles.mobileLeft}><VerticalMiddle height={height}><img src={logo}/></VerticalMiddle></div>
				<div style={styles.mobileRight}>
					
					<VerticalMiddle height={height}><IconButton color={activeBgColor} icon={<MorphReplace rotation='none'>
						<SvgIcon key={this.state.open ? 'icon_open' : 'icon_close'} width={height / 2} height={height / 2}>
							<path fill={activeBgColor} d={this.state.open ? close : dehaze}/>
						</SvgIcon>
					</MorphReplace>} onClick={e => {
						this.setState({open: !this.state.open});
				}}/></VerticalMiddle>
				</div>
			</div>
			<Popover open={this.state.open} isUseSlideAnimation={true} outClickClose={false} style={styles.popover} onRequestClose={e => this.setState({open: false})}>
				{itemElements}
			</Popover>
		</div>;
		
		if(this.state.docWidth < SCREEN_SIZE.md) {
			return mobileElement;
		} else {
			return pcElement;
		}
		
	}

}

export default NavBar;