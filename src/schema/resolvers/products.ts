import { Product, ProductMaterial } from "../../database/models";
import { Resolvers } from "../../__generated";

export const product: Resolvers = {
  Query: {
    products: async (parent, args, ctx) => {
      const products: Product[] = await Product.query().select(
        "id",
        "precio",
        "name",
        "image"
      );
      return products;
    },
    product: async (parent, { id }, ctx) => {
      const product: Product = await Product.query()
        .findById(id)
        .select("id", "name", "precio", "image");

      return product;
    },
  },
  Products: {
    materials: async (parent, args, ctx) => {
      const materialsProducts = await ctx.loaders.materialByProduct.load(
        parent.id
      );
      return materialsProducts;
    },
  },

  Mutation: {
    createProduct: async (parent, { product: { materials, ...data } }, ctx) => {
      const product: Product = await Product.query().insert(data);
      const ArrayMaterials = (materials ?? []).map((item) => ({
        material_id: item.id,
        product_id: product.id,
        quantity: item.quantity,
      }));
      const product_material = await ProductMaterial.query()
        .allowGraph(["material_id", "product_id", "quantity"])
        .insertGraph(ArrayMaterials);
      return product;
    },
    // deleteProduct,
    // updateProduct,

    // addProductMaterial,
    // updateProductMaterial,
    // deleteProductMaterial,
  },
};
