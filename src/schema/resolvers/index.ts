import {user} from './user';
import {client} from  './client';
import {material} from './material';
import {provider} from './provider';
import {store} from './store';
import {product} from './products';
import {order} from './orders';
import {Logs} from "./logs";

export const Resolvers = [product,user,client,material,provider,store,order,Logs];