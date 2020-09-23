import { Model } from "objection";
import { Maybe } from "../../__generated";
import ProductMaterial from "./products_materials";
import ProductType from "./product_type";

class Product extends Model {
  static tableName = "products";
  id!: number;
  name?: Maybe<string>;
  precio?: Maybe<number>;
  image?: Maybe<string>;
  materials?: ProductMaterial[];
  type?: Maybe<string>;
  preservation?: Maybe<string>;

  static relationMappings = () => ({
    materials: {
      relation: Model.HasManyRelation,
      modelClass: ProductMaterial,
      join: {
        from: "products.id",
        to: "products_materials.product_id",
      },
    },
    type: {
      relation: Model.HasOneRelation,
      modelClass: ProductType,
      join: {
        from: "products.type_id",
        to: "product_types.id",
      },
    },
  });
}

export default Product;
