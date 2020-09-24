import { Model } from "objection";
import Material from "./material";
import { Maybe } from "../../__generated";

class MaterialType extends Model {
  static tableName = "material_type";
  id?: Maybe<number>;
  name?: Maybe<string>;

  static getRelationsMapping() {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Material,
        join: {
          from: "material_type.id",
          to: "material.type_id",
        },
      },
    };
  }
}

export default MaterialType;
