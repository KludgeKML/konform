class ValidatingField extends React.Component {
	constructor(props) {
		super(props);
		this._update = this._update.bind(this);
		this._blur = this._blur.bind(this);
		var displayName = this.props.displayName ? this.props.displayName : this.props.name.replace('_', ' ');
		var neverBlurred = this.props.alreadyBlurred ? false : true;
		this.state = {
			displayName: displayName,
			valid: true,
			neverBlurred: neverBlurred,
			value: this.props.value,
			error_messages: ''
		};
	}

	componentWillMount() {
		this._validate();
	}


	_render_error_field() {
		if (this.state.valid || this.state.neverBlurred) return null;
		return React.DOM.label({className: 'error-message'}, this.state.error_messages);
	}

	_update(evt) {
		this.setState({ value: evt.target.value }, this._validate);
	}

	_validate() {
		var valid = true;
		var error_messages = '';

		if (this.props.maxLen && this.state.value && this.state.value.length > this.props.maxLen)
		{
			valid = false;
			error_messages = this.props.maxLenMessage
				? this.props.maxLenMessage
				: "Must be at most " + this.props.maxLen + " characters";
		}

		if (this.props.minLen && this.state.value && this.state.value.length < this.props.minLen)
		{
			valid = false;
			error_messages = this.props.minLenMessage
				? this.props.minLenMessage
				: "Must be at least " + this.props.minLen + " characters";
		}


		if (this.props.regex)
		{
			var regexp = new RegExp(this.props.regex);
			if (regexp.test(this.state.value) == false)
			{
				valid = false;
				error_messages = this.props.regexMessage
					? this.props.regexMessage
					: "Incorrect format!";
			}
		}


		this.setState({ valid: valid, error_messages: error_messages });
	}

	_blur(evt) {
		this.setState({ neverBlurred: false }, this._validate);
	}

	reset() {
		this.setState({ value: "", neverBlurred: true }, this._validate);
	}

	render() {
		var className = 'validating-field';
		if (!(this.state.valid || this.state.neverBlurred)) className += ' with-errors';
		var required = '';
		if (this.props.required == true) required += 'required';
    	return (
      		<div className={className}>
        		<label className={required}>{this.state.displayName}</label>
        		<input name={this.props.name} id={this.props.name} onChange={this._update} onBlur={this._blur} value={this.state.value} />
        		{this._render_error_field()}
      		</div>
    	);
    }
}
