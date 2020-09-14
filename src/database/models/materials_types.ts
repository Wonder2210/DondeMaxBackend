import { Model } from "objection";
import Material from "./material";
import { Maybe } from "../../__generated";

class MaterialsType extends Model {
  static tableName = "materials_type";
  id?: Maybe<number>;
  name?: Maybe<string>;

  static getRelationsMapping() {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Material,
        join: {
          from: "materials_type.id",
          to: "materials.type_id",
        },
      },
    };
  }
}

export default MaterialsType;
