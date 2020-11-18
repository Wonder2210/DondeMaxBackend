import { Model } from "objection";
import { Maybe, PayMethod } from "../../__generated";
import Client from "./clients";
import Product from "./product";
import User from "./user";

class Order extends Model {
  static tableName = "order";
  id?: Maybe<number>;
  pay_method?: Maybe<PayMethod>;
  delivery_date?: Maybe<string>;
  note?: Maybe<string>;
  delivery_status?: Maybe<boolean>;
  production_status?: Maybe<boolean>;
  stage_status?: Maybe<boolean>;
  abono?: Maybe<number>;
  monto?: Maybe<number>;
  total?: Maybe<number>;
  client_id?: Maybe<Number>;
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
