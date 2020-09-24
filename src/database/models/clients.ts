import { Model } from "objection";
import Order from "./order";
import User from "./user";
import { Maybe } from "../../__generated";

class Client extends Model {
  static tableName = "client";
  id?: Maybe<number>;
  name?: Maybe<string>;
  cedula?: Maybe<string>;
  nationality?: Maybe<string>;
  user_creator?: Maybe<number>;
  phone?: Maybe<string>;
  creator?: User;
  orders?: Order[];

  static relationMappings = () => ({
    creator: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "client.user_creator",
        to: "users.id",
      },
    },
    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: "client.id",
        to: "order.client_id",
      },
    },
  });
}

export default Client;
