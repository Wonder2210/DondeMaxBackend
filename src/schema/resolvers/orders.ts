import { Order, OrderProduct } from "../../database/models";
import { Resolvers, ProductOrderInput } from "../../__generated";

export const order: Resolvers = {
  Query: {
    orders: async (parent, args, ctx) => {
      const orders: Order[] = await Order.query().select(
        "id",
        "pay_method",
        "delivery_date",
        "note",
        "delivery_status",
        "production_status",
        "stage_status"
      );
      return orders;
    },
    order: async (parent, { id }, ctx) => {
      const order: Order = await Order.query()
        .findById(id)
        .select(
          "id",
          "pay_method",
          "delivery_date",
          "note",
          "delivery_status",
          "production_status",
          "stage_status"
        );
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
  },

  Mutation: {
    takeOrder: async (parent, args, ctx) => {
      const { client, order_products, ...data } = args.order!;

      const order: Order = await Order.query().insert(data);
      const products = order_products.map((item: ProductOrderInput) => ({
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
