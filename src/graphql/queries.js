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

const GETUSERSWHERE = gql`
  query GetUsers($where: whereUserInput) {
    getAllUsers(where: $where) {
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

const GET_ALL_PACKAGES = gql`
  query GetAllPackages {
    getAllPackages {
      status
      message
      error
      data {
        id
        name
        photos
        video
        story
        status
        duration
        price
        created_at
        updated_at
      }
    }
  }
`

const GET_ALL_POSTS = gql`
query GetAllPosts($pagination: PaginationInput) {
  getAllPosts(pagination: $pagination) {
    pagination {
      total
      perPage
      currentPage
    }
    error
    message
    status
    data {
      id
      title
      postExpireDate
      price
      discount
      createdAt
      updatedAt
      approved
    }
  }
}
`

const GET_POST_DETAIL = gql`
query GetPostDetail($postId: Int) {
  getPostDetail(id: $postId) {
    status
    data {
      id
      subscriptionId
      userId
      title
      description
      locationTitle
      location
      expireDate
      postExpireDate
      price
      discount
      socialLink
      createdAt
      updatedAt
      isLike
      isBookmark
      isOrder
      isFollow
      commentCount
      approved
    }
    message
    error
  }
}
`

export default {
  GETALLUSERS,
  GETALLCATEGORIES,
  GETSUBALLCATEGORIES,
  GETUSERSWHERE,
  GET_ALL_PACKAGES,
  GET_ALL_POSTS,
  GET_POST_DETAIL,
};
