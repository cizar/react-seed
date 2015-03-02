var React = require('react');
var Message = require('./Message');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>React Seed</h1>
        <Message text="Hello World" />
      </div>
    );
  }
});
