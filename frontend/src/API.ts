/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Todo = {
  __typename: "Todo",
  id?: string | null,
  name?: string | null,
  user?: string | null,
};

export type CreateTodoMutationVariables = {
  name?: string | null,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "Todo",
    id?: string | null,
    name?: string | null,
    user?: string | null,
  },
};

export type UpdateTodoMutationVariables = {
  id?: string | null,
  name?: string | null,
};

export type UpdateTodoMutation = {
  updateTodo:  {
    __typename: "Todo",
    id?: string | null,
    name?: string | null,
    user?: string | null,
  },
};

export type DeleteTodoMutationVariables = {
  id?: string | null,
};

export type DeleteTodoMutation = {
  deleteTodo?: boolean | null,
};

export type ListTodosQuery = {
  listTodos:  Array< {
    __typename: "Todo",
    id?: string | null,
    name?: string | null,
    user?: string | null,
  } | null >,
};
