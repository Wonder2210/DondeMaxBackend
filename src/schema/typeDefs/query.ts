import { gql } from "apollo-server";

export default gql`
type Customer{
  id: Int
  googleId: String
  name: String
  lastName: String
  phone: String
  email: String
  image: String
  orders: ClientOrders
}
type SessionUser{
  id: Int,
 phone: String,
 name: String
 role: UserRole,
 email: String
}

union UserOnSession = Customer | SessionUser

type Query {
  users: [User]
  user(id: Int!): User
  clients: [Customer]
  client(id:Int!): Customer
  sessionUser: UserOnSession!
  sessionLog: [SessionLog]

  materialTypes: [MaterialType]
  materialsStage:[MaterialsStage]
  materials: [Material]
  provider(id: Int!): Provider
  providers: [Provider]
  store(id: Int!): Store
  storage: [Store]
  searchProducts(
    size: Int!
    cursor: Int!
    type: String
    preservation: String
  ): GetProducts
 getProducts:[Products]
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