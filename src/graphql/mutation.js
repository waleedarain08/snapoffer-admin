import { gql } from "@apollo/client";

const ADDCATEGORY = gql`
  mutation AddCategory($name: String, $parentId: Int) {
    addCategory(name: $name, parentId: $parentId) {
      status
      message
    }
  }
`;

const ADDUPDATE = gql`
  mutation UpdateCategory($updateCategoryId: Int, $name: String, $index: Int) {
    updateCategory(id: $updateCategoryId, name: $name, index: $index) {
      status
      message
    }
  }
`;

const DELETECATEGORY = gql`
  mutation DeleteCategory($deleteCategoryId: Int) {
    deleteCategory(id: $deleteCategoryId) {
      status
      message
    }
  }
`;

const ADDSUBCATEGORY = gql`
  mutation AddCategory($name: String, $parentId: Int) {
    addCategory(name: $name, parentId: $parentId) {
      status
      message
    }
  }
`;

const UPDATE_USER_STATUS = gql`
  mutation UpdateUserStatus($userId: Int!, $status: Boolean) {
    updateStatus(id: $userId, status: $status) {
      status
      message
      error
      data {
        id
        status
      }
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
mutation UpdateProfile($id: Int!, $type: Type!, $firstName: String, $isFree: Boolean) {
  updateProfile(id: $id, type: $type, firstName: $firstName, isFree: $isFree) {
    status
    message
    error
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
      password
      deviceId
      resetToken
      type
      status
      stripeCustomerId
      isVerified
      createdAt
      updatedAt
      fcmToken
      providerId
      registrationType
      isFree
    }
  }
}
`;

const DELETE_PACKAGE = gql`
  mutation DeletePackage($packageId: Int!) {
    deletePackage(id: $packageId) {
      status
      message
      error
    }
  }
`;

const ADD_PACKAGE = gql`
mutation AddNewPackage(
    $name: String, 
    $price: String, 
    $photos: Int, 
    $status: Int, 
    $duration: Int, 
    $story: Int, 
    $video: Int
  ) {
  addNewPackage(
    name: $name, 
    price: $price, 
    photos: $photos, 
    status: $status, 
    duration: $duration, 
    story: $story, 
    video: $video
  ) {
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
`;

const EDIT_PACKAGE = gql`
mutation EditPackage($id: Int!, $name: String, $photos: Int, $video: Int, $story: Int, $status: Int, $duration: Int, $price: String) {
  editPackage(id: $id, name: $name, photos: $photos, video: $video, story: $story, status: $status, duration: $duration, price: $price) {
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
`;

const APPROVE_DISAPPROVE_POST = gql`
mutation ApproveDisapprovePost($postId: Int!, $approved: Boolean!, $rejectedReason: String) {
  approvePost(postId: $postId, approved: $approved, rejectedReason: $rejectedReason) {
    status
    message
    error
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
      approved
    }
  }
}
`;

const DELETE_BOOKING = gql`
mutation DeleteBooking($bookingId: Int!) {
  deleteBooking(bookingId: $bookingId) {
    status
    message
    error
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
  }
}
`

const UPDATE_BUSINESS = gql`
  mutation UpdateBusiness($businessId: Int!, $isFree: Boolean, $category: String, $subCategory: String) {
    updateBusiness(businessId: $businessId, isFree: $isFree, category: $category, subCategory: $subCategory) {
      status
      message
      error
      data {
        id
        isFree
        category
        subCategory
        createdAt
        updatedAt
      }
    }
  }
`;

const UPDATE_POST = gql`
mutation UpdatePost($postId: Int!, $showTop: Boolean) {
  updatePost(postId: $postId, showTop: $showTop) {
    status
    message
    error
    data {
      id
      title
      postExpireDate
      price
      discount
      reportCount
      showTop
      createdAt
      updatedAt
      approved
      rejectedReason
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
`;

export default {
  ADDCATEGORY,
  ADDUPDATE,
  ADDSUBCATEGORY,
  DELETECATEGORY,
  UPDATE_USER_STATUS,
  UPDATE_USER_PROFILE,
  ADD_PACKAGE,
  EDIT_PACKAGE,
  DELETE_PACKAGE,
  APPROVE_DISAPPROVE_POST,
  DELETE_BOOKING,
  UPDATE_BUSINESS,
  UPDATE_POST,
};
