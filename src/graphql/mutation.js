import { gql } from "@apollo/client";

export const UpdateUsers = gql`
  mutation UpdateUser($updateUserId: Int!, $email: String!, $name: String, $isBlocked: Boolean) {
    updateUser(id: $updateUserId, email: $email, name: $name, isBlocked: $isBlocked) {
      status
      message
      data {
        id
        email
        name
        isVerified
      }
    }
  }
`;

export const DeleteUsers = gql`
  mutation DeleteUser($deleteUserId: Int!) {
    deleteUser(id: $deleteUserId) {
      status
      message
    }
  }
`;

export const CreateCatagory = gql`
  mutation CreateCatagory(
    $image: String!
    $description: String!
    $backgroundColor: String!
    $title: String!
  ) {
    CreateCatagory(
      Image: $image
      Description: $description
      BackgroundColor: $backgroundColor
      Title: $title
    ) {
      status
      message
    }
  }
`;
