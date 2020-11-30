import gql from "graphql-tag";

export const schema = gql`
scalar Upload
interface product {
  id: Int
  name: String
  precio: Float
  image: String
}

interface IUser {
  id: Int
  name: String
  email: String
  password: String
  phone: String
}
type User implements IUser {
  id: Int
  name: String
  email: String
  password: String
  role: UserRole
  phone: String
}

type Client {
  id: Int
  name: String
  cedula: String
  nationality: String
  phone: String
  creator: User
  orders: [Orders]
}
enum PayMethod {
  EFECTIVO
  DEBITO
  TRANSFERENCIA
  DOLARES
  PESOS
}

enum UserRole {
  EMPLEADO
  ADMINISTRADOR
}

type OrderProducts {
  id: Int
  quantity: Int
  product: Products
  materials: [MaterialWaste]
}
type MaterialWaste {
  id:Int
  material_name: String
  quantity: Float
}
type OrderWaste {
  name: String
  materials: [MaterialWaste]
}
type Orders {
  id: Int
  pay_method: PayMethod
  delivery_date: String
  note: String
  delivery_status: Boolean
  production_status: Boolean
  stage_status: Boolean
  abono: Float
  monto: Float
  total: Float
  creator: User
  client: Client
  products: [OrderProducts]
}
type MaterialsProduct {
  id: Int
  quantity: Float
  material: Material
}
type onStockMaterial {
  uniteds: Int
  weight: Float
}

type MaterialType {
  id: Int
  name: String
}
type Provider {
  id: Int
  name: String
  RIF: String
  phone: String
  direction: String
}
type ProductType {
  id: Int
  type: String
  products: [Products]
}
type PreservationType {
  id: Int
  type: String
  products: [Products]
}


type Products implements product {
  id: Int
  name: String
  precio: Float
  image: String
  materials: [MaterialsProduct]
  info: String
  type: String
  preservation: String
  available: Boolean
}

type Store {
  id: Int
  material: Material
  provider: Provider
  uniteds: Int
  expiration_date: String
  brand: String
  weight: Float
  united_weight: Float
}
type Material {
  id: Int
  nombre: String
  type: MaterialType
  store:[Store]
  onStock: onStockMaterial
}
type OrdersLog{
  id_pedido: Int
  user_db: String
  date: String
  client: Int
  delivered: Boolean
  stage: Boolean
   action_name: String
  production: Boolean
}

type MaterialsStage{
  id: Int
  name: String
  weight: Float
  uniteds: Int
}

type StorageLog{
  id_material: Int
  id_provider: Int
  user_db: String
   action_name: String
  date: String
}

type ProducstLog{
  user_db: String
  id_product: Int
  action_name: String
  date: String
}

type SessionLog{
  id_user: Int
  username: String
  date: String
  action_name: String

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

input MaterialInput {
  nombre: String!
  type: Int!
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

input MaterialProductInput {
  materialId: Int!
  quantity: Float!
}

input ProductsInput {
  name: String!
  precio: Float!
  image: Upload!
  info: String!
  type: String!
  available: Boolean
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

input OrderInput {
  id: Int
  payMethod: PayMethod
  deliveryDate: String
  note: String
  deliveryStatus: Boolean
  productionStatus: Boolean
  stage_status: Boolean
  abono: Float
  monto: Float
  total: Float
  client: Int!
  orderProducts: [ProductOrderInput]
}
input TakeOrderInput {
  payMethod: PayMethod!
  deliveryDate: String!
  note: String
  deliveryStatus: Boolean!
  productionStatus: Boolean!
  stageStatus: Boolean!
  abono: Float!
  monto: Float!
  total: Float!
  client: Int!
  orderProducts: [ProductOrderInput!]!
}

type GetProducts {
  results: [Products]
  total: Int
}

type ClientOrders {
  delivered: [Orders]
  pending: [Orders]
}
input UpdateOrder{
  delivery_status: Boolean
  production_status: Boolean
  stage_status: Boolean
}
input UpdateMaterialStage{
   id: Int!
  name: String
  weight: Float!

}

type Query {
  users: [User]
  user(id: Int!): User
  sessionUser: String!
  sessionLog: [SessionLog]
  client(id: Int!): Client
  clients: [Client]
  clientOrders:ClientOrders
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


type Mutation {
  loginUser(email: String!, password: String!): String
  loginClient(cedula: String!): String

  createUser(user: UserInput!): User
  editUser(user: UpdateUserInput!): User
  deleteUser(id: Int!): String

  createClient(client: ClientInput!): Client
  editClient(client: UpdateClientInput!): Client
  deleteClient(id: Int!): String

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