import {Order,OrderProduct} from '../../database/models';
import { Resolvers,ProductOrderInput} from '../../__generated';



export const order :Resolvers ={
    Query:{
        orders:async (parent,args,ctx)=>{
            const orders : Order[] = await Order.query()
                                            .select('id',
                                            'pay_method','delivery_date',
                                            'note','delivery_status',
                                            'production_status','stage_status');
            return orders;
        },
        order:async (parent,{id},ctx)=>{
            const order : Order = await Order.query()
                                            .findById(id)
                                            .select('id',
                                            'pay_method','delivery_date',
                                            'note','delivery_status',
                                            'production_status','stage_status');
            return order;
           
        }
    },
    Orders:{
        client:async (parent,args,ctx)=>{
          
            return await ctx.loaders.clientOrder.load(parent.id);
        },
        order_products:async (parent,args,ctx)=>{
      
            return await ctx.loaders.orderProducts.load(parent.id);
        }
    },
    OrderProducts:{
        materials_required:async (parent,args,ctx)=>{
        
            const materialsProducts = await ctx.loaders
            .productMaterial
            .load(parent.id);
        return materialsProducts;
        }
    },MaterialsProduct:{
        
        material:async (parent,args,ctx)=>{
           
            const material= await ctx.loaders.materials.load(parent.id);
            return material[0];
        }
    },
    
    Mutation:{
        takeOrder:async (parent,args,ctx)=>{
            const {client,order_products,...data} = args.order!;
   
            const order : Order = await Order.query()
                                            .insert(data);
            const products = order_products.map((item:ProductOrderInput)=>({
                product_id:item?.id,
                order_id:order.id,
                quantity:item?.quantity
            }))

            const products_order = await OrderProduct.query()
                                        .insertGraph(products);
            return order;
        },
        // updateOrder:()=>{},
        // updateProductOrder:()=>{},
        // deleteProductOrder:()=>{},
        // addProductOrder:()=>{}



    }
}