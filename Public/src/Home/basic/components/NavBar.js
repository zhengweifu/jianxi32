import React, { Component, PropTypes } from 'react';

import GridList from '../../../Common/components/GridList';

import Label from '../../../Common/components/Label';

import IconButton from '../../../Common/components/IconButton';

import SvgIcon from '../../../Common/components/SvgIcon';

import VerticalMiddle from '../../../Common/components/VerticalMiddle';

import Popover from '../../../Common/components/Popover';

import { FONT_FAMILY } from '../../../config';

import { SCREEN_SIZE, GetDocumentSize } from '../../../Common/utils/basic';

import { dehaze } from '../../../Common/svgIcons/google/Image';

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

		const mobileElement = <div style={Object.assign({}, styles.root, rootStyle)}>
			<div className='clearfix'>
				<div style={styles.mobileLeft}><VerticalMiddle height={height}><img src={logo}/></VerticalMiddle></div>
				<div style={styles.mobileRight}>
				<VerticalMiddle height={height}><IconButton color={activeBgColor} icon={<SvgIcon width={height / 2} height={height / 2}>
					<path d={dehaze}/>
				</SvgIcon>} onClick={e => {
					this.setState({open: !this.state.open});
				}}/></VerticalMiddle></div>
				
			</div>
			<Popover open={this.state.open} outClickClose={false} style={styles.popover} onRequestClose={e => this.setState({open: false})}>
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