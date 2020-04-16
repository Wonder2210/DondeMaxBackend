import {Model} from 'objection';
import Order from './orders';

class Client extends Model {
    static tableName="clients";
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