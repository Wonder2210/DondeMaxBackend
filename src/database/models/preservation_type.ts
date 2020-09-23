import { Model } from "objection";
import { Maybe } from "../../__generated";
import Products from "./products";

class PreservationType extends Model {
  static tableName = "preservation_types";
  id?: Maybe<number>;
  type?: Maybe<string>;
  products?: Products[];

  static relationMappings = () => ({
    products: {
      relation: Model.HasManyRelation,
      modelClass: Products,
      join: {
        from: "preservation_types.type",
        to: "products.preservation",
      },
    },
  });
}

export default PreservationType;
