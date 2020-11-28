// @ts-nocheck
import { makeExecutableSchema} from 'graphql-tools';
import {Resolvers} from './resolvers';
//import schema from './schema.graphql';
import {schema} from "./schema";

export default makeExecutableSchema({typeDefs:schema,resolvers:Resolvers as any});