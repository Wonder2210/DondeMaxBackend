import { Model } from "objection";
import Order from "./order";
import { Maybe } from "../../__generated";


class Customer extends Model {
  static tableName = "customer";
  id?: number;
  googleId?: Maybe<string>;
  name?: Maybe<string>;
  lastName?: Maybe<string>;
  phone?: Maybe<string>;
  email?: Maybe<string>;
  image?: Maybe<string>;
  ordersRaw?: Array<Order>;

  static relationMappings = ()=>({
        ordersRaw: {
            relation: Model.HasManyRelation,
            modelClass: Order,
            join: {
              from: "customer.id",
              to: "order.customer_id",
            },
          },
    }
  )
}


export default Customer;
