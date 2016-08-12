var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodoItem = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();
        var {dispatch} = this.props;
        var todoItem = this.refs.todoItem.value;

        if (todoItem.length > 0){
            this.refs.todoItem.value = '';
            dispatch(actions.addTodoItem(todoItem));
        } else {
            this.refs.todoItem.focus();
        }
    },
    render: function () {
        return (
            <div className="container__footer">
                <form ref="form" onSubmit={this.onSubmit} className="">
                    <input type="text" ref="todoItem" placeholder="What do you need to do ?"/>
                    <button className="button expanded">Post Todo</button>
                </form>
            </div>
        );
    }
});

export default connect()(AddTodoItem);