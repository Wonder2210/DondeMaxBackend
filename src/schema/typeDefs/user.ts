import gql from "graphql-tag";

export default gql`
type User {
  id: Int
  name: String
  last_name: String
  email: String
  password: String
  role: UserRole
  phone: String
  orders: ClientOrders
}
type ClientOrders {
  delivered: [Orders]
  pending: [Orders]
  all: [Orders]
}
type loginUser{
  id: Int,
  role: UserRole,
  token:String!
}
input UserInput {
  name: String!
  email: String!
  last_name: String
  password: String!
  phone: String!
  role: UserRole!
}
input UpdateUserInput {
  id: Int!
  name: String
  last_name: String
  email: String
  password: String
  phone: String
  role: UserRole
}


`;