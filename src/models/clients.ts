import {Model} from 'objection';
import Order from './orders';
import {Maybe} from '../generated/graphql';

class Client extends Model {
    static tableName="clients";
    static client_name? : Maybe<string>;
    static cedula?: Maybe<number>;
    static client_phone?: Maybe<string>;

    
    static getRelationsMapping () {
        return {
            orders:{
                relation : Model.HasManyRelation,
                modelClass:Order,
                join:{
                    from : "clients.id",
                    to : "orders.client_id"
                }
            }
        }
    }



}

export default Client;