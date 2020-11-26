import { Model } from "objection";
import { Maybe } from "../../__generated";
import Material from "./material";

class ProductMaterial extends Model {
  static tableName = "product_material";
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
        from: "product_material.material_id",
        to: "material.id",
      },
    },
  });
}

export default ProductMaterial;
