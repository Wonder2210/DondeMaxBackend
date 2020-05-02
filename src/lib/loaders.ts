import {BatchLoadFn} from 'dataloader';
import {Material,Store,ProductMaterial,Order,Client,OrderProduct,User} from './../models';




export const material_store : BatchLoadFn<number, Array<Store>>=async (ids)=>{
    const stores : Array<Store> = await Store.query()
                .select('materials.id','materials.nombre as brand','store.id as store_id')
                .join('materials','store.materials_id','materials.id');
    return ids.map(id=> stores.filter(item=> {
        const Item : Partial<Store & {store_id?:number}>=item;
         if(Item.store_id==id){
                        const {store_id,...data}= Item;
                        return data ;
                   
                }
            }))
                
   
}

export const materialByProduct : BatchLoadFn<number,Array<ProductMaterial>> =  async (ids)=>{
    const materials = await ProductMaterial.query()
        .select('materials.id as id', 'materials.nombre', 'products_materials.id as pm_id')
        .join('materials', 'products_materials.material_id', 'materials.id');
    return ids.map(id => materials.filter(item => {
        const Item: Partial<ProductMaterial & {
            pm_id?: number;
        }> = item;
        if (Item.pm_id == id) {
            const { pm_id, ...data } = Item;
            return data;
        }
    }));

   
}

export const product_materials : BatchLoadFn<number,ProductMaterial[]> = async (ids)=>{
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

export const providers : BatchLoadFn<number, Array<Store>>= async (ids)=>{
    const store = await Store.query()
                        .select('providers.id as id','providers.name','providers.RIF','providers.phone','providers.direction','store.id as store_id')
                        .join('materials','store.materials_id','materials.id')
    return ids.map(id=> store.filter(item=> {
        const Item : Partial<Store & {store_id?:number}> = item
        if(Item.store_id==id){
            const {store_id,...data}=Item;
            return data;
        }
    }))
}

export const order_products : BatchLoadFn<number,OrderProduct[]> = (ids)=>{
    return OrderProduct.query()
            .select('products.id','products.name','products.precio','products.image','orders_products.quantity','orders_products.order_id')
            .join('products','products.id','orders_products.product_id')
            .then(items=> ids.map(id=> items.filter(item=>{
                if(item.order_id==id){
                    const {order_id,...data}=item;
                    
                                 return data;
                           }
            }
            )
            )
            )
}

export const client_order: BatchLoadFn<number,Client[]> = (ids)=>{
    return Order.query()
            .select('client.id','client.name','client.cedula','client.nationality','client.user_creator','client.phone','orders.id as order_id')
            .then(clients=>ids.map(id=>clients.filter(client=>{
                const item :Partial<{order_id?:number;} & Order> = client;
                if(item.order_id==id){
                    const {order_id,...data} = item;
                    return data;
                }
            })));
        }

// agregar los tipos que se obtienen a los modelos
export const material_types : BatchLoadFn<number,Array<Material>> = async (ids)=>{
    return Material.query()
                    .select('materials_type.id as id','materials_type.type as type','materials.id as material_id')
                    .join('materials_type','materials.type_id','materials_type.id')
                    .then(rows=> ids.map(id=> rows.filter(row=>{
                        const Row : Partial<Material & {material_id?:number}>=row;
                        if(Row.material_id==id){
                            const {material_id,...data}=Row;
                            
                                         return data;
                                   }
                    })))
  
}

export const user : BatchLoadFn<number, Array<User>>=async (ids)=>{
    const users = await User.query()
        .select('users.id', 'users.name', 'users.email', 'users.password', 'users.phone', 'clients.id as client_id')
        .leftJoin('clients','users.id', 'clients.user_creator');
    return ids.map(id => users.filter(user => {
        const User: Partial<User & {
            client_id?: number;
        }> = user;
        if (User.client_id==id) {
            const { client_id, ...data } = User;
            return data;
        }
    }));
}

export const materials: BatchLoadFn<number,Array<Material>> =(ids)=>{
    return Material.query().select('id','nombre')
            .then(materials=> ids.map(id=>materials.filter(material=>material.id==id)))
};
