import { Model } from "objection";
import { Maybe, PayMethod } from "../../__generated";
import Client from "./clients";
import Product from "./product";
import User from "./user";

class Order extends Model {
  static tableName = "order";
  id?: number;
  pay_method?: PayMethod;
  delivery_date?: string;
  note?: string;
  delivery_status?: boolean;
  production_status?: boolean;
  stage_status?: boolean;
  abono?: number;
  monto?: number;
  total?: number;
  client_id?: number;
  user_id?: number;
  creator?: User;
  client?: Client;
  products?: [Product];

  static relationMappings = () => ({
    client: {
      relation: Model.BelongsToOneRelation,
      modelClass: Client,
      join: {
        from: "order.client_id",
        to: "client.id",
      },
    },
    products: {
      relation: Model.ManyToManyRelation,
      modelClass: Product,
      join: {
        from: "order.id",
        through: {
          from: "order_product.order_id",
          to: "order_product.product_id",
        },
        to: "product.id",
      },
    },
    creator: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "order.user_id",
        to: "user.id",
      },
    },
  });
}

export default Order;
