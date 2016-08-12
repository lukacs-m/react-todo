var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export var TodoItem = React.createClass({
    render: function () {
        var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
        var todoClassName = completed ? 'todo todo-completed': 'todo';

        var renderDate = () => {
            var message = "Created ";
            var timestamp = createdAt;

            if(completed) {
                message = 'Completed ';
                timestamp = completedAt;
                console.log()
            }

            return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
        };

        return (
            <div  className={todoClassName} onClick={() => {
                {/*this.props.onToggle(id);*/}
                dispatch(actions.toggleTodoItem(id));
            }}>
                <div>
                    <input type="checkbox" checked={completed}/>
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo-subtext">{renderDate()}</p>
                </div>
            </div>
        );
    }
});

export default connect()(TodoItem);