import { Model } from "objection";
import { Maybe } from "../../__generated";
import Material from "./material";

class Product extends Model {
  static tableName = "products";
  id!: number;
  name?: Maybe<string>;
  precio?: Maybe<number>;
  image?: Maybe<string>;
  materials?: Material[];

  static relationMappings = () => ({
    materials: {
      relation: Model.ManyToManyRelation,
      modelClass: Material,
      join: {
        from: "products.id",
        through: {
          from: "products_materials.product_id",
          to: "products_materials.material_id",
        },
        to: "materials.id",
      },
    },
  });
}

export default Product;
