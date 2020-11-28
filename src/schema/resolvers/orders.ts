// @ts-nocheck
import { Order, OrderProduct, ProductMaterial } from "../../database/models";
import { Resolvers, ProductOrderInput } from "../../__generated";
import {verify} from "jsonwebtoken";

export const order: Resolvers = {
  Query: {
    orders: async (parent, args, ctx) => {
      const orders: Order[] = await Order.query();
      return orders;
    },
    order: async (parent, { id }, ctx) => {
      const order: Order = await Order.query().findById(id);
      return order;
    },
  },
  Orders: {
    client: async (parent, args, ctx) => {
      const client = await ctx.loaders.order_client.load(parent.id);
 
      return client[0]!.client;
    },
    products: async (parent, args, ctx) => {
      const products = await ctx.loaders.orderProducts.load(parent.id);
     
      return products;
    },
    creator: async (parent, args, ctx) => {
      const creator = await ctx.loaders.order_creator.load(parent.id);

      return creator[0]!.creator;
    },
  },
  OrderProducts: {
    materials: async (parent, args, ctx) => {
      const materials = await ctx.loaders.materials_products.load(parent.product!.id);
   
      const materials_filtered = materials.map((i: ProductMaterial) => {
       
        let quantity = i!.quantity!;
        let parent_quantity = parent!.quantity!;
        return {
          id:i!.material!.id,
          material_name: i!.material!.nombre,
          quantity: quantity * parent_quantity,
        };
      });
      return materials_filtered;
    },
  },

  Mutation: {
    takeOrder: async (parent, args, ctx) => {
      let user = null;
      try{
        let verified = await verify(ctx.user,process.env.SECRET || "221099");
        user=verified.valueOf();
    }catch(err){
        console.log(err);
    };
      
      const {client,payMethod, orderProducts,stageStatus,deliveryStatus,deliveryDate,productionStatus,...data} = args.order;
      const order: Order = await Order.query().insert({
        stage_status:stageStatus,
        client_id:client,
        pay_method:payMethod,
        delivery_date:deliveryDate,delivery_status:deliveryStatus,production_status:productionStatus,...data, user_id:user!.role!=="CLIENT"? user!.id : null});
      const products = orderProducts.map((item: ProductOrderInput) => ({
        product_id: item?.id,
        order_id: order.id,
        quantity: item?.quantity,
      }));

      const products_order = await OrderProduct.query().insertGraph(products);
      return order;
    },
    takeOrderClient: async (parent, args, ctx) => {
      let user = null;
     
      
      const {client,payMethod, orderProducts,stageStatus,deliveryStatus,deliveryDate,productionStatus,...data} = args.order;
      const order: Order = await Order.query().insert({
      
        stage_status:stageStatus,
        client_id:client,
        pay_method:payMethod,
        delivery_date:deliveryDate,delivery_status:deliveryStatus,production_status:productionStatus,...data, user_id:1999});
      const products = orderProducts.map((item: ProductOrderInput) => ({
        product_id: item?.id,
        order_id: order.id,
        quantity: item?.quantity,
      }));

     try{
      const products_order = await OrderProduct.query().insertGraph(products);
      
     } catch(e){
       console.log(e);
     }
      return order;
    },
    updatStateOrder: async (parent,{id,state},ctx)=>{
      const update= await Order.query().patchAndFetchById(id,{...state});
      return update;
    },
    deleteOrder: async (parent,{id},ctx)=>{
      const deleted = await Order.query().deleteById(id);
      return "succesfull deleted";
    }
    // updateOrder:()=>{},
    // updateProductOrder:()=>{},
    // deleteProductOrder:()=>{},
    // addProductOrder:()=>{}
  },
};
