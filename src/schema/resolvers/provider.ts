import {Provider} from '../../models';

import {Providers as IProviders} from '../../generated/graphql';

import {IResolvers} from '../../lib/utils';

export const provider : IResolvers ={
    Query:{
        providers:async (parent,args,ctx)=>{
            const providers : IProviders[]= await Provider.query().select('id','name','RIF','phone','direction');
            return providers;
        },
        provider:async(parent,{id},ctx)=>{
            const provider : IProviders = await Provider.query()
                                        .findById(id)
                                        .select('id','name','RIF','phone','direction');
         return provider;
        }
    },
    Mutation:{
        createProvider:async (parent,args,ctx)=>{
            const provider : IProviders= await Provider.query()
                                                .insert({...args.provider});
            return provider;
        },
        updateProvider:async (parent,args,ctx)=>{
            const {id, ...data} = args.provider!;
            const Id : number = id ?? 0;
            const provider : IProviders = await Provider.query()
                                                .patchAndFetchById(Id,{...data});
            return provider;
        },
    }
}