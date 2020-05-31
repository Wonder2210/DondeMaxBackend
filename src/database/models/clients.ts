import {Model} from 'objection';
import Order from './orders';
import {Maybe} from '../../__generated';

class Client extends Model {
    static tableName="clients";
    id? : Maybe<number>;
    name? : Maybe<string>;
    cedula?: Maybe<string>;
    nationality? : Maybe<string>;
    user_creator?: Maybe<number>;
    phone?: Maybe<string>;
    
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