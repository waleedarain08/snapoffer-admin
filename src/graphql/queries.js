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
      reportCount
      createdAt
      updatedAt
      approved
      user {
        id
        firstName
        lastName
        email
        avatar
        type
      }
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
      user {
        id
        firstName
        lastName
        avatar
      }
      subscriptionId
      title
      description
      locationTitle
      location
      expireDate
      postExpireDate
      reportCount
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
      comments {
        id
        comment
        createdAt
        user {
          id
          firstName
          avatar
          lastName
        }
      }
      tags {
        id
        tag {
          id
          title
          createdAt
        }
      }
      media {
        id
        asset
        type
        createdAt
      }
    }
    message
    error
  }
}
`

const GET_BOOKINGS = gql`
query GetBookings {
  getBooking {
    status
    message
    data {
      id
      postId
      userId
      businessId
      email
      firstName
      lastName
      phoneNumber
      country
      city
      code
      redeem
    }
    pagination {
      total
      currentPage
      perPage
    }
    error
  }
}
`

const GET_DASHBOARD_DATA = gql`
query GetDashboardData {
  countCustomerUsers { data}
  getBusinessCount { data }
  getBookingsCount { data }
  getPostsCount { data }
  getLikesCount { data }
  getCommentsCount { data }
}
`;

export default {
  GETALLUSERS,
  GETALLCATEGORIES,
  GETSUBALLCATEGORIES,
  GETUSERSWHERE,
  GET_ALL_PACKAGES,
  GET_ALL_POSTS,
  GET_POST_DETAIL,
  GET_BOOKINGS,
  GET_DASHBOARD_DATA,
};
