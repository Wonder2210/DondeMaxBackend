import express from "express";
import { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import Knex from "knex";
import { Model } from "objection";
import bodyParser from "body-parser";
import cors from "cors";
import Loaders from "./lib/loaders";
import Mocks from "./lib/mocks";
import { config } from "./database/config";

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
  mocks: false,
  context: {
    loaders: Loaders(),
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
