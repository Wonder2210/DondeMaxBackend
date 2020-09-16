import { Model } from "objection";
import Order from "./orders";
import User from "./users";
import { Maybe } from "../../__generated";

class Client extends Model {
  static tableName = "clients";
  id?: Maybe<number>;
  name?: Maybe<string>;
  cedula?: Maybe<string>;
  nationality?: Maybe<string>;
  user_creator?: Maybe<number>;
  phone?: Maybe<string>;
  creator?: User;
  Orders?: Order[];

  static relationMappings = () => ({
    creator: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "clients.user_creator",
        to: "users.id",
      },
    },
    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: "clients.id",
        to: "orders.client_id",
      },
    },
  });
}

export default Client;
