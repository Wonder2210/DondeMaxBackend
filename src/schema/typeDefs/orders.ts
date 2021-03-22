import { gql } from "apollo-server";

export default gql`
type OrderWaste {
  name: String
  materials: [MaterialWaste]
}

type OrderProducts {
  id: Int
  quantity: Int
  product: Products
  materials: [MaterialWaste]
}

type Orders {
  id: Int
  pay_method: PayMethod
  delivery_date: Date
  delivery_time: String
  note: String
  delivery_status: Boolean
  production_status: Boolean
  stage_status: Boolean
  abono: Float
  monto: Float
  total: Float
  created_by: String
  customer: Customer
  products: [OrderProducts]
}
input OrderInput {
  id: Int
  payMethod: PayMethod
  deliveryDate: String
  deliveryTime: String
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
  deliveryTime: String
  deliveryStatus: Boolean!
  productionStatus: Boolean!
  stageStatus: Boolean!
  abono: Float!
  monto: Float!
  total: Float!
  orderProducts: [ProductOrderInput!]!
}
input UpdateOrder{
  delivery_status: Boolean
  production_status: Boolean
  stage_status: Boolean
}

`;