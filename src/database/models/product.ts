import { Model } from "objection";
import { Maybe } from "../../__generated";
import ProductMaterial from "./product_material";
import ProductType from "./product_type";

class Product extends Model {
  static tableName = "product";
  id!: number;
  name?: Maybe<string>;
  precio?: Maybe<number>;
  image?: Maybe<string>;
  info?: Maybe<string>;
  materials?: ProductMaterial[];
  type?: Maybe<string>;
  preservation?: Maybe<string>;

  static relationMappings = () => ({
    materials: {
      relation: Model.HasManyRelation,
      modelClass: ProductMaterial,
      join: {
        from: "products.id",
        to: "product_material.product_id",
      },
    },
    type: {
      relation: Model.HasOneRelation,
      modelClass: ProductType,
      join: {
        from: "product.type_id",
        to: "product_type.id",
      },
    },
  });
}

export default Product;
