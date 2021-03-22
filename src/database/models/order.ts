import { Model } from "objection";
import { PayMethod } from "../../__generated";
import Product from "./product";
import User from "./user";
import Customer from "./customer";

class Order extends Model {
  static tableName = "order";
  id?: number;
  pay_method?: PayMethod;
  delivery_date?: string;
  delivery_time?: string;
  note?: string;
  delivery_status?: boolean;
  production_status?: boolean;
  stage_status?: boolean;
  abono?: number;
  monto?: number;
  total?: number;
  user_id?: number;
  creator?: String;
  products?: [Product];

  static relationMappings = () => ({
 
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
    customer: {
      relation: Model.BelongsToOneRelation,
      modelClass: Customer,
      join: {
        from: "order.customer_id",
        to: "customer.id",
      },
    },
  });
}

export default Order;
