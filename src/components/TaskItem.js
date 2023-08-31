import React, { useState } from 'react';
import { Stack, Typography, IconButton, Tooltip, Checkbox } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { checkedItemStyle, taskItemStyle } from '../theme/customStyles';

const TaskItem = ({ taskItem, deleteTask, checkTask, editTask }) => {

    const { id, value, checked } = taskItem;

    // this state is just scoped to the individual instance of the checkboxes and also allows to update their values.
    const [isChecked, setIsChecked] = useState(checked);

    const handleIsChecked = () => {
        setIsChecked(prevState => !prevState);
        checkTask(id);
    };


    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={!isChecked ? taskItemStyle : checkedItemStyle}
        >
            <Stack direction="row" alignItems="center">
                <Checkbox
                    name={value}
                    checked={isChecked}
                    onChange={handleIsChecked}
                    disableRipple
                />
                <Typography
                    variant="h6"
                    ml={1.6}
                    sx={{ textDecoration: isChecked ? "line-through" : "none" }}
                >
                    {value}
                </Typography>
            </Stack>
            <Stack direction="row" columnGap={2}>
                <Tooltip title="Edit">
                    <IconButton
                        aria-label="edit"
                        onClick={() => editTask(taskItem)}
                    >
                        <Edit />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                    <IconButton
                        aria-label="delete"
                        onClick={() => deleteTask(id)}
                    >
                        <Delete />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );
};

export default TaskItem;