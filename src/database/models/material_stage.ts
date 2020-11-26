import {Model} from "objection";
import { Maybe } from "../../__generated";

class MaterialsStage extends Model{
    static tableName="materials_stage";
    id?: Maybe<number>;
    material_id?: Maybe<number>;
    name?: Maybe<string>;
    weight?: Maybe<number>;
    uniteds?: Maybe<number>;


}

export default MaterialsStage