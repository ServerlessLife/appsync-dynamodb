import React, { useState } from "react";
import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutline";
import EditOutlined from "@material-ui/icons/EditOutlined";
import CheckOutlined from "@material-ui/icons/CheckOutlined";
import { Todo } from "../API";

type TodoItemProps = {
  todo: Todo;
  onItemRemove: (id: string) => void;
  onItemUpdate: (todo: Todo) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onItemRemove,
  onItemUpdate,
}) => {
  const [editState, setEditState] = useState(false);
  const [name, setName] = useState(todo.name!);

  return (
    <ListItem>
      {!editState ? (
        <ListItemText primary={name} />
      ) : (
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      )}
      <ListItemSecondaryAction>
        {!editState ? (
          <IconButton onClick={() => setEditState(true)}>
            <EditOutlined />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setEditState(false);
              onItemUpdate({
                ...todo,
                name,
              });
            }}
          >
            <CheckOutlined />
          </IconButton>
        )}
        <IconButton onClick={() => onItemRemove(todo.id!)}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
