import { Model } from "objection";
import Order from "./order";
import User from "./user";

class Client extends Model {
  static tableName = "client";
  id?: number;
  name?: string;
  cedula?: string;
  nationality?: string;
  user_creator?: number;
  phone?: string;
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
