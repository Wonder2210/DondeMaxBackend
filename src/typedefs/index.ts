import { makeExecutableSchema} from 'graphql-tools';
import {Resolvers} from './resolvers';
import schema = require('./schema.graphql');


export default makeExecutableSchema({typeDefs:schema,resolvers:Resolvers as any});