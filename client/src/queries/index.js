const { gql } = require("apollo-boost");

//user mutations
export const CREATE_USER = gql`
  mutation($username: String!, $password: String!) {
    createUser(data: { username: $username, password: $password }) {
      token
    }
  }
`;
//mutations
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signIn(data: { username: $username, password: $password }) {
      token
    }
  }
`;
//query
export const GET_ACTIVE_USER = gql`
  query {
    activeUser {
      _id
      username
    }
  }
`;
//query
export const GET_SNAPS = gql`
  query {
    snaps {
      _id
      text
      createdAt
      user {
        _id
        username
      }
    }
  }
`;
//mutations
export const CREATE_SNAP = gql`
  mutation($text: String!, $user_id: ID!) {
    createSnap(data: { text: $text, user_id: $user_id }) {
      _id
      text
      createdAt
      user {
        _id
        username
      }
    }
  }
`;

//subs

export const CREATED_USER = gql`
  subscription {
    user {
      _id
      username
    }
  }
`;
