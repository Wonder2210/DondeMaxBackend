import {User} from '../../models';
import {IResolvers} from '../../lib/utils';
 import {User as IUser} from '../../generated/graphql';
 import {UserInputError} from 'apollo-server-express';
 import VerifyPassword from '../../lib/verify_password';
import verify_password from '../../lib/verify_password';


 export const user:IResolvers  = {
     Query:{
         users:async (parent,args,ctx)=>{
             const users : IUser[] = await User.query().select('id','name','email','password','phone');
             
             return users;
         },loginUser:async (parent,args,ctx)=>{
            const user : IUser = await User.query().select('id','name','email','password','phone').first().where('email',args.email);
            const verification = verify_password(args.password,user.password);
            if(verification){
                return  user;
            }
            throw new UserInputError('Email o clave Invalido', {
                invalidArgs: Object.keys(args),
              });

        }
        
         
     },
     Mutation:{
         createUser:async (parent,args,ctx)=>{
             let user : IUser;
             try {
                 user = await User.query().insert({...args.user});
             } catch (error) {
                throw new UserInputError('Email Invalido', {
                    invalidArgs: Object.keys(args),
                  });
             }
             return user;
         },
         editUser: async (parent,args,ctx)=>{
             const {id,...data} =args.user;
             const user : IUser = await User.query()
                             .patchAndFetchById(id,data);
             return user;
         },
         deleteUser:async (parent,args,ctx)=>{
             const deleted = await User.query().deleteById(args.id);
             return "Succesfull deleted";
         }
     }
 }

//eliminar los errores de typescript
