import {Store} from '../../models';
import {Store as IStore,StoreResolvers, Providers} from '../../generated/graphql'
import {IResolvers} from '../../lib/utils';
import { stringify } from 'querystring';

interface Resolvers extends IResolvers{
    store:StoreResolvers;

}

export const store : Resolvers={
    Query:{
        store:async (parent,{id},ctx)=>{
            const store : IStore = await Store.query()
                            .findById(id)
                            .select('id','uniteds','expiration_date','brand','weight');
            return store;
        },
        storage:async (parent,args,ctx)=>{
            const storage : IStore[] = await Store.query()
            .select('id','uniteds','expiration_date','brand','weight');

            return storage;
        }
    },
    store:{
        material:async (parent,args,ctx)=>{
            const data= await ctx.loaders.material.load(parent.id);
    
            return data;
        },
        provider:async (parent,args,ctx)=>{
            const data= await ctx.loaders.providers.load(parent.id);
            return data;
        }
    },
    Mutation:{
        addToStore:async (parent,args,ctx)=>{
            const stored : IStore = await Store.query().insert({...args.store});
            return stored;
        },
        updateStore:async (parent,{store:{id,...data}},ctx)=>{
            const stored : IStore = await Store.query().patchAndFetchById(id,data);
            return stored;}
        // },
        // deleteStore:async (parent,{id},ctx)=>{
        //     const delete = await Store.query().deleteById(id);
        //     return string;
        // }
        
    }
}