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
import * as dotenv from "dotenv";

dotenv.config()

const app: Application = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

const environment = process.env.NODE_ENV || "development";

export const db = Knex(config[environment]);

Model.knex(db);

const server = new ApolloServer({
  schema: Schema,
  introspection: true,
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

let port =  process.env.PORT || 4000;

app.listen(
  {
    port:port,
  },
  () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
);
//use graphql 14 , and add .mjs extension to webpack
