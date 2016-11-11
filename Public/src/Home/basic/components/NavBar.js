import React, { Component, PropTypes } from 'react';

function getStyles(props) {
	
	return {
		root: {

		}
	}
}

class NavBar extends Component {
	static propTypes = {
		logo: PropTypes.string.isRequired,
		items: PropTypes.object,
		rootStyle: PropTypes.object
	};

	static defaultProps = {
		rootStyle: {}
	};

	render() {
		const { logo, items } = this.props;

		const pcElement = <div>
			<img src={logo} />
		</div>

		return pcElement;
	}

}

export default NavBar;