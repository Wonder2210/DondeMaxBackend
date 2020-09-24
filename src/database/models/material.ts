import { Model } from "objection";
import Store from "./stores";
import MaterialType from "./materials_types";
import ProductMaterial from "./products_materials";
import { Maybe } from "../../__generated";

class Material extends Model {
  static tableName = "material";
  id?: Maybe<number>;
  nombre?: Maybe<string>;
  type?: MaterialType;

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
