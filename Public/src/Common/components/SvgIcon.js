import React, { Component, PropTypes } from 'react';

import { GREY100 } from '../styles/colors';

import { lighten } from '../utils/colorManipulator';

function getStyles(props, state) {
    let hoverColor = props.hoverColor ? props.hoverColor : lighten(props.color, 0.5);

    return {
        root: {
            display: 'inline-block',
            fill: state.hovered ? hoverColor : props.color,
            height: props.height || 24,
            width: props.width || 24,
            userSelect: 'none'
        }
    };
}

export default class SvgIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        };
    }

    static propTypes = {
        children: PropTypes.node,
        color: PropTypes.string,
        hoverColor: PropTypes.string,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func,
        width: PropTypes.number,
        height: PropTypes.number,
        viewBox: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        color: GREY100,
        viewBox: '0 0 24 24'
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
        const styles = getStyles(this.props, this.state);
        return (
            <svg
                viewBox={this.props.viewBox}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
                onClick={e => {
                    if(this.props.onClick) {
                        this.props.onClick();
                    }
                }}
                style={Object.assign({}, styles.root, this.props.style)}>
                {this.props.children}
            </svg>
        );
    }
}