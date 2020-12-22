import gql from "graphql-tag";

export default gql`
type User {
  id: Int
  name: String
  email: String
  password: String
  role: UserRole
  phone: String
}
input UserInput {
  name: String!
  email: String!
  password: String!
  phone: String!
  role: UserRole!
}
input UpdateUserInput {
  id: Int!
  name: String
  email: String
  password: String
  phone: String
  role: UserRole
}
`;