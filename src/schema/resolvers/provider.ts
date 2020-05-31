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
        updateProvider:async (parent,args,ctx)=>{
            const {id, ...data} = args.provider!;
            const Id : number = id ?? 0;
            const provider : Provider = await Provider.query()
                                                .patchAndFetchById(Id,{...data});
            return provider;
        },
    }
}