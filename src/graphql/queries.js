import { gql } from "@apollo/client";

const GETALLUSERS = gql`
  query ExampleQuery {
    getAllUsers {
      status
      message
      data {
        id
        email
        firstName
        lastName
        avatar
        dob
        phoneNumber
        country
        city
        type
        status
        stripeCustomerId
        createdAt
        deviceId
        isVerified
        updatedAt
        providerId
        registrationType
      }
    }
  }
`;

const GETALLCATEGORIES = gql`
  query GetCategories($where: whereCategoryInput) {
    getCategories(where: $where) {
      status
      message
      data {
        id
        parentId
        name
      }
    }
  }
`;
const GETSUBALLCATEGORIES = gql`
  query GetCategories($where: whereCategoryInput) {
    getCategories(where: $where) {
      status
      message
      data {
        id
        parentId
        name
      }
    }
  }
`;

export default {
  GETALLUSERS,
  GETALLCATEGORIES,
  GETSUBALLCATEGORIES,
};
