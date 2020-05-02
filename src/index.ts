import express from 'express';
import { Application} from 'express';
import {  ApolloServer} from 'apollo-server-express';
import Knex from 'knex';
import { Model} from 'objection';
import bodyParser from 'body-parser';
import cors from 'cors';
import {material_types,
      material_store,materials,providers,product_materials,
      materialByProduct,user,order_products,client_order} from './lib/loaders';
import config from './knexfile';
import DataLoader from 'dataloader';
import Schema from './typedefs';
import './lib/env';

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
      material_types: new DataLoader(material_types),
      material_store: new DataLoader(material_store),
      provider:new DataLoader(providers),
      materialByProduct:new DataLoader(materialByProduct),
      productMaterial: new DataLoader(product_materials),
      user: new DataLoader(user),
      orderProducts:new DataLoader(order_products),
      clientOrder:new DataLoader(client_order),
      materials: new DataLoader(materials)
    }

  }
});
//naming convention 

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