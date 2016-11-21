import React, { Component, PropTypes } from 'react';

import GridList from '../../../Common/components/GridList';

import Label from '../../../Common/components/Label';

import IconButton from '../../../Common/components/IconButton';

import SvgIcon from '../../../Common/components/SvgIcon';

import VerticalMiddle from '../../../Common/components/VerticalMiddle';

import Popover from '../../../Common/components/Popover';

import ListCloseSwitch from './ListCloseSwitch';

import { FONT_FAMILY } from '../../../config';

import { SCREEN_SIZE, GetDocumentSize } from '../../../Common/utils/basic';

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
				<div style={styles.pcLeft}><VerticalMiddle height={height}><img style={{verticalAlign: 'middle'}} src={logo}/></VerticalMiddle></div>
				<div style={styles.pcRight}><GridList cols={items.length} center={true}>
					{itemElements}
				</GridList></div>
			</div>
		</div>;

		const mobileElement = <div style={Object.assign({}, styles.root, rootStyle)}>
			<div className='clearfix'>
				<div style={styles.mobileLeft}><VerticalMiddle height={height}><img style={{verticalAlign: 'middle'}} src={logo}/></VerticalMiddle></div>
				<div style={styles.mobileRight}>
					<ListCloseSwitch isList={!this.state.open} height={height} onClick={(e, isList) => {
						this.setState({open: !isList});
					}}/>
				</div>
			</div>
			<Popover open={this.state.open} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} style={styles.popover} onRequestClose={e => this.setState({open: false})}>
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