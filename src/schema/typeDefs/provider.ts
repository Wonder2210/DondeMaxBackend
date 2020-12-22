import {gql} from "apollo-server";

export default gql`

type Provider {
  id: Int
  name: String
  RIF: String
  phone: String
  direction: String
}
input ProviderInput {
  name: String!
  RIF: String!
  phone: String!
  direction: String!
}
input UpdateProviderInput {
  id: Int!
  name: String
  RIF: String
  phone: String
  direction: String
}
`;
