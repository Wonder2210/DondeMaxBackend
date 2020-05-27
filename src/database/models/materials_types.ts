import { Model } from 'objection';
import Materials from './materials'; 
import {Maybe} from '../../generated/graphql';


class MaterialsType extends Model {
    static tableName = "materials_type";
    id?:Maybe<number>;
    type?:Maybe<string>;
    
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