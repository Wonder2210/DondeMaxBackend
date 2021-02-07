//@ts-nocheck
import { Order, OrderProduct, ProductMaterial,MaterialsStage } from "../../database/models";
import { Resolvers, ProductOrderInput } from "../../__generated";
import getUser from "../../lib/validate";
import { UserInputError } from "apollo-server-express";

export const order: Resolvers = {
  Query: {
    orders: async (parent, args, ctx) => {
      const orders: Order[] = await Order.query();
      console.log(orders);
      return orders;
    },
    order: async (parent, { id }, ctx) => {
      const order: Order = await Order.query().findById(id);
      return order;
    },
  },
  Orders: {
    
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
      
      const {payMethod, orderProducts,stageStatus,deliveryStatus,deliveryDate,productionStatus,...data} = args.order;
      const order: Order = await Order.query().insert({
        stage_status:stageStatus,
        user_id: user.id,
        pay_method:payMethod,
        delivery_date:deliveryDate,delivery_status:deliveryStatus,production_status:productionStatus,...data});
      const products = orderProducts.map((item: ProductOrderInput) => ({
        product_id: item?.id,
        order_id: order.id,
        quantity: item?.quantity,
      }));

      const products_order = await OrderProduct.query().insertGraph(products);
      return order;
    },
    takeOrderClient: async (parent, args, {auth}) => {
      const user = await getUser(auth);
      
      const {payMethod, orderProducts,stageStatus,deliveryStatus,deliveryDate,productionStatus,...data} = args.order;
      const order: Order = await Order.query().insert({
        stage_status:stageStatus,
        pay_method:payMethod,
        delivery_date:deliveryDate,delivery_status:deliveryStatus,production_status:productionStatus,...data, user_id:user.id});
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
    },
    produceOrder: async(parent,{id},ctx)=>{
      const order : Order = await Order.query().findById(id).withGraphFetched({
        products:{
          materials:true
        }});
        const materialsStage : MaterialsStage[] = await MaterialsStage.query();

        const materials = order.products?.flatMap(i=>i.materials).map(i=>({id:i?.material_id,quantity:i?.quantity}));
        
        const list = materialsStage.map((item) => {
          const same = materials.filter((i) => i.id == item.id);
          const result = same.reduce(
            (prev, actual) => {
              return {
                ...actual,
                quantity: actual.quantity + prev.quantity,
              };
            },
            { quantity: 0 },
          );
          return result;
        });
        const able = materialsStage.map(({id,material_id,weight})=>({id,material_id,weight})).map(item=>{
          const required = list?.find(i=>i.material_id==item.material_id);
          if(required?.quantity> item.weight) return false;
          return true;
        }).includes(i=>i==false);

       if(!able){
        for(let i in materialsStage){
       
          const old= list.find(item=>item.id==materialsStage[i].material_id);
          await materialsStage[i].$query().patch({weight:materialsStage[i].weight - old.quantity}).where("id",old.id);
        }
       }else{
         return new UserInputError("no se puede producir",{
           nad:"nada"
         })
       }
       const updated = await order.$query().patchAndFetch({production_status:true});

      return updated;
    }
    // updateOrder:()=>{},
    // updateProductOrder:()=>{},
    // deleteProductOrder:()=>{},
    // addProductOrder:()=>{}
  },
};
