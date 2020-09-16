import { Client } from "../../database/models";
import { Resolvers } from "../../__generated";
import { UserInputError } from "apollo-server-express";

export const client: Resolvers = {
  Query: {
    clients: async (parent, args, ctx) => {
      const clients: Client[] = await Client.query().select(
        "id",
        "name",
        "cedula",
        "nationality",
        "phone",
        "user_creator as creator_id"
      );

      return clients;
    },
    client: async (parent, args, ctx) => {
      const client: Client = await Client.query()
        .findById(args.id)
        .select(
          "id",
          "name",
          "cedula",
          "nationality",
          "phone",
          "user_creator as creator_id"
        );
      return client;
    },
  },
  Client: {
    creator: async (parent, args, ctx) => {
      const user = await ctx.loaders.user_creator.load(parent.id);
      return user[0]!.creator;
    },
    orders: async (parent, args, ctx) => {
      const orders = await ctx.loaders.clientOrders.load(parent.id);
      return orders[0]!.orders;
    },
  },
  Mutation: {
    createClient: async (
      parent,
      { client: { name, nationality, cedula, creator, phone } },
      ctx
    ) => {
      let client: Client;

      try {
        client = await Client.query().insert({
          name,
          nationality,
          cedula,
          user_creator: creator,
          phone,
        });
        return client;
      } catch (e) {
        throw new UserInputError("Dato invalido", {
          invalidArgs: "On your input you idiot",
        });
      }
    },
    editClient: async (parent, args, ctx) => {
      const { id, ...data } = args.client!;
      const Id: number = id ?? 0;
      const client: Client = await Client.query().patchAndFetchById(Id, data);
      return client;
    },
    deleteClient: async (parent, args, ctx) => {
      const deleted = await Client.query().deleteById(args.id);
      return "Succesfully deleted";
    },
  },
};

//eliminar los errores de typescript
