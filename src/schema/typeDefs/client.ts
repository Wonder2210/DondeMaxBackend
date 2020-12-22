import {gql} from "apollo-server";

export default gql`
type Client {
  id: Int
  name: String
  cedula: String
  nationality: String
  phone: String
  creator: User
  orders: ClientOrders
}

type ClientOrders {
  delivered: [Orders]
  pending: [Orders]
  all: [Orders]
}
input ClientInput {
  name: String!
  cedula: String!
  nationality: String!
  phone: String!
}
input UpdateClientInput {
  id: Int!
  name: String
  cedula: String
  nationality: String
  phone: String
}
`;