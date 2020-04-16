import { Model } from 'objection';
import Material from './materials';
import Provider from './providers';


class Store extends Model {
    static tableName= "store";

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