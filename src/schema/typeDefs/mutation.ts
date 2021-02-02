import { gql } from "apollo-server";

export default gql`
type Mutation {
  loginUser(email: String!, password: String!): loginUser
 

  createUser(user: UserInput!): User
  editUser(user: UpdateUserInput!): User
  deleteUser(id: Int!): String


  createMaterial(material: MaterialInput!): Material
  deleteMaterial(id: Int!) : Boolean
  updateMaterial(id: Int!,material: MaterialInput!): Material

  createMaterialType(name: String!): MaterialType

  createProvider(provider: ProviderInput!): Provider
  deleteProvider(id: Int!): Boolean
  updateProvider(provider: UpdateProviderInput!): Provider

  updateMaterialStage(id:Int!,weight:Float!, uniteds: Int!): MaterialsStage
  updateMateriaStageW(materials:[UpdateMaterialStage]): Int

  addToStore(store: StoreInput!): Store
  updateStore(store: UpdateStoreInput!): Store
  deleteStored(id: Int!): String
  
  updatStateOrder(id: Int!,state:UpdateOrder): MaterialsStage
  produceOrder(id: Int!):Orders
  createProduct(product: ProductsInput!): Products
  updateProduct(product: UpdateProductsInput!): Products
  deleteProduct(id: Int!): String
  takeOrder(order: TakeOrderInput!): Orders
  deleteOrder(id:Int!): String
  takeOrderClient(order: TakeOrderInput!): Orders


}

`;