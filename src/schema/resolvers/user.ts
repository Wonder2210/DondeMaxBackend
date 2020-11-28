import {User, UserLog} from '../../database/models';
 import {Resolvers} from '../../__generated';
 import {UserInputError} from 'apollo-server-express';
 import {sign,verify} from "jsonwebtoken";
 import {db} from "../../index";

 export const user:Resolvers  = {
     Query:{
         users:async (parent,args,ctx)=>{
             const users : User[] = await User.query().where("id","!=",1999);
             
             return users;
         },
         user:async (parent,args,ctx)=>{
             const user : User = await User.query().findById(args.id);
             return user;
         },
         sessionUser: async (parent,args,ctx)=>{
             let user= "";
                try{
                    let verified = await verify(ctx.user,process.env.SECRET || "221099");
                    user=JSON.stringify(verified.valueOf());
                    
          
                }catch(err){
                    console.log(err);
                };

                return user;
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
            
            const user_log = await UserLog.query().insert({username:name,action_name:"login",id_user:id});
            
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
