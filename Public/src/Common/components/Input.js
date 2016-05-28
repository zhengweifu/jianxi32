import React, { Component, PropTypes } from 'react';

import { CYAN500, GREY300, GREY500 } from '../styles/colors';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value : props.value,
            active: false
        };
    }

    static propTypes = {
        floatingLabelText: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func,
        style: PropTypes.object,
    };

    static defaultProps = {
        floatingLabelText: '',
        style: {}
    };

    onHandleChange(event) {
        let val = event.target.value;

        this.setState({value: val});

        if(this.props.onChange) {
            this.props.onChange(event, val);
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.value !== undefined) {
            this.setState({
                value: newProps.value
            });
        }
    }

    render() {
        let defaultBorderColor = GREY300, activeBorderColor = CYAN500;

        let style = {
            color: GREY500,
            border: 'none',
            borderBottom: 'solid',
            borderWidth: this.state.active ? 2 : 1,
            borderColor: this.state.active ? activeBorderColor : defaultBorderColor,
            minHeight: 20,
            width: '100%',
            outline: 'none'
        };

        return (
            <input
                style={Object.assign(style, this.props.style)}
                value={this.state.value}
                onFocus={e => this.setState({active: true})}
                onBlur={e => this.setState({active: false})}
                onChange={this.onHandleChange.bind(this)}
                />
        );
    }
}




