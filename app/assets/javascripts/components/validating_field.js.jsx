var Counter = React.createClass({
	displayName: 'ValidatingField',
	render: function() {
		return React.DOM.div({className: 'validating-field'},
			React.DOM.label(null, 'Your Value'),
			React.DOM.input(null, ''),
			React.DOM.label({className: 'error-message'}),
		);
	}
});