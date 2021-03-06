import { Model } from "objection";
import { Maybe } from "../../__generated";

import Store from "./store";

class Provider extends Model {
  static tableName = "provider";
  id?: Maybe<number>;
  name?: Maybe<string>;
  RIF?: Maybe<string>;
  phone?: Maybe<string>;
  direction?: Maybe<string>;

  static getRElationsMapping() {
    return {
      store: {
        relation: Model.HasManyRelation,
        modelClass: Store,
        join: {
          from: "provider.id",
          to: "store.provider_id",
        },
      },
    };
  }
}

export default Provider;
