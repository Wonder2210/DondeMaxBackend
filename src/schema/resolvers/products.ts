import {
  Product,
  ProductMaterial,
  ProductPreservation,
  ProductType,
} from "../../database/models";
import { Resolvers } from "../../__generated";
import { Page } from "objection";
import fs from "fs";
// const storeFS = ({ stream, filename }) => {
//   const uploadDir = "../../../uloads";
//   const path = `${uploadDir}/${filename}`;
//   return new Promise((resolve, reject) =>
//     stream
//       .on("error", (error) => {
//         if (stream.truncated)
//           // delete the truncated file
//           fs.unlinkSync(path);
//         reject(error);
//       })
//       .pipe(fs.createWriteStream(path))
//       .on("error", (error) => reject(error))
//       .on("finish", () => resolve({ path }))
//   );
// };
export const product: Resolvers = {
  Query: {
    products: async (parent, args, ctx) => {
      const { size, cursor, type, preservation } = args;
      if (preservation && type) {
        const products = await Product.query()
          .where({
            preservation: preservation,
            type: type,
          })

          .page(cursor, size);
        return {
          results: products.results,
          total: products.total,
        };
      }
      if (type) {
        const products = await Product.query()
          .where("type", type)
          .page(cursor, size);
        return {
          results: products.results,
          total: products.total,
        };
      }
      if (preservation) {
        const products = await Product.query()
          .where("preservation", preservation)
          .page(cursor, size);
        return {
          results: products.results,
          total: products.total,
        };
      } else {
        const products = await Product.query().page(cursor, size);
        return {
          results: products.results,
          total: products.total,
        };
      }
    },

    product: async (parent, { id }, ctx) => {
      const product: Product = await Product.query()
        .findById(id)
        .select("id", "name", "precio", "image");

      return product;
    },
    productPreservation: async (parent, args, ctx) => {
      const results: ProductPreservation[] = await ProductPreservation.query().withGraphFetched(
        "products"
      );
      return results;
    },
    productTypes: async (parent, args, ctx) => {
      const results: ProductType[] = await ProductType.query().withGraphFetched(
        "products"
      );
      return results;
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
    createProduct: async (
      parent,
      { product: { materials, name, precio, image } },
      ctx
    ) => {
      // const { filename } = image;
      const product: Product = await Product.query().insert({
        name,
        precio,
        image: "filename",
      });
      const pr_m: ProductMaterial[] = await product
        .$relatedQuery("materials")
        .insertGraph(materials);

      // const upload = storeFS(image);

      return product;
    },
    // deleteProduct,
    // updateProduct,

    // addProductMaterial,
    // updateProductMaterial,
    // deleteProductMaterial,
  },
};
