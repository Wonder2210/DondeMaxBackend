import { gql } from "apollo-server";

export default gql`
type Material {
  id: Int
  nombre: String
  type: MaterialType
  store:[Store]
  onStock: onStockMaterial
}


type MaterialsStage{
  id: Int
  name: String
  weight: Float
  uniteds: Int
}

input MaterialInput {
  nombre: String!
  type: Int!
}
input MaterialProductInput {
  materialId: Int!
  quantity: Float!
}
input UpdateMaterialStage{
   id: Int!
  name: String
  weight: Float!

}
type MaterialWaste {
  id:Int
  material_name: String
  quantity: Float
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

`;