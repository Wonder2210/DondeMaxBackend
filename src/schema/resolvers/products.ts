// @ts-nocheck
import {
  Product,
  ProductMaterial,
  ProductPreservation,
  RatingProduct,
  ProductType,
} from "../../database/models";
import { Resolvers } from "../../__generated";
import { UserInputError } from 'apollo-server-express';
import {v2} from "cloudinary";

 v2.config({
    cloud_name: process.env.CLOUDINARY_NAME || "dy2f1moqn",
    api_key: process.env.CLOUDINARY_API_KEY || "214746866198149",
    api_secret: process.env.CLOUDINARY_API_SECRET || "zw84m6t-Gk4l54JRuGt9lzGMbVU",
  });

export const product: Resolvers = {
  Query: {
    searchProducts: async (parent, args, ctx) => {
     
      const { size, cursor, type, preservation } = args;
      if (preservation && type) {
        const products = await Product.query()
          .where({
            preservation: preservation,
            type: type,
            available:true
          })
          .page(cursor, size);
        return {
          results: products.results,
          total: products.total,
        };
      }
      if (type) {
        const products = await Product.query()
          .where({
            type:type,
            available:true
          })
          .page(cursor, size);
        return {
          results: products.results,
          total: products.total,
        };
      }
      if (preservation) {
        const products = await Product.query()
          .where({
            preservatio:preservation,
            available:true
          })
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
    getProducts: async (parent, args, ctx)=>{
      const products : Product[] = await Product.query();
      return products;
    },
    product: async (parent, { id }, ctx) => {
      const product: Product = await Product.query()
        .findById(id);

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
    rate: async(parent,_,ctx)=>{
      const rate = await ctx.loaders.productRate.load(parent.id);
      return rate[0];
    }
  },

  Mutation: {
    createProduct: async (
      _,
      { product: { materials, name, precio, image, info, type, rate } }
    ) => {
    
      
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

        const rate : RatingProduct = await RatingProduct.query().insert({product_id:product.id,value:rate});
  
        return product;
         
       
    },
    updateProduct:async (parent, { product }, ctx )=>{
      const {materials,id,image,...data}=product;
      let newData = data;
      
      let resultUrl : string = "";
      let resultSecureUrl : string = "";
      if(typeof image == "object"){
        const { createReadStream,filename } = await image;
        
        const stream = createReadStream();
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
      
        throw new UserInputError("La imagen no pude ser procesada",
            {
              invalidArgs: "None but the image doesnt work",
            }
        )
      }
      }
      if(resultUrl!=""){
        Object.assign(newData,{image:resultUrl});
    
      }
      const updated = await Product.query().patchAndFetchById(id,{...newData});
      if(materials.length > 0){
        const delete_older = await ProductMaterial.query().where("product_id",updated.id).delete();
        const pr_m: ProductMaterial[] = await updated
        .$relatedQuery("materials")
        .insertGraph([...materials.map(i=>({quantity:i.quantity,material_id:i.materialId}))]);
      }
      return updated;
     },
     deleteProduct: async(parent,{id},ctx)=>{
     
        const deleted = await Product.query().delete().where("id",id);
        return "Succesfull deleted";
     }

  },
};
