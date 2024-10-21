import {createSlice, createAsyncThunk, combineSlices} from "@reduxjs/toolkit";
import {apiLoginInstance} from "../utilsRedux/axios";
import {TASK_PATH} from "../../utils/settings";

export const getTasks = createAsyncThunk("task/getTasks", async (params, {dispatch, getState}) => {
    try {
        const instance = await dispatch(apiLoginInstance());
        const res = await instance.payload.get(TASK_PATH + "/");
        dispatch(setTasks(res.data));
    } catch (e) {
        console.log("error while getting tasks");
    }
});

export const updateTaskBackend = createAsyncThunk("task/updateTaskBackend", async (params, {dispatch, getState}) => {
    try {
        const payload = {};
        if (params.content) {
            payload.content = params.content;
        }

        if (typeof params.is_completed === "boolean") {
            payload.is_completed = params.is_completed;
        }
        const instance = await dispatch(apiLoginInstance());
        const res = await instance.payload.put(`${TASK_PATH}/${params.id}`, payload);
    } catch (e) {
        console.log("error while updating task");
    }
});

export const toggleCompleteTaskBackend = createAsyncThunk("task/toggleCompleteTaskBackend", async (params, {
    dispatch,
    getState
}) => {
    const state = getState();
    await dispatch(updateTaskBackend({
        id: params.id,
        is_completed: !state.tasks.items.filter(item => item.id === params.id)[0].is_completed
    }));
    dispatch(toggleCompleteTask({id: params.id}));
});

export const saveContendTaskBackend = createAsyncThunk("task/saveContendTaskBackend", async (params, {
    dispatch,
    getState
}) => {
    const state = getState();
    await dispatch(updateTaskBackend({
        id: params.id,
        content: state.tasks.items.filter(item => item.id === params.id)[0].content
    }));
    dispatch(saveTask({id: params.id}));
});

export const deleteTaskBackend = createAsyncThunk("task/deleteTaskBackend", async (params, {
    dispatch,
    getState
}) => {
    try {
        const instance = await dispatch(apiLoginInstance());
        const res = await instance.payload.delete(`${TASK_PATH}/${params.id}`);
        dispatch(deleteTask({id: params.id}));
    } catch (e) {
        console.log("error while updating task");
    }
});

export const createTaskBackend = createAsyncThunk("task/createTaskBackend", async (params, {
    dispatch,
    getState
}) => {
    try {
        const instance = await dispatch(apiLoginInstance());
        const res = await instance.payload.post(TASK_PATH + "/", {content: params.content});
        dispatch(addNewTask({id: res.data.id, content: params.content}));
    } catch (e) {
        console.log("error while creating task");
    }
});


const initialState = {
    items: []
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        clearTasks(state, action) {
            state.items = [];
        },
        setTasks(state, action) {
            state.items = action.payload.data.map(task => ({
                id: task.id,
                content: task.content,
                is_completed: task.is_completed,

                // Add the new properties with default values
                editing: false,       // Default value for 'editing'
                originalText: ''
            }));
        },
        deleteTask(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        toggleCompleteTask(state, action) {
            state.items = state.items.map(item => item.id === action.payload.id ? {
                ...item,
                is_completed: !item.is_completed
            } : item);
        },
        editTask(state, action) {
            state.items = state.items.map(item => item.id === action.payload.id ? {
                ...item,
                editing: true,
                originalText: item.content
            } : item);
        },
        saveTask(state, action) {
            state.items = state.items = state.items.map(item =>
                item.id === action.payload.id
                    ? {...item, editing: false, originalText: ''}
                    : item
            );
        },
        cancelEditTask(state, action) {
            state.items = state.items = state.items.map(item =>
                item.id === action.payload.id
                    ? {...item, editing: false, content: item.originalText, originalText: ''}
                    : item
            );
        },
        handleChangeTask(state, action) {
            state.items = state.items = state.items.map(item =>
                item.id === action.payload.id
                    ? {...item, content: action.payload.newText}
                    : item
            );
        },
        addNewTask(state, action) {
            if (action.payload.content.trim()) {
                state.items.push({
                    id: action.payload.id,
                    content: action.payload.content,
                    is_completed: false,
                    editing: false,
                    originalText: ''
                });
            }
        }
    }
});

export const {
    clearTasks,
    setTasks,
    deleteTask,
    toggleCompleteTask,
    editTask,
    saveTask,
    cancelEditTask,
    handleChangeTask,
    addNewTask
} = taskSlice.actions;
export default taskSlice.reducer;