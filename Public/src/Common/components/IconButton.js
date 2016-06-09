import React, { Component, PropTypes } from 'react';

import { lighten } from '../utils/colorManipulator';

function getStyles(props) {
	const { padding, fullWidth } = props;
	return {
		root: {
			display: fullWidth ? 'block' : 'inline-block',
			textAlign: 'center',
			padding: padding
		}
	};
}

class IconButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        };
    }

	static propTypes = {
		icon: PropTypes.node.isRequired,
		padding: PropTypes.number,
		style: PropTypes.object,
		color: PropTypes.string,
		hoverColor: PropTypes.string,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func,
        fullWidth: PropTypes.bool
	};

	static defaultProps = {
		padding: 5,
		style: {},
		fullWidth: false
	};

    handleMouseEnter(e) {
        this.setState({hovered: true});
        if(this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
        }
    }

    handleMouseLeave(e) {
        this.setState({hovered: false});
        if(this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    }

	render() {
		const {
			icon,
			style,
			color,
			hoverColor,
			onClick
		} = this.props;

		const styles = getStyles(this.props); 

		const iconColor = this.state.hovered ? ( hoverColor ? hoverColor : lighten(color, 0.5) ) : color;

		const iconElement = React.cloneElement(icon, {
			color: iconColor
		});

		return (
			<div 
				style={Object.assign({}, styles.root, style)}
				onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
                onClick={e => {
                    if(onClick) {
                        onClick(e);
                    }
                }}>
				{iconElement}
			</div>
		);
	}
}

export default IconButton;