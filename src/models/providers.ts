import { Model } from 'objection';
import Store from './stores';

class Provider extends Model {
    static tableName="providers";
    static getRElationsMapping(){
        return {
            store :{
                relation : Model.HasManyRelation,
                modelClass: Store,
                join:{
                    from:"provider.id",
                    to:"store.provider_id"
                }
            }
        }
    }
}

export default Provider;