import { Model } from 'objection';
import Materials from './materials';


class MaterialsType extends Model {
    static tableName = "materials_type";
    static getRelationsMapping(){
        return {
            products :{
                relation : Model.HasManyRelation,
                modelClass : Materials,
                join : {
                    from : 'materials_type.id',
                    to:'materials.type_id'
                }
            }
        }
    }
}

export default MaterialsType;