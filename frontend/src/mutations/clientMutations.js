import { gql } from "@apollo/client";

const CREATE_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

// const UPDATE_CLIENT = gql`
// `
export { DELETE_CLIENT, CREATE_CLIENT };
