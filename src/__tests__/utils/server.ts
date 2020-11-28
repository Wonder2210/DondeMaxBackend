// @ts-nocheck
import { ApolloServer } from "apollo-server-express";
import Knex from "knex";
import { Model } from "objection";
import Loaders from "../../lib/loaders";
import { config } from "../../database/config";

import Schema from "../../schema";
import "./lib/env";

const { development } = config;
// import {UserInput} from './generated/graphql';

const db = Knex(development);

export const startDb = () => Model.knex(db);

export const stopDb = () => Model.knex().destroy();

const config = {
  schema: Schema,
  context: {
    loaders: Loaders(),
  },
};
export const server: () => ApolloServer = () => new ApolloServer(config);
