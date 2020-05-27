import { Model } from 'objection';
import {Maybe} from '../../generated/graphql';

import Store from './stores';

class Provider extends Model {
    static tableName="providers";
    id?:Maybe<number>;
    name?:Maybe<string>;
    RIF?:Maybe<string>;
    phone?:Maybe<string>;
    direction?:Maybe<string>;

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