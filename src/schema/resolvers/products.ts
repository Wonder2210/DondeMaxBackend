import {
  Product,
  ProductMaterial,
  ProductPreservation,
  ProductType,
} from "../../database/models";
import { Resolvers } from "../../__generated";
import { UserInputError } from 'apollo-server-express';
import {v2} from "cloudinary";

export const product: Resolvers = {
  Query: {
    products: async (parent, args, ctx) => {
      console.log(ctx.user,"user");
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
        .select("id", "name", "precio", "image","info");

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
      { product: { materials, name, precio, image, info, type } },
      ctx
    ) => {
      v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      
      const { createReadStream } = await image;
      const stream = createReadStream();
      let resultUrl : string = "";
      let resultSecureUrl : string = "";

       
      try {
        await new Promise((resolve, reject) => {
            const streamLoad = v2.uploader.upload_stream(function (error, result) {
                if (result) {
                    resultUrl = result.secure_url;
                    resultSecureUrl = result.secure_url;
                    resolve(resultUrl)
                } else {
                    reject(error);
                }
            });

            stream.pipe(streamLoad);
        });
    } catch(error){
      console.log(error);
      throw new UserInputError("La imagen no pude ser procesada",
          {
            invalidArgs: "None but the image doesnt work",
          }
      )
    }
     
        const product: Product = await Product.query().insert({
          name,
          precio,
          image: resultUrl,
          info,
          type
        });
        const pr_m: ProductMaterial[] = await product
          .$relatedQuery("materials")
          .insertGraph([...materials.map(i=>({quantity:i.quantity,material_id:i.materialId}))]);
  
        return product;
      
         
       
    },
    // updateProduct:(parent, { product: { materials, name, precio, image, info, type } }, ctx )=>{

    // },

    // addProductMaterial,
    // updateProductMaterial,
    // deleteProductMaterial,
  },
};
