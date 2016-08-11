var React = require('react');
var TodoItem = require('TodoItem');

var TodoList = React.createClass({
    render: function () {
        var {todos} = this.props;
        var renderTodoItems = () => {
            if (todos.length === 0) {
                return(
                  <p className="container__message">
                      Nothing to Do
                  </p>
                );
            }
            return todos.map((todoItem) => {
               return (
                 <TodoItem key={todoItem.id} {...todoItem} onToggle={this.props.onToggle}/>
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

module.exports = TodoList;