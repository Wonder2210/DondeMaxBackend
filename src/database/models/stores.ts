import { Model } from 'objection';
import {Maybe} from '../../generated/graphql';
import Material from './materials';
import Provider from './providers';


class Store extends Model {
    static tableName= "store";
    id?:Maybe<number>;
    material_id?:Maybe<number>;
    provider_id?:Maybe<number>;
    uniteds?:Maybe<number>;
    expiration_date?:Maybe<string>;
    brand?:Maybe<string>;
    weight?:Maybe<number>;

    static getRElationsMapping(){
        return {
            material :{
                relation : Model.BelongsToOneRelation,
                modelClass: Material,
                join:{
                    from:"store.materials_id",
                    to:"materials.id"
                }
            },
            provider :{
                relation : Model.BelongsToOneRelation,
                modelClass: Provider,
                join:{
                    from:"store.provider_id",
                    to:"providers.id"
                }
            }
        }
    }
}

export default Store;