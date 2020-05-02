import {Client} from '../../models';
import {IResolvers} from '../../lib/utils';
 import {Client as IClient,ClientResolvers, IUser} from '../../generated/graphql';
 import {UserInputError} from 'apollo-server-express';

interface Resolvers extends IResolvers{
   client:ClientResolvers
}

 export const client:Resolvers  = {
     Query:{
         clients:async (parent,args,ctx)=>{
             const clients : IClient[] = await Client.query().select('id','name','cedula','nationality','phone');
            
             return clients;
         },
         client:async (parent,args,ctx)=>{
             const client : IClient = await Client.query()
                                        .findById(args.id)
                                        .select('id','name','cedula','nationality','phone');
                return client;
         }
     },
     client:{
        creator:async (parent,args,ctx)=>{
            const user : IUser[]= await ctx.loaders.user.load(parent.id);
            return user[0];
        }
     },
     Mutation:{
         createClient:async (parent,{client:data},ctx)=>{
             let client : IClient ;
             
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
             const client : IClient = await Client.query().patchAndFetchById(Id,data);
             return client;
         },
         deleteClient:async (parent,args,ctx)=>{
            const deleted = await Client.query().deleteById(args.id);
            return "Succesfully deleted";
         }
     }
 }

//eliminar los errores de typescript
