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

export default {
  ADDCATEGORY,
  ADDUPDATE,
  ADDSUBCATEGORY,
  DELETECATEGORY,
};
