import express from 'express';
import { Application} from 'express';
import {  ApolloServer} from 'apollo-server-express';
import Knex from 'knex';
import { Model} from 'objection';
import bodyParser from 'body-parser';
import cors from 'cors';
import {material_types} from './lib/loaders';
import config from './knexfile';
import DataLoader from 'dataloader';
import Schema from './typedefs';
import './lib/env';
import { randomBytes } from 'crypto';

const {development} = config;
// import {UserInput} from './generated/graphql';



const app: Application = express();
//middlewares and tools
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

const db = Knex(development);

Model.knex(db);



const server = new ApolloServer({
  schema:Schema,
  introspection: true,
  playground: true,
  context:{
    loaders:{
      material_types: new DataLoader(id=>material_types(id)),
    }
    
  }
});

server.applyMiddleware({
  app,
  path: '/graphql'
});

app.listen({
    port: 4000
  }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
//use graphql 14 , and add .mjs extension to webpack