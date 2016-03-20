var TextAreaCounter = React.createClass({
	name: 'TextAreaCounter',
	displayName: 'TAC',
	proptypes: {
		text: React.PropTypes.string
	},
	// mixins: [logMixin],
	getInitialState: function() {
		return {
			text: this.props.text
		};
	},
	_textChange: function(ev) {
		this.setState({
			text: ev.target.value
		});
	},
	render: function() {
		var counter = null;
		if (this.state.text.length > 0) {
			counter = React.DOM.h3(null, React.createElement(Counter, { count: this.state.text.length}));
		}
		return React.DOM.div(null,
			React.DOM.textarea({value: this.state.text, onChange: this._textChange}),
			counter
		);
	}
});