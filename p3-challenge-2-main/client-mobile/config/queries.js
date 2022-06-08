import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
  query fetchProducts {
    products {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      authorId
      authorMongoId
      Category {
        name
        id
      }
    }
  }
`;

export const FETCH_PRODUCTSBYCATEGORY = gql`
  query ProductsBycategory($category: String) {
    productsBycategory(category: $category) {
      name
      id
      slug
      description
      price
      mainImg
      categoryId
      authorId
      authorMongoId
      Category {
        name
        id
      }
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query fetchProduct($productId: ID!) {
    product(id: $productId) {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      authorId
      authorMongoId
      Category {
        name
        id
      }
      Images {
        imgUrl
        productId
        id
      }
      User {
        username
        id
      }
    }
  }
`;
