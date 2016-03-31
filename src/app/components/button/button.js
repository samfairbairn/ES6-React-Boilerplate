import React, { Component, PropTypes } from 'react';
import defaultStyles from './button.css';
import loginStyles from './loginButton.css';

const themes = {
	default: defaultStyles,
	login: loginStyles
};

export default class extends Component {

	static propTypes = {
		theme: PropTypes.string,
		selected: PropTypes.boolean,
		disabled: PropTypes.boolean,
	};

	static defaultProps = {
		theme: 'default',
		selected: false,
		disabled: false,
	};

	constructor(props) {
		super(props);
	}

	render() {

		const { children } = this.props;
		const styles = (this.props.theme) ? themes[this.props.theme] : themes.default;

		let buttonClass = styles.default;

		if(this.props.selected) buttonClass = styles.selected;
		if(this.props.disabled) buttonClass = styles.disabled;

		return(
			<button
					className={ buttonClass }
					onClick={()=>{}}
			>
				{ children }
			</button>
		);
	}
}