import { ProducstLog, Resolvers } from "../../__generated";
import { ProductsLog, StorageLog, OrdersLog, Order} from "../../database/models";


export const Logs : Resolvers ={
    Query:{
        productsLog:async (parent, args, ctx)=>{
            const logs : ProducstLog[] = await ProductsLog.query();
            return logs;
        },
        storageLog:async (parent,args,ctx)=>{
            const logs : StorageLog[] = await StorageLog.query();
            return logs;
        },
        ordersLog:async (parent,args,ctx)=>{
            const logs : OrdersLog[] = await OrdersLog.query();
            return logs;
        }
    }
}