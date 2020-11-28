import { Store } from "../../database/models";
import { Resolvers } from "../../__generated";
import { IResolvers } from "../../lib/utils";
import { stringify } from "querystring";
import {db} from "../../index";
import {verify} from "jsonwebtoken";

export const store: Resolvers = {
  Query: {
    store: async (parent, { id }, ctx) => {
      const store: Store = await Store.query()
        .findById(id)
        .select("id", "uniteds", "expiration_date", "brand", "weight");
      return store;
    },
    storage: async (parent, args, ctx) => {
      const storage: Store[] = await Store.query();

      return storage;
    },
  },
  Store: {
    material: async (parent, args, ctx) => {
      const data = await ctx.loaders.material_store.load(parent.id);

      return data[0]!.material;
    },
    provider: async (parent, args, ctx) => {
      const data = await ctx.loaders.store_providers.load(parent.id);
      return data[0]!.provider;
    },
  },
  Mutation: {
    addToStore: async (parent, args, ctx) => {
      
              
      const {expirationDate:expiration_date, materialsId:material_id, providerId: provider_id , ...data} = args.store;
      const stored: Store = await Store.query().insert({ ...data, expiration_date:expiration_date, material_id:material_id, provider_id:provider_id});
      return stored;
    },

    updateStore: async (parent, args, ctx) => {
      const { id, ...data } = args.store!;
     

      const stored: Store = await Store.query().patchAndFetchById(id, data);
      return stored;
    },
    // deleteStore:async (parent,{id},ctx)=>{
    //     const delete = await Store.query().deleteById(id);
    //     return string;
    // }
  },
};
