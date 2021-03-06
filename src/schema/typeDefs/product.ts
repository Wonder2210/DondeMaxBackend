import { gql } from "apollo-server";

export default gql`
type ProductType {
  id: Int
  type: String
  products: [Products]
}
type Rate{
  id: Int
  value: Float
  times_valued: Int
}
type PreservationType {
  id: Int
  type: String
  products: [Products]
}
type Products {
  id: Int
  name: String
  precio: Float
  image: String
  materials: [MaterialsProduct]
  info: String
  type: String
  rate: Rate
  preservation: String
  available: Boolean
}
input ProductsInput {
  name: String!
  precio: Float!
  image: Upload!
  info: String!
  type: String!
  available: Boolean
  rate: Float
  materials: [MaterialProductInput!]!
}

input UpdateProductsInput {
  id: Int!
  name: String
  precio: Float
  image: Upload
  type: String
  info: String
  available: Boolean
  materials: [MaterialProductInput]
}
input ProductOrderInput {
  id: Int!
  quantity: Int!
}
type GetProducts {
  results: [Products]
  total: Int
}
`;