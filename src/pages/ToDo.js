import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage';
import { todoBoxStyle, taskBoxStyle } from '../theme/customStyles';
import { AddTask, Header, TaskList, WelcomeScreen } from '../components';


const ToDo = () => {

    const [tasks, setTasks] = useLocalStorage("todoList", []);
    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedItemId, setEditedItemId] = useState(null);

    // Adding a new task |or| Updating an existing task
    const addTask = (task) => {
        !isEditing ? (
            setTasks(prevState => [...prevState, task])
        ) : (
            setTasks(prevState => [...prevState.map(item => {
                if (item.id === editedItemId) {
                    return {
                        ...item,
                        value: inputValue
                    };
                }
                return item;
            })])
        );
        setEditedItemId(null);
        setIsEditing(false);
    };

    // Deleting a task
    const deleteTask = (taskId) => {
        setTasks(prevState => [...prevState.filter(item => item.id !== taskId)]);
    };

    // toggling the Checked state of a task
    const checkTask = (taskId) => {
        setTasks(prevState => prevState.map(item => {
            if (item.id === taskId) {
                return {
                    ...item,
                    checked: !item.checked
                };
            }
            return item;
        }));
    };

    // Editing a task
    const editTask = (taskItem) => {
        const itemToEdit = tasks.find(item => item.id === taskItem.id);
        setInputValue(itemToEdit.value);
        setIsEditing(true);
        setEditedItemId(taskItem.id);
    };


    return (
        <Box sx={todoBoxStyle}>
            <Header />

            <AddTask
                inputValue={inputValue}
                setInputValue={setInputValue}
                addTask={addTask}
                isEditing={isEditing}
            />

            <Paper elevation={8} sx={taskBoxStyle}>
                {
                    tasks?.[0] ? (
                        <TaskList
                            tasks={tasks}
                            deleteTask={deleteTask}
                            checkTask={checkTask}
                            editTask={editTask}
                        />
                    ) : (
                        <WelcomeScreen />
                    )
                }
            </Paper>
        </Box>
    );
};

export default ToDo;