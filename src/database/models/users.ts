import {Model} from 'objection';
import Order from './orders';
import bcrypt from 'bcrypt';
import {Maybe} from '../../generated/graphql';

type Constructor<T extends Model = Model> = new (
    ...args: any[]
  ) => T;

  function mixin<T extends Constructor>(ModelClass: T) {
    return class extends ModelClass {
        password?:Maybe<string>;
        public async verifyPassword(plain_password:string){
            if(this.password){
                const hash : string  = this.password;
                const verification = await bcrypt.compare(plain_password,hash);

                return verification;
            }
            }
        }
    };
  



class User extends mixin(Model) {
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
