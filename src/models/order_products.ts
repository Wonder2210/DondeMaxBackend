import { Model } from 'objection';
import Order from './orders';
import Product from './products';

class OrderProducts extends Model {
    static tableName="orders_product";
    static getRelationsMapping(){
        return{
            order:{
                relation:Model.BelongsToOneRelation,
                modelClass:Order,
                join:{
                    from:'orders_products.order_id',
                    to:'orders.id'
                }
            },
            product:{
                relation:Model.BelongsToOneRelation,
                modelClass:Product,
                join:{
                    from:'orders_product.product_id',
                    to:'products.id'
                }
            }
        }
    }
}

export default OrderProducts;