import {Client} from '../../database/models';
 import {Resolvers} from '../../__generated';
 import {UserInputError} from 'apollo-server-express';


 export const client:Resolvers  = {
     Query:{
         clients:async (parent,args,ctx)=>{
             const clients : Client[] = await Client.query().select('id','name','cedula','nationality','phone');
            
             return clients;
         },
         client:async (parent,args,ctx)=>{
             const client : Client = await Client.query()
                                        .findById(args.id)
                                        .select('id','name','cedula','nationality','phone');
                return client;
         }
     },
     Client:{
        creator:async (parent,args,ctx)=>{
            const user = await ctx.loaders.user.load(parent.id);
            return user[0];
        }
     },
     Mutation:{
         createClient:async (parent,{client:data},ctx)=>{
             let client : Client ;
             
             try {
                 client=await Client.query().insert(data);
                 return client;
             } catch (e) {
                throw new UserInputError('Dato invalido', {
                    invalidArgs: Object.keys(data),
                  });
             }
         },
         editClient:async (parent,args,ctx)=>{
             const {id,...data} = args.client!;
             const Id : number = id ?? 0;
             const client : Client = await Client.query().patchAndFetchById(Id,data);
             return client;
         },
         deleteClient:async (parent,args,ctx)=>{
            const deleted = await Client.query().deleteById(args.id);
            return "Succesfully deleted";
         }
     }
 }

//eliminar los errores de typescript
