import React, { useEffect, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo, updateTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql/lib-esm/types";
import {
  CreateTodoMutation,
  ListTodosQuery,
  UpdateTodoMutation,
  Todo,
} from "./API";
import Layout from "./components/Layout";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = (await API.graphql(
        graphqlOperation(listTodos)
      )) as GraphQLResult<ListTodosQuery>;

      const todos = todoData?.data?.listTodos.map((t) => t!);
      setTodos(todos!);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  }

  async function add(todo: { name: string }) {
    try {
      const saved = (await API.graphql(
        graphqlOperation(createTodo, todo)
      )) as GraphQLResult<CreateTodoMutation>;

      setTodos([...todos, saved.data?.createTodo!]);
    } catch (err) {
      console.error("Error creating todo", err);
    }
  }

  async function remove(id: string) {
    try {
      await API.graphql(graphqlOperation(deleteTodo, { id }));
      const newTodos = todos.filter((t) => t?.id !== id);
      setTodos(newTodos);
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  }

  async function update(todo: Todo) {
    try {
      const saved = (await API.graphql(
        graphqlOperation(updateTodo, todo)
      )) as GraphQLResult<UpdateTodoMutation>;

      const newTodos = [...todos];
      const index = newTodos.findIndex((t) => t?.id === todo.id);
      console.log("index", index)
      newTodos[index] = saved.data?.updateTodo!;
      setTodos(newTodos);
    } catch (err) {
      console.error("Error updating todo", err);
    }
  }

  return (
    <Layout>
      <AddTodo onItemAdd={add} />
      <TodoList
        items={todos}
        onItemRemove={remove}
        onItemUpdate={update}
      />
    </Layout>
  );
};

export default withAuthenticator(App);
