import { Client, Order } from "../../database/models";
import { Resolvers } from "../../__generated";
import { UserInputError } from "apollo-server-express";
import {sign} from "jsonwebtoken";

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
    clientOrders:async (parent, args, ctx)=>{
      const client : Client = await Client.query().findById(ctx.user.id);
      const delivered : Order[] = await client.$relatedQuery("orders").where("order.delivery_status",true);
      const pending : Order[] = await client.$relatedQuery("orders").where("order.delivery_status",false);

      return {
        delivered,
        pending
      }
    }
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
    loginClient: async(parent, args , ctx)=>{
      const {id,cedula,name}: Client = await Client.query().first().where("cedula",args.cedula);
      const secretKey = process.env.SECRET || "221099";

      if(client){
        return sign({id,cedula,name, role:"CLIENT"},secretKey,{
          expiresIn:"1d"
      });
    }
      throw new UserInputError("bad fields",{args:args});

      }

    }
  }


//eliminar los errores de typescript
