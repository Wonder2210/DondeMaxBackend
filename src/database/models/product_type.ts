import { Model } from "objection";
import { Maybe } from "../../__generated";
import Products from "./products";

class ProductType extends Model {
  static tableName = "product_types";
  id?: Maybe<number>;
  name?: Maybe<string>;
  products?: Products[];

  static relationMappings = () => ({
    products: {
      relation: Model.HasManyRelation,
      modelClass: Products,
      join: {
        from: "product_types.type",
        to: "products.type",
      },
    },
  });
}

export default ProductType;
