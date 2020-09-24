import { Model } from "objection";
import { Maybe } from "../../__generated";

import Order from "./order";
import Product from "./product";

class OrderProduct extends Model {
  static tableName = "orders_product";
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
        from: "order_product.order_id",
        to: "orders.id",
      },
    },
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "order_product.product_id",
        to: "products.id",
      },
    },
  });
}

export default OrderProduct;
