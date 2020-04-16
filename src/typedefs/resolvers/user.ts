import {User} from '../../models';
import {IResolvers} from '../../lib/utils';
 import {User as IUser} from '../../generated/graphql';
 import {UserInputError} from 'apollo-server-express';

 export const user:IResolvers  = {
     Query:{
         users:async (parent,args,ctx)=>{
             const users : IUser[] = await User.query().select('id','name','password','phone');
             
             return users;
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
