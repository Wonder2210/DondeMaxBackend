import { Model } from "objection";
import { Maybe } from "../../__generated";

import Order from "./orders";
import Product from "./products";

class OrderProducts extends Model {
  static tableName = "orders_products";
  id?: Maybe<number>;
  order_id?: Maybe<number>;
  product_id?: Maybe<number>;
  product?: Product;
  quantity?: Maybe<number>;

  static relationMappings = () => ({
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: "orders_products.order_id",
        to: "orders.id",
      },
    },
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "orders_products.product_id",
        to: "products.id",
      },
    },
  });
}

export default OrderProducts;
