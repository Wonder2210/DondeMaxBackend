import {Model} from 'objection';
import Order from './orders';
import bcrypt from 'bcrypt';

class User extends Model {
    static tableName = "users";
    id?:number| null ;
    email?:string| null ;
    name? :string| null;
    password? : string| null ;
    phone? : string| null ;

   
    

    static getRelationsMapping(){
        return {
            orders:{
                realation : Model.HasManyRelation,
                modelClass:Order,
                join:{
                    from:'user.id',
                    to:'orders.user_id'
                }
            }
        }
    }
}

export default User;