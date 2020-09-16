import { Model } from "objection";
import { Maybe } from "../../__generated";
import Product from "./products";
import Material from "./material";

class ProductMaterial extends Model {
  static tableName = "products_materials";
  id?: Maybe<number>;
  product_id?: Maybe<number>;
  material_id?: Maybe<number>;
  quantity?: Maybe<number>;
  material?: Material;

  static relationMappings = () => ({
    material: {
      relation: Model.BelongsToOneRelation,
      modelClass: Material,
      join: {
        from: "products_materials.id",
        to: "materials.id",
      },
    },
  });
}

export default ProductMaterial;
