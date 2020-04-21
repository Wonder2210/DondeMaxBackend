import {MaterialType} from './../models';
 import {MaterialType as IMaterialType} from './../generated/graphql';
 

export const material= ()=>{}

export const material_required = ()=>{}

export const providers= ()=>{}

export const order_products = ()=>{}

export const client = ()=>{}

export const material_types =async (id:number)=>{
    const types :IMaterialType[] = await MaterialType.query().select('id','type');
  
    return types.filter(item=>item.id==id);
}

export const product_materials = ()=>{}