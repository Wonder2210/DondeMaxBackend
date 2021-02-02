import { Model } from "objection";
import Order from "./order";
import bcrypt from "bcrypt";
import { Maybe , UserRole } from "../../__generated";

type Constructor<T extends Model = Model> = new (...args: any[]) => T;

function mixin<T extends Constructor>(ModelClass: T) {
  return class extends ModelClass {
    password?: Maybe<string>;
    public async verifyPassword(plain_password: string) {
      if (this.password) {
        const hash: string = this.password;
        const verification = await bcrypt.compare(plain_password, hash);

        return verification;
      }
    }
  };
}

class User extends mixin(Model) {
  static tableName = "user";
  id?: Maybe<number>;
  email?: Maybe<string>;
  name?: Maybe<string>;
  role?: Maybe<UserRole>;
  password?: Maybe<string>;
  phone?: Maybe<string>;
  ordersRaw?: [Order];


  
  static relationMappings = ()=>({
    ordersRaw: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: "user.id",
        to: "order.user_id",
      },
    },
  })
  $beforeInsert = async (context: {}) => {
    const password: string = this.password!;
    const hash = await bcrypt.hash(password, 10);
    this.password = hash;
  };
}

export default User;
