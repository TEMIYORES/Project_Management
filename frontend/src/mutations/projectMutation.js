import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!, $clientId: ID!) {
    addProject(name: $name, description: $description, clientId: $clientId) {
      id
      name
      description
      status
      client {
        name
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: String!
    $clientId: ID!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;
export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
