var React = require('react');

var AddTodoItem = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();

        var todoItem = this.refs.todoItem.value;

        if (todoItem.length > 0){
            this.refs.todoItem.value = '';
            this.props.onAddTodoItem(todoItem);
        } else {
            this.refs.todoItem.focus();
        }
    },
    render: function () {
        return (
            <div>
                <form ref="form" onSubmit={this.onSubmit} className="">
                    <input type="text" ref="todoItem" placeholder="What do you need to do ?"/>
                    <button className="button expanded">Post Todo</button>
                </form>
            </div>
        );
    }
});

module.exports = AddTodoItem;