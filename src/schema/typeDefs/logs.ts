import { gql } from "apollo-server";

export default gql`
type OrdersLog{
  id_pedido: Int
  user_db: String
  date: Date
  client: Int
  delivered: Boolean
  stage: Boolean
   action_name: String
  production: Boolean
}
type ProducstLog{
  user_db: String
  id_product: Int
  action_name: String
  date: Date
}

type SessionLog{
  id_user: Int
  username: String
  date: Date
  action_name: String

}
type StorageLog{
  id_material: Int
  id_provider: Int
  user_db: String
   action_name: String
  date: Date
}
`;