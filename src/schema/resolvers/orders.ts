import {Order,OrderProduct} from '../../models';
import {Orders as IOrders,OrdersResolvers,Order_ProductsResolvers,MaterialsProductResolvers,ProductOrderInput,Order_Products, MaterialsProduct} from '../../generated/graphql';
import {IResolvers} from '../../lib/utils';

interface Resolvers extends IResolvers{
    orders:OrdersResolvers;
    order_products:Order_ProductsResolvers;
    MaterialsProduct:MaterialsProductResolvers;
}

export const order :Resolvers ={
    Query:{
        orders:async (parent,args,ctx)=>{
            const orders : IOrders[] = await Order.query()
                                            .select('id',
                                            'pay_method','delivery_date',
                                            'note','delivery_status',
                                            'production_status','stage_status');
            return orders;
        },
        order:async (parent,{id},ctx)=>{
            const order : IOrders = await Order.query()
                                            .findById(id)
                                            .select('id',
                                            'pay_method','delivery_date',
                                            'note','delivery_status',
                                            'production_status','stage_status');
            return order;
           
        }
    },
    orders:{
        client:async (parent,args,ctx)=>{
          
            return await ctx.loaders.clientOrder.load(parent.id);
        },
        order_products:async (parent,args,ctx)=>{
      
            return await ctx.loaders.orderProducts.load(parent.id);
        }
    },
    order_products:{
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
   
            const order : IOrders = await Order.query()
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