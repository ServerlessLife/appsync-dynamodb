import React from "react";
import { List, Paper } from "@material-ui/core";

import { Todo } from "../API";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  items: Todo[];
  onItemRemove: (id: string) => void;
  onItemUpdate: (todo: Todo) => void;
};

export const TodoList: React.FC<TodoListProps> = ({ items, onItemRemove, onItemUpdate }) => (
  <>
    {items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List >
          {items.map((todo) => (
            <TodoItem              
              todo = {todo}
              key={todo.id}
              onItemUpdate={onItemUpdate}
              onItemRemove={onItemRemove}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
);
