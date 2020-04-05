import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import Schema from './schema.gql';
import './lib/env';
import cors from 'cors';


const app : Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


const typeDefs = Schema;

const resolvers = {
  Query: {
    hello: () => 'Hello world! hows it going on',
    bye:()=> "bye marselo",
    meetMGF: ()=> 3
  },
 
};


const server = new ApolloServer({ 
    resolvers,
    typeDefs,
    playground:true});

server.applyMiddleware({app,path:'/graphql'});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
//use graphql 14 , and add .mjs extension to webpack


