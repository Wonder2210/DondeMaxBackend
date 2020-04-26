import {BatchLoadFn} from 'dataloader';
import {Material,Store,ProductMaterial} from './../models';
//  import {MaterialType as IMaterialType} from './../generated/graphql';
 

export const material= async (ids:number[])=>{
    const store = await Store.query()
                        .select('materials.id as id','materials.nombre','store.id as store_id')
                        .join('materials','store.materials_id','materials.id')
    return ids.map(id=> store.find(item=> {
        if(item.store_id==id){
            const {store_id,...data}=item;
            return data;
        }
    }))
}

export const materialByProduct = async (ids:Array<number>)=>{
    const materials = await ProductMaterial.query()
    .select('materials.id as id','materials.nombre','products_materials.id as pm_id')
    .join('materials','products_materials.material_id','materials.id');

    return ids.map(id=> materials.find(item=> {
        if(item.pm_id==id){
            const {pm_id,...data}=item;
            return data;
        }
    }))
}

export const product_materials : BatchLoadFn<number,ProductMaterial[]> = async (ids:Array<number>)=>{
   return ProductMaterial.query()
                .select('id','quantity','product_id')
                .then(materials=>ids.map(id=> materials.filter(item=>{
               
                    if(item.product_id==id){
                        const {product_id,...data}=item;
                     
                        return data;
                    }
                })))

}

export const material_required = ()=>{}

export const providers= async (ids:number[])=>{
    const store = await Store.query()
                        .select('providers.id as id','providers.name','providers.RIF','providers.phone','providers.direction','store.id as store_id')
                        .join('materials','store.materials_id','materials.id')
    return ids.map(id=> store.find(item=> {
        if(item.store_id==id){
            const {store_id,...data}=item;
            return data;
        }
    }))
}

export const order_products = ()=>{}

export const client = ()=>{}

export const material_types =async (id:number[])=>{
    return Material.query()
                    .select('materials_type.id as id','materials_type.type as type','materials.id as material_id')
                    .join('materials_type','materials.type_id','materials_type.id')
                    .then(rows=> id.map(id=> rows.filter(row=>{
                        if(row.material_id==id){
                            const {material_id,...data}=row;
                            
                                         return data;
                                   }
                    })))
  
}
