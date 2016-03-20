var ValidatingForm = React.createClass({

  render: function() {
    return (
    	<div className="validating-form">
    		{this.props.children}
    	</div>
    );
  }
});
