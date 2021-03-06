import { Model } from "objection";
import { Maybe } from "../../__generated";
import Product from "./product";

class ProductType extends Model {
  static tableName = "product_type";
  id?: number;
  name?: string;
  products?: Product[];

  static relationMappings = () => ({
    products: {
      relation: Model.HasManyRelation,
      modelClass: Product,
      join: {
        from: "product_type.type",
        to: "product.type",
      },
    },
  });
}

export default ProductType;
