import {User} from '../../models';
import {IResolvers} from '../../lib/utils';
 import {User as IUser} from '../../generated/graphql';
 import {UserInputError} from 'apollo-server-express';


 export const user:IResolvers  = {
     Query:{
         users:async (parent,args,ctx)=>{
             const users : IUser[] = await User.query().select('id','name','email','password','phone');
             
             return users;
         },
         user:async (parent,args,ctx)=>{
             const user : IUser = await User.query().findById(args.id).select('id','name','email','password','phone');
             return user;
         },
         loginUser:async (parent,args,ctx)=>{
            const user : User = await User.query().select('id','name','email','password','phone').first().where('email',args.email);
            const verification = await user.verifyPassword(args.password);
            const validate : IUser = user;
            if(verification){
                return  validate;
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
                 console.log(error);
                throw new UserInputError('Email Invalido', {
                    invalidArgs: Object.keys(args),
                  });
             }
             return user;
         },
         editUser: async (parent,args,ctx)=>{
             const {id,...data} = args.user;
             const Id : number = id ?? 0;
             
             const user : IUser = await User.query()
                             .patchAndFetchById(Id,data);
             return user;
         },
         deleteUser:async (parent,args,ctx)=>{
             const deleted = await User.query().deleteById(args.id);
             return "Succesfull deleted";
         }
     }
 }

//eliminar los errores de typescript
