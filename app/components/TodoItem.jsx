var React = require('react');

var TodoItem = React.createClass({
    render: function () {
        var {text} = this.props;

        return (
            <div>
                <h3>{text}</h3>
            </div>
        );
    }
});

module.exports = TodoItem;