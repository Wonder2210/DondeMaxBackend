import { Model } from "objection";
import { Maybe } from "../../__generated";
import Product from "./product";

class PreservationType extends Model {
  static tableName = "preservation_type";
  id?: Maybe<number>;
  type?: Maybe<string>;
  products?: Product[];

  static relationMappings = () => ({
    products: {
      relation: Model.HasManyRelation,
      modelClass: Product,
      join: {
        from: "preservation_type.type",
        to: "product.preservation",
      },
    },
  });
}

export default PreservationType;
