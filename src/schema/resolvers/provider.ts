import {Provider} from '../../database/models';

import {Resolvers} from '../../__generated';


export const provider : Resolvers ={
    Query:{
        providers:async (parent,args,ctx)=>{
            const providers : Provider[]= await Provider.query().select('id','name','RIF','phone','direction');
            return providers;
        },
        provider:async(parent,{id},ctx)=>{
            const provider : Provider = await Provider.query()
                                        .findById(id)
                                        .select('id','name','RIF','phone','direction');
         return provider;
        }
    },
    Mutation:{
        createProvider:async (parent,args,ctx)=>{
            const provider : Provider= await Provider.query()
                                                .insert({...args.provider});
            return provider;
        },
        updateProvider:async (parent,{provider:{id,...data}},ctx)=>{
           
            const Id : number = id ?? 0;
            console.log(data);
            const provider : Provider = await Provider.query()
                                                .patchAndFetchById(id, { ...data });
            return provider;
        },
        deleteProvider: async (parent,args,ctx)=>{
            const res = await Provider.query().deleteById(args.id);

            return res ? true : false;
        }
    }
}