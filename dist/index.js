"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Apollo = __importStar(require("apollo-server-express"));
var path_1 = require("path");
var dotenv_1 = require("dotenv");
dotenv_1.config({ path: path_1.resolve(__dirname, "../../.env") });
var ApolloServer = Apollo.ApolloServer, gql = Apollo.gql;
var app = express_1.default();
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    hello: String\n  }\n"], ["\n  type Query {\n    hello: String\n  }\n"])));
var resolvers = {
    Query: {
        hello: function () { return 'Hello world!'; },
    },
};
app.set('port', 3000);
var server = new ApolloServer({ resolvers: resolvers, typeDefs: typeDefs });
server.applyMiddleware({ app: app, path: '/graphql' });
app.listen({ port: 4000 }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:4000");
});
var templateObject_1;
