const TodoFactory = (title, description, dueDate, priority) => {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false,

        toggleComplete(){
            this.completed = !this.completed;
        },

        updateTitle(newTitle){
            this.title = newTitle;
        },

        updateDescription(newDescription){
            this.description = newDescription;
        },

        updateDueDate(newDate){
            this.dueDate = newDate;
        },

        updatePriority(newPriority){
            this.priority = newPriority;
        }
    };
};

const TodoListFactory = () => {
    const todos = [];

    return {
        addTodo(title, description, dueDate, priority){
            const newTodo = TodoFactory(title, description, dueDate,
                priority);
                todos.push(newTodo);
                return newTodo;
        },

        removeTodo(index){
            todos.splice(index, 1);
        },

        getTodos(){
            return todos;
        },

        saveTodos(){
            localStorage.setItem('todos', JSON.stringify(todos));
        },

        loadTodos() {
            const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
                todos.length = 0;
                savedTodos.forEach(todo => {
                    todos.push(TodoFactory(todo.title, todo.description, todo.dueDate, todo.priority));
                });
        }
    };
};

export { TodoFactory, TodoListFactory};