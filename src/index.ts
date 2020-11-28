import express from "express";
import { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import Knex from "knex";
import { Model } from "objection";
import bodyParser from "body-parser";
import cors from "cors";
import Loaders from "./lib/loaders";
import Mocks from "./lib/mocks";
import {verify} from "jsonwebtoken";
import { config } from "./database/config";
import Schema from "./schema";
import "./lib/env";



// import {UserInput} from './generated/graphql';

const app: Application = express();
//middlewares and tools
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

export const db = Knex(config["production"]);



Model.knex(db);

const server = new ApolloServer({
  schema: Schema,
  introspection: true,
  playground: true,
  mocks: false,
  context:async ({req})=>{
    
    return {
      loaders: Loaders(),
      user: req.headers.authorization || ""
    }
  },
});
//naming convention

server.applyMiddleware({
  app,
  path: "/graphql",
});

app.listen(
  {
    port: process.env.PORT,
  },
  () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
);
//use graphql 14 , and add .mjs extension to webpack
