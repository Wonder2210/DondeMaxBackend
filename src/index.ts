import express from "express";
import { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import Knex from "knex";
import { Model } from "objection";
import bodyParser from "body-parser";
import cors from "cors";
import {
  material_types,
  material_store,
  materials,
  materialByProduct,
  user_creator,
  order_products,
  client_orders,
  order_client,
  store_providers,
} from "./lib/loaders";
import { config } from "./database/config";
import DataLoader from "dataloader";
import Schema from "./schema";
import "./lib/env";

const { development } = config;
// import {UserInput} from './generated/graphql';

const app: Application = express();
//middlewares and tools
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

const db = Knex(development);

Model.knex(db);

const server = new ApolloServer({
  schema: Schema,
  introspection: true,
  playground: true,
  context: {
    loaders: {
      material_types: new DataLoader(material_types),
      material_store: new DataLoader(material_store),
      materialByProduct: new DataLoader(materialByProduct),
      order_client: new DataLoader(order_client),
      user_creator: new DataLoader(user_creator),
      orderProducts: new DataLoader(order_products),
      clientOrders: new DataLoader(client_orders),
      materials: new DataLoader(materials),
      store_providers: new DataLoader(store_providers),
    },
  },
});
//naming convention

server.applyMiddleware({
  app,
  path: "/graphql",
});

app.listen(
  {
    port: 3000,
  },
  () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
//use graphql 14 , and add .mjs extension to webpack
