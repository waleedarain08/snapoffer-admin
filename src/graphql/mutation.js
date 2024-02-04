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
  mutation UpdateCategory($updateCategoryId: Int, $name: String) {
    updateCategory(id: $updateCategoryId, name: $name) {
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

const APPROVE_DISAPPROVE_POST = gql`
mutation ApproveDisapprovePost($postId: Int!, $approved: Boolean!) {
  approvePost(postId: $postId, approved: $approved) {
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
      commentCount
      approved
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
  ADD_PACKAGE,
  DELETE_PACKAGE,
  APPROVE_DISAPPROVE_POST,
};
