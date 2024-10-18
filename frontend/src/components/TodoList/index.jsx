import React, {useState} from "react";

export const TodoList = () => {
    const [todos, setTodos] = useState([
        {id: 1, text: 'Learn React', completed: false, editing: false, originalText: ''},
        {id: 2, text: 'Build a To-Do App', completed: false, editing: false, originalText: ''}
    ]);

    const [newTodo, setNewTodo] = useState('');

    // Toggle mark complete
    const markComplete = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Start editing, save original text
    const editTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, editing: true, originalText: todo.text} : todo
        ));
    };


    const saveTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, editing: false, originalText: ''} : todo
        ));
    };

    // Cancel editing, revert to original text
    const cancelEdit = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, editing: false, text: todo.originalText, originalText: ''} : todo
        ));
    };

    // Handle text change in edit mode
    const handleChange = (id, event) => {
        const newText = event.target.value;
        setTodos(todos.map(todo => todo.id === id ? {...todo, text: newText} : todo));
    };

    const addNewTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, {id: Date.now(), text: newTodo, completed: false, editing: false, originalText: ''}]);
            setNewTodo('');  // Clear the input field after adding
        }
    };

    return (
        <div style={{minHeight:"620px"}}>
            <div className="container d-flex flex-column justify-content-center mt-5">
                <div className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new todo"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" onClick={addNewTodo}>
                            Add New
                        </button>
                    </div>
                </div>

                <ul className="list-group">
                    {todos.map(todo => (
                        <li key={todo.id}
                            className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                            {todo.editing ? (
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={todo.text}
                                    onChange={(e) => handleChange(todo.id, e)}
                                />
                            ) : (
                                <span className="flex-grow-1">{todo.text}</span>
                            )}

                            {todo.editing ? (
                                <div style={{minWidth: "140px"}}>
                                    <button className="btn btn-outline-success me-2"
                                            onClick={() => saveTodo(todo.id)}>Save
                                    </button>
                                    <button className="btn btn-outline-secondary"
                                            onClick={() => cancelEdit(todo.id)}>Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <button className="btn btn-outline-primary me-2"
                                                onClick={() => markComplete(todo.id)}>
                                            {todo.completed ? 'Undo' : 'Complete'}
                                        </button>
                                        <button className="btn btn-outline-warning me-2"
                                                onClick={() => editTodo(todo.id)}>Edit
                                        </button>
                                        <button className="btn btn-outline-danger"
                                                onClick={() => deleteTodo(todo.id)}>Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};