var React = require('react');
var {connect} = require('react-redux');
import TodoItem from 'TodoItem';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
    render: function () {
        var {todos, showCompleted, searchText} = this.props;
        var renderTodoItems = () => {
            console.log(todos);
            var filteredTodos = TodoAPI.filterTodoItems(todos, showCompleted, searchText);
            if (filteredTodos.length === 0) {
                return(
                  <p className="container__message">
                      Nothing to Do
                  </p>
                );
            }
            return filteredTodos.map((todoItem) => {
               return (
                 <TodoItem key={todoItem.id} {...todoItem} />
               );
            });
        };

        return (
            <div>
                {renderTodoItems()}
            </div>
        );
    }
});

export default connect(
    (state) => {
        return state;
    }
)(TodoList);