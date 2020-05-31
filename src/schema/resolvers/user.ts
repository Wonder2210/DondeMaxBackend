import {User} from '../../database/models';
 import {Resolvers} from '../../__generated';
 import {UserInputError} from 'apollo-server-express';


 export const user:Resolvers  = {
     Query:{
         users:async (parent,args,ctx)=>{
             const users : User[] = await User.query().select('id','name','email','password','phone');
             
             return users;
         },
         user:async (parent,args,ctx)=>{
             const user : User = await User.query().findById(args.id).select('id','name','email','password','phone');
             return user;
         },
         loginUser:async (parent,args,ctx)=>{
            const user : User = await User.query().select('id','name','email','password','phone').first().where('email',args.email);
            const verification = await user.verifyPassword(args.password);
            
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
             let user : User;
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
             
             const user : User = await User.query()
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
