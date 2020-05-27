import {Product,ProductMaterial} from '../../models';
import {Products as IProducts,MaterialsProductResolvers,ProductsResolvers} from '../../generated/graphql';
import {IResolvers} from '../../lib/utils';

interface Resolvers extends IResolvers{
    Products:ProductsResolvers,
    MaterialsProduct:MaterialsProductResolvers
}

export const product : Resolvers ={
    Query:{
        products:async (parent,args,ctx)=>{
            const products : IProducts[] = await Product.query().select('id','precio','name','image');
            return products;
        },
        product:async (parent,{id},ctx)=>{
            const product : IProducts = await Product.query().findById(id).select('id','name','precio','image');
         
            return product;
        }
    },
    Products:{
        materials:async (parent,args,ctx)=>{
            const materialsProducts = await ctx.loaders
                                            .productMaterial
                                            .load(parent.id);
            return materialsProducts;
        }
    },
    MaterialsProduct:{
        material:async (parent,args,ctx)=>{
            const material = await ctx.loaders.materialByProduct.load(parent.id);
            return material;
        }
    },
    Mutation:{
        createProduct:async (parent,{product:{materials,...data}},ctx)=>{
            const product:IProducts= await Product.query().insert(data);
            const ArrayMaterials = (materials?? []).map(item=>({material_id:item.id,product_id:product.id,quantity:item.quantity}));
            const product_material = await ProductMaterial
                                            .query()
                                            .allowGraph(['material_id','product_id','quantity'])
                                            .insertGraph(ArrayMaterials);
             return product;

        },
        // deleteProduct,
        // updateProduct,

        // addProductMaterial,
        // updateProductMaterial,
        // deleteProductMaterial,

    }
}