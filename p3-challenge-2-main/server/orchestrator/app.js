const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const port = process.env.PORT || 4000;
const redis = require("./config/redis.js");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Category {
    id: ID
    name: String
  }

  type Images {
    id: ID
    productId: Int
    imgUrl: String
  }

  type Products {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: Int
    authorMongoId: String
    Category: Category
  }

  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: Int
    authorMongoId: String
    Category: Category
    Images: [Images]
    User: User
  }

  type addProductInfo {
    message: String
    productCreated: Products
    imageCreated: [Images]
  }

  type editProductInfo {
    message: String
  }

  type deleteProductInfo {
    message: String
    product: Products
  }

  type User {
    _id: String
    id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
    createdAt: String
    updatedAt: String
  }

  type addUserInfo {
    message: String
    UserId: String
  }

  type deleteUserInfo {
    message: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    products: [Products]
    product(id: ID!): Product
    productsBycategory(category: String): [Products]
    users: [User]
    user(_id: String): User
  }

  # The "Mutation" type is another special type that has a list of all of the
  # operations that can be executed on your data. In this case, the "addBook"
  # mutation takes two arguments: "bookName" and "author".
  type Mutation {
    addUser(
      username: String
      email: String
      role: String
      phoneNumber: String
      address: String
    ): addUserInfo
    deleteUser(_id: String): deleteUserInfo
    addProduct(
      name: String
      description: String
      price: Int
      mainImg: String
      authorId: Int
      authorMongoId: String
      categoryId: Int
      images1: String
      images2: String
      images3: String
    ): addProductInfo
    editProduct(
      id: ID!
      name: String
      description: String
      price: Int
      mainImg: String
      categoryId: Int
      images1: String
      images2: String
      images3: String
    ): editProductInfo
    deleteProduct(id: ID!): deleteProductInfo
  }
`;

const resolvers = {
  Query: {
    productsBycategory: async (parent, args) => {
      try {
        const productsCache = await redis.get("products");
        if (productsCache) {
          console.log("dari cache");
          const product = JSON.parse(productsCache);
          const productsByCategory = product.filter((el) => el.Category.name == args.category);
          return productsByCategory;
        } else {
          console.log("dari axios");
          const { data } = await axios({
            method: "GET",
            url: `https://cartier-server-services-app.herokuapp.com/user/products`,
            params: { category: args.category },
          });
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    products: async () => {
      try {
        const productsCache = await redis.get("products");
        if (productsCache) {
          console.log("dari cache");
          const products = JSON.parse(productsCache);
          return products;
        } else {
          console.log("dari axios");
          const { data: products } = await axios({
            method: "GET",
            url: "https://cartier-server-services-app.herokuapp.com/products",
          });
          await redis.set("products", JSON.stringify(products));
          return products;
        }
      } catch (error) {
        console.log(error);
      }
    },
    product: async (parent, args) => {
      try {
        console.log("dari axios");
        const { data: products } = await axios({
          method: "GET",
          url: `https://cartier-server-services-app.herokuapp.com/user/products/${args.id}`,
        });
        const authorMongoId = products.authorMongoId;
        const { data: users } = await axios({
          method: "GET",
          url: `https://cartier-server-services-user.herokuapp.com/users/${authorMongoId}`,
        });
        products.User = users;
        return products;
      } catch (error) {
        console.log(error);
      }
    },
    users: async () => {
      try {
        const usersCache = await redis.get("users");
        if (usersCache) {
          console.log("dari cache");
          const users = JSON.parse(usersCache);
          return users;
        } else {
          console.log("dari axios");
          const { data: users } = await axios({
            method: "GET",
            url: "https://cartier-server-services-user.herokuapp.com/users",
          });
          await redis.set("users", JSON.stringify(users));
          return users;
        }
      } catch (error) {
        console.log(error);
      }
    },
    user: async (parent, args) => {
      try {
        const { data: user } = await axios({
          method: "GET",
          url: `https://cartier-server-services-user.herokuapp.com/users/${args._id}`,
        });
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addProduct: async (parent, args) => {
      try {
        const {
          name,
          description,
          price,
          mainImg,
          authorId,
          authorMongoId,
          categoryId,
          images1,
          images2,
          images3,
        } = args;
        const { data: product } = await axios({
          method: "POST",
          url: `https://cartier-server-services-app.herokuapp.com/products`,
          data: {
            name,
            description,
            price,
            mainImg,
            authorId,
            authorMongoId,
            categoryId,
            images1,
            images2,
            images3,
          },
        });
        await redis.del("products");
        return product;
      } catch (error) {
        console.log(error);
      }
    },
    editProduct: async (parent, args) => {
      try {
        const { id, name, description, price, mainImg, categoryId, images1, images2, images3 } =
          args;
        const { data: product } = await axios({
          method: "PUT",
          url: `https://cartier-server-services-app.herokuapp.com/products/${id}`,
          data: { name, description, price, mainImg, categoryId, images1, images2, images3 },
        });
        await redis.del("products");
        return product;
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (parent, args) => {
      try {
        const { id } = args;
        const { data: product } = await axios({
          method: "DELETE",
          url: `https://cartier-server-services-app.herokuapp.com/products/${id}`,
        });
        await redis.del("products");
        return product;
      } catch (error) {
        console.log(error);
      }
    },
    addUser: async (parent, args) => {
      try {
        const { data: user } = await axios({
          method: "POST",
          url: "https://cartier-server-services-user.herokuapp.com/users",
          data: args,
        });
        await redis.del("users");
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        const { data: user } = await axios({
          method: "DELETE",
          url: `https://cartier-server-services-user.herokuapp.com/users/${args._id}`,
        });
        await redis.del("users");
        return user;
      } catch (error) {
        console.log(error);
        // return error.response.data;
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, introspection: true,
  playground: true });

// The `listen` method launches a web server.
server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
