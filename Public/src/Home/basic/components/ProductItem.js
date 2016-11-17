import React, { Component, PropTypes } from 'react';

import RaisedButton from '../../../Common/components/RaisedButton';

import SvgIcon from '../../../Common/components/SvgIcon';

import { keyboardArrowRight } from '../../../Common/svgIcons/google/Hardware';

class ProductItem extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	hover: false
        };
    }

	static propTypes = {
		img: PropTypes.string,
		imgHeight: PropTypes.number,
		labelheader: PropTypes.string,
		labelbody: PropTypes.string,
		buttonBgColor: PropTypes.string,
		activeBorderColor: PropTypes.string,
		rootStyle: PropTypes.object,
		onButtonClick: PropTypes.fun,
		buttonLabel: PropTypes.string
	};

	static defaultProps = {
		imgHeight: 310,
		buttonBgColor: '#ff8d5c',
		activeBorderColor: '#eee',
		rootStyle: {},
		buttonLabel: '马上体验'
	};

	render() {
		const { img, imgHeight, labelheader, labelbody, buttonBgColor, activeBorderColor, rootStyle, onButtonClick, buttonLabel } = this.props;
		
		return <div onMouseEnter={e => {
				this.setState({hover: true});
            }} onMouseLeave={e => {
            	this.setState({hover: false});
            }} style={Object.assign({boxSizing: 'border', padding: 5, 
            	boxShadow: this.state.hover ? '0px 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
            	border: this.state.hover ? `1px solid ${activeBorderColor}` : '1px solid transparent'}, rootStyle)}>
            <div style={{
                width: '100%', 
                height: 310,
                marginBottom: 10,
                backgroundImage: `url('${img}')`,
                backgroundPosition: 'center'
            }}></div>
            <div style={{margin: '10px 5px'}}><p style={{fontSize: 30}}>{labelheader}</p>
            <p style={{fontSize: 16}}>{labelbody}</p></div>
            <RaisedButton label={buttonLabel} bgColor={buttonBgColor} fontSize={18} rightIcon={
                <SvgIcon>
                    <path d={keyboardArrowRight} />
                </SvgIcon>
            } onClick={e => {
                if(onButtonClick) {
                	onButtonClick(e);
                }
            }}/>
        </div>;
	}

}

export default ProductItem;