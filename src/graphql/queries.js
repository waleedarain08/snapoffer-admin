/* eslint-disable import/prefer-default-export */
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
  query Query {
    getCategories {
      status
      message
      error
      data {
        id
        parentId
        name
        child {
          id
          parentId
          name
        }
      }
    }
  }
`;

export default {
  GETALLUSERS,
  GETALLCATEGORIES,
};
