import { Model } from "objection";
import Store from "./store";
import MaterialType from "./material_type";
import ProductMaterial from "./product_material";

class Material extends Model {
  static tableName = "material";
  id?: number;
  nombre?: string;
  type_id?: number;
  type?: MaterialType;
  store?: [Store];

  static relationMappings = () => ({
    store: {
      relation: Model.HasManyRelation,
      modelClass: Store,
      join: {
        from: "material.id",
        to: "store.material_id",
      },
    },
    products_material: {
      relation: Model.HasManyRelation,
      modelClass: ProductMaterial,
      join: {
        from: "material.id",
        to: "products_material.material_id",
      },
    },
    type: {
      relation: Model.HasOneRelation,
      modelClass: MaterialType,
      join: {
        from: "material_type.id",
        to: "material.type_id",
      },
    },
  });
}

export default Material;
