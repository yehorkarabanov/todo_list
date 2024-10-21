import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewTask,
    cancelEditTask, createTaskBackend,
    deleteTaskBackend,
    editTask,
    handleChangeTask, saveContendTaskBackend,
    toggleCompleteTaskBackend,
} from "../../redux/slices/taskSlice";

export const TodoList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items);
    const [newTodo, setNewTodo] = useState('');

    const markComplete = (id) => {
        dispatch(toggleCompleteTaskBackend({id: id}));
    };

    const deleteTodo = (id) => {
        dispatch(deleteTaskBackend({id: id}));
    };

    // Start editing, save original text
    const editTodo = (id) => {
        dispatch(editTask({id: id}));
    };


    const saveTodo = (id) => {
        dispatch(saveContendTaskBackend({id: id}));
    };

    // Cancel editing, revert to original text
    const cancelEdit = (id) => {
        dispatch(cancelEditTask({id: id}));
    };

    // Handle text change in edit mode
    const handleChange = (id, event) => {
        const newText = event.target.value;
        dispatch(handleChangeTask({id: id, newText: newText}));
    };

    const addNewTodo = () => {
        if (newTodo.trim()) {
            dispatch(createTaskBackend({content: newTodo}));
            setNewTodo('');  // Clear the input field after adding
        }
    };

    return (
        <div style={{minHeight: "620px"}}>
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
                    {tasks.map(task => (
                        <li key={task.id}
                            className={`list-group-item d-flex justify-content-between align-items-center ${task.is_completed ? 'text-decoration-line-through text-muted' : ''}`}>
                            {task.editing ? (
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={task.content}
                                    onChange={(e) => handleChange(task.id, e)}
                                />
                            ) : (
                                <span className="flex-grow-1">{task.content}</span>
                            )}

                            {task.editing ? (
                                <div style={{minWidth: "140px"}}>
                                    <button className="btn btn-outline-success me-2"
                                            onClick={() => saveTodo(task.id)}>Save
                                    </button>
                                    <button className="btn btn-outline-secondary"
                                            onClick={() => cancelEdit(task.id)}>Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <button className="btn btn-outline-primary me-2"
                                                onClick={() => markComplete(task.id)}>
                                            {task.is_completed ? 'Undo' : 'Complete'}
                                        </button>
                                        <button className="btn btn-outline-warning me-2"
                                                onClick={() => editTodo(task.id)}>Edit
                                        </button>
                                        <button className="btn btn-outline-danger"
                                                onClick={() => deleteTodo(task.id)}>Delete
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