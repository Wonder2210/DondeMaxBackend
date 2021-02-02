import {User, UserLog, Order } from '../../database/models';
 import {Resolvers} from '../../__generated';
 import {UserInputError} from 'apollo-server-express';
 import jwt from "jsonwebtoken";
 import getUser from "../../lib/validate";

 export const user:Resolvers  = {
     Query:{
         users:async (parent,args,ctx)=>{
             const users : User[] = await User.query().where("id","!=",1999);
             
             return users;
         },
         clients:async ()=>{
             const clients : User[] = await User.query().where("role","CLIENTE");
             return clients;
         },
         user:async (parent,args,ctx)=>{
             const user : User = await User.query().findById(args.id);
             return user;
         },
         sessionUser: async (parent,args,{auth})=>{
             let user = await getUser(auth);
        
                return user;
         }
           },
           
         User:{
            orders: async (parent, args, ctx) => {
                const orders = await ctx.loaders.userOrders.load(parent.id);
                return {
                  delivered:orders[0]!.ordersRaw.filter((i: Order) =>i.delivery_status),
                  pending:orders[0]!.ordersRaw.filter((i: Order) =>!i.delivery_status),
                  all:orders[0]!.ordersRaw
                };
              },
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
                             .patchAndFetchById(Id,{...data});
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
                return {
                    id,
                    role,
                    token: jwt.sign(
                        {
                          id,
                          phone,
                          name,
                          role,
                          email
                        },
                        secretKey,
                        { expiresIn: '1d' }
                      )
                }
            }
            throw new UserInputError("bad fields",{args:args});

        }
     }
 }