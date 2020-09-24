import { Model } from "objection";
import { Maybe } from "../../__generated";
import Material from "./material";
import Provider from "./provider";

class Store extends Model {
  static tableName = "store";
  id?: Maybe<number>;
  uniteds?: Maybe<number>;
  expiration_date?: Maybe<string>;
  brand?: Maybe<string>;
  weight?: Maybe<number>;
  material?: Material;
  provider?: Provider;

  static relationMappings = () => ({
    material: {
      relation: Model.BelongsToOneRelation,
      modelClass: Material,
      join: {
        from: "store.material_id",
        to: "material.id",
      },
    },
    provider: {
      relation: Model.BelongsToOneRelation,
      modelClass: Provider,
      join: {
        from: "store.provider_id",
        to: "provider.id",
      },
    },
  });
}

export default Store;
