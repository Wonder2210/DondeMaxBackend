import {Model,mixin} from 'objection';
import Order from './orders';
import bcrypt from 'bcrypt';
import {Maybe} from '../generated/graphql';




class User extends Model {
    static tableName = "users";
    id?:Maybe<number> ;
    email?:Maybe<string> ;
    name? :Maybe<string>;
    password? : Maybe<string> ;
    phone? : Maybe<string> ;
    
    
   
    
    $beforeInsert=async (context:{})=>{
        const password :string = this.password!;
        const hash =await bcrypt.hash(password, 10)
        this.password=hash;
    }
    static ver: any;
    

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
};

export default User;
