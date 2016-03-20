var Counter = React.createClass({
	name: 'Counter',
	displayName: 'Counter',
	proptypes: {
		count: React.PropTypes.number.isrequired
	},
	render: function() {
		return React.DOM.span(null, this.props.count);
	}
});
