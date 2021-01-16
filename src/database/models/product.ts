import { Model } from "objection";
import ProductMaterial from "./product_material";
import ProductType from "./product_type";

class Product extends Model {
  static tableName = "product";
  id!: number;
  name?: string;
  precio?: number;
  image?: string;
  info?: string;
  available?: boolean;
  materials?: ProductMaterial[];
  type?: string;
  preservation?: string;

  static relationMappings = () => ({
    materials: {
      relation: Model.HasManyRelation,
      modelClass: ProductMaterial,
      join: {
        from: "product.id",
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
