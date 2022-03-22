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

export default GETALLUSERS;
