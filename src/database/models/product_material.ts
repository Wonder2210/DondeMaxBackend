import { Model } from "objection";
import { Maybe } from "../../__generated";
import Material from "./material";

class ProductMaterial extends Model {
  static tableName = "product_material";
  id?: number;
  product_id?: number;
  material_id?: number;
  quantity?: number;
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
