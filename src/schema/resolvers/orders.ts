import { Order, OrderProduct, ProductMaterial } from "../../database/models";
import { Resolvers, ProductOrderInput } from "../../__generated";

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
      const materials = await ctx.loaders.materials_products.load(parent.id);
      const materials_filtered = materials.map((i: ProductMaterial) => {
        let quantity = i!.quantity!;
        let parent_quantity = parent!.quantity!;
        return {
          material_name: i!.material!.nombre,
          quantity: quantity * parent_quantity,
        };
      });
      return materials_filtered;
    },
  },

  Mutation: {
    takeOrder: async (parent, args, ctx) => {
      const { client, orderProducts, ...data } = args.order!;

      const order: Order = await Order.query().insert(data);
      const products = orderProducts.map((item: ProductOrderInput) => ({
        product_id: item?.id,
        order_id: order.id,
        quantity: item?.quantity,
      }));

      const products_order = await OrderProduct.query().insertGraph(products);
      return order;
    },
    // updateOrder:()=>{},
    // updateProductOrder:()=>{},
    // deleteProductOrder:()=>{},
    // addProductOrder:()=>{}
  },
};
