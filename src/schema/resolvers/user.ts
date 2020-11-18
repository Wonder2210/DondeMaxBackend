import {User} from '../../database/models';
 import {Resolvers} from '../../__generated';
 import {UserInputError} from 'apollo-server-express';
 import {sign} from "jsonwebtoken";


 export const user:Resolvers  = {
     Query:{
         users:async (parent,args,ctx)=>{
             const users : User[] = await User.query();
             
             return users;
         },
         user:async (parent,args,ctx)=>{
             const user : User = await User.query().findById(args.id);
             return user;
         },
         sessionUser: async (parent,args,ctx)=>{
                return JSON.stringify(ctx.user);
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
         },
         loginUser:async (parent,args,ctx)=>{
            const user : User = await User.query().first().where('email',args.email);
            const verification = await user.verifyPassword(args.password);
            const secretKey = process.env.SECRET || "221099";
            const {id,name,email,role, phone} = user;
            if(verification){
                return sign({id,name,email,role, phone},secretKey,{
                    expiresIn:'365d'
                });
            }
            throw new UserInputError("bad fields",{args:args});

        }
     }
 }

//eliminar los errores de typescript
