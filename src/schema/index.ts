// @ts-nocheck
import { makeExecutableSchema} from 'graphql-tools';
import {Resolvers} from './resolvers';
import {typeDefs} from "./typeDefs";

export default makeExecutableSchema({typeDefs,resolvers:Resolvers as any});