import {Client} from '../../models';
import {IResolvers} from '../../lib/utils';
 import {Client as IClient} from '../../generated/graphql';
 import {UserInputError} from 'apollo-server-express';

 export const client:IResolvers  = {
     Query:{
         clients:async (parent,args,ctx)=>{
             const clients : IClient[] = await Client.query().select('id','name','cedula','nationality','user_creator','phone');
            
             return clients;
         },
         client:async (parent,args,ctx)=>{
             const client : IClient = await Client.query()
                                        .findById(args.id)
                                        .select('id','name','cedula','nationality','user_creator','phone');
                return client;
         }
     },
     Mutation:{
         createClient:async (parent,args,ctx)=>{
             let client : IClient ;
             try {
                 client=await Client.query().insert({...args.client});
                 return client;
             } catch (e) {
                throw new UserInputError('Dato invalido', {
                    invalidArgs: Object.keys(args),
                  });
             }
         },
         editClient:async (parent,args,ctx)=>{
             const {id,...data}= args?.client;
             const client : IClient = await Client.query().patchAndFetchById(id,data);

             return client;
         },
         deleteClient:async (parent,args,ctx)=>{
            const deleted = await Client.query().deleteById(args.id);
            return "Succesfully deleted";
         }
     }
 }

//eliminar los errores de typescript
