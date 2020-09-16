import { Store } from "../../database/models";
import { Resolvers } from "../../__generated";
import { IResolvers } from "../../lib/utils";
import { stringify } from "querystring";

export const store: Resolvers = {
  Query: {
    store: async (parent, { id }, ctx) => {
      const store: Store = await Store.query()
        .findById(id)
        .select("id", "uniteds", "expiration_date", "brand", "weight");
      return store;
    },
    storage: async (parent, args, ctx) => {
      const storage: Store[] = await Store.query().select(
        "id",
        "uniteds",
        "expiration_date",
        "brand",
        "weight"
      );

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
      const stored: Store = await Store.query().insert({ ...args.store });
      return stored;
    },

    updateStore: async (parent, args, ctx) => {
      const { id, ...data } = args.store!;
      const Id: number = id ?? 0;

      const stored: Store = await Store.query().patchAndFetchById(Id, data);
      return stored;
    },
    // deleteStore:async (parent,{id},ctx)=>{
    //     const delete = await Store.query().deleteById(id);
    //     return string;
    // }
  },
};
