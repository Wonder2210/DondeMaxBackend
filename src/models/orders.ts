import { Model , RelationMapping} from 'objection';
import Client from './clients';
import Product from './products';
import User from './users';

class Order extends Model {
    static tableName="orders";

      static getRelationsMapping(){
        return {
            client_id:{
               relation : Model.BelongsToOneRelation,
               modelClass : Client,
               join : {
                   from:'orders.client_id',
                   to:'client.id'
               }
            },
            orders_products : {
                relation : Model.ManyToManyRelation,
                modelClass : Product,
                join:{
                    from :'orders.id',
                    through:{
                        from:'orders_products.order_id',
                        to:'orders_product.product_id'
                    },
                    to:'products.id'
                }
            },
            user:{
                relation:Model.BelongsToOneRelation,
                modelClass : User,
                join:{
                    from:'orders.user_id',
                    to:'users.id'
                }
            }
        }
      }
}

export default Order;