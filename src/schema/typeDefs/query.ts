import { gql } from "apollo-server";

export default gql`
type Query {
  users: [User]
  user(id: Int!): User
  sessionUser: String!
  sessionLog: [SessionLog]
  client(id: Int!): Client
  clients: [Client]
  materialTypes: [MaterialType]
  materialsStage:[MaterialsStage]
  materials: [Material]
  provider(id: Int!): Provider
  providers: [Provider]
  store(id: Int!): Store
  storage: [Store]
  products(
    size: Int!
    cursor: Int!
    type: String
    preservation: String
  ): GetProducts
  productsRaw:[Products]
  productTypes: [ProductType]
  productPreservation: [PreservationType]
  product(id: Int!): Products
  order(id: Int!): Orders
  orders: [Orders]

  productsLog: [ProducstLog]
  storageLog: [StorageLog]
  ordersLog: [OrdersLog]
}

`;