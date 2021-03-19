import {User, Customer, UserLog, Order } from '../../database/models';
 import {Resolvers} from '../../__generated';
 import {UserInputError, AuthenticationError} from 'apollo-server-express';
 import jwt from "jsonwebtoken";
 import getCustomer from "../../lib/validate_google";
 import getEmployee from "../../lib/validate";

 export const user:Resolvers  = {
     Query:{
         users:async ()=>{
             const users : User[] = await User.query().where("id","!=",1999);
             
             return users;
         },
         clients:async ()=>{
             const clients : Customer[] = await Customer.query();
             return clients;
         },
         client: async (_, { id })=>{
             const client : Customer = await Customer.query().findById(id);
             return client;
         },
         user:async (parent,args,ctx)=>{
             const user : User = await User.query().findById(args.id);
             return user;
         },
         sessionUser: async (parent,args,{auth})=>{

            let customer = await getCustomer(auth).catch((e) => {
                console.log('error in fetching posts user',e);
              });
            let employee = await getEmployee(auth).catch(() => {
                console.log('error in fetching posts employee');
              });
              console.log("Customer:",customer);
              console.log("Emmployee:",employee)
            if(customer && !employee){
                return {
                    __typename:"Customer",
                    ...customer
                }
            }
            else if(!customer && employee){

                return {
                    __typename:"SessionUser",
                    ...employee
                }
            }
            throw new AuthenticationError('you must be logged in!')
         
         }
           },
           Customer:{
               orders:async (parent,args,ctx)=>{
                const orders = await ctx.loaders.customerOrders.load(parent.id);
                return {
                  delivered:orders[0]!.ordersRaw.filter((i: Order) =>i.delivery_status),
                  pending:orders[0]!.ordersRaw.filter((i: Order) =>!i.delivery_status),
                  all:orders[0]!.ordersRaw
                };
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
            authToken: async (parent)=> {
                const secretKey = process.env.SECRET || "221099";
                const {id,name,email,role, phone} = parent;
                
                const user_log = await UserLog.query().insert({username:name,action_name:"login",id_user:id});

                return jwt.sign(
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
         },
         UserOnSession:{
            __resolveType: (obj) => {
                if(obj.__typename === "Customer") return "Customer"

                return "SessionUser";
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

        },
        addCustomerPhone: async (parent,{phone},{ auth})=>{
            let customer = await getCustomer(auth).catch((e) => {
                console.log('error in fetching posts user',e);
              });
            const update = await Customer.query().patchAndFetchById((customer as any).id ,{ phone })

            return update ? true : false;
        }
        
     }
 }