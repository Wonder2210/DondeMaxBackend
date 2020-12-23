import {Model} from "objection";

class MaterialsStage extends Model{
    static tableName="materials_stage";
    id?: number;
    material_id?:number;
    name?: string;
    weight?: number;
    uniteds?: number;


}

export default MaterialsStage