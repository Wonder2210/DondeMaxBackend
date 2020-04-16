import {QueryResolvers,MutationResolvers} from '../generated/graphql';

export interface IResolvers {
    Query:QueryResolvers;
    Mutation : MutationResolvers;
}
