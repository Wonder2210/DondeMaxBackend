import { Model , RelationMapping} from 'objection';
import {Maybe,Pay_Method} from '../../generated/graphql';
import Client from './clients';
import Product from './products';
import User from './users';


class Order extends Model {
    static tableName="orders";
    id?:Maybe<number>;
    user_id?:Maybe<number>;
    pay_method?:Maybe<Pay_Method>;
    delivery_date?:Maybe<string>;
    note?:Maybe<string>;
    delivery_status?:Maybe<boolean>;
    production_status?:Maybe<boolean>;
    stage_status?:Maybe<boolean>;
    abono?:Maybe<number>;
    monto?:Maybe<number>;
    total?:Maybe<number>;


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