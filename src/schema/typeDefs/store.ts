import { gql } from "apollo-server";

export default gql`
type Store {
  id: Int
  material: Material
  provider: Provider
  uniteds: Int
  expiration_date: Date
  brand: String
  weight: Float
  united_weight: Float
}
input StoreInput {
  materialsId: Int!
  providerId: Int!
  uniteds: Int!
  expirationDate: String!
  brand: String!
  weight: Float!
  united_weight: Float!
}
input UpdateStoreInput {
  id: Int!
  materials_id: Int
  provider_id: Int
  uniteds: Int
  expiration_date: String
  brand: String
  weight: Float
  united_weight: Float

}

`;