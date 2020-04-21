import { Model } from 'objection';
import Store from './stores';
import ProductMaterial from './products_materials';
import {Maybe} from './../generated/graphql';


class Materials extends Model {
    static tableName="materials";
    id?:Maybe<number>;
    nombre?:Maybe<string>;
    type_id?:Maybe<number>;

    static getRelationsMapping(){
        return {
            store :{
                relation : Model.HasManyRelation,
                modelClass:Store,
                join:{
                    from:"materials.id",
                    to : "store.materials_id"
                }
            },
            products_material:{
                relation:Model.HasManyRelation,
                modelClass:ProductMaterial,
                join:{
                    from:'materials.id',
                    to:'products_materials.material_id'
                }
            }
        }
    }
}

export default Materials;