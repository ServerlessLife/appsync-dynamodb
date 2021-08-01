/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo($name: String) {
    createTodo(name: $name) {
      id
      name
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo($id: ID, $name: String) {
    updateTodo(id: $id, name: $name) {
      id
      name
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($id: ID) {
    deleteTodo(id: $id)
  }
`;
