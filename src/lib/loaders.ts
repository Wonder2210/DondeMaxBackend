import DataLoader, { BatchLoadFn } from "dataloader";

import {
  Material,
  Store,
  ProductMaterial,
  Order,
  Provider,
  Client,
  OrderProduct,
} from "../database/models";
const material_store: BatchLoadFn<number, Array<Material>> = async (ids) => {
  const stores = await Store.query().select("id").withGraphFetched("material");

  return ids.map((id) => stores!.filter((i) => i.id === id));
};


const materialByProduct: BatchLoadFn<number, Array<ProductMaterial>> = async (
  ids
) => {
  const materials = await ProductMaterial.query().withGraphFetched("material");

  return ids.map((id) => materials.filter((i) => i.product_id === id));
};


const materials_products: BatchLoadFn<number, Array<ProductMaterial>> = async (
  ids
) => {
  const materials = await ProductMaterial.query().withGraphFetched("material");
  
  
  return ids.map((id) => materials.filter((i) => i.material_id === id));
};


const order_creator: BatchLoadFn<number, Order[]> = async (ids) => {
  const creator = await Order.query().select("id").withGraphFetched("creator");
  return ids.map((id) => creator.filter((i) => i.id === id));
};
const order_products: BatchLoadFn<number, OrderProduct[]> = async (ids) => {
  const items = await OrderProduct.query().withGraphFetched("product");
  return ids.map((id) => items.filter((item) => item.order_id === id));
};
const order_client: BatchLoadFn<number, Order[]> = async (ids) => {
  const orders: Order[] = await Order.query().withGraphFetched("client");
  return ids.map((id) => orders.filter((i) => id === i.id));
};

// agregar los tipos que se obtienen a los modelo
const material_types: BatchLoadFn<number, Material[]> = async (ids) => {
  const materials: Material[] = await Material.query()
    .select("id")
    .withGraphFetched({
      type: true,
    });

  return ids.map((id) => materials.filter((i) => i.id === id));
};
const materialStorage: BatchLoadFn<number, Material[]> = async (ids) => {
  const materials: Material[] = await Material.query()
    .select("id")
    .withGraphFetched("store");

  return ids.map((id) => materials.filter((i) => i.id === id));
};
const user_creator: BatchLoadFn<number, Client[]> = async (ids) => {
  const users = await Client.query().withGraphFetched("creator");

  return ids.map((id) => users.filter((user) => user.id == id));
};
const materials: BatchLoadFn<number, Array<Material>> = (ids) => {
  return Material.query()
    .select("id", "nombre")
    .then((materials) =>
      ids.map((id) => materials.filter((material) => material.id == id))
    );
};
const store_providers: BatchLoadFn<number, Provider[]> = async (ids) => {
  const providers: Provider[] = await Store.query()
    .select("id")
    .withGraphFetched("provider");
  return ids.map((id) => providers.filter((i) => i.id === id));
};
const client_orders: BatchLoadFn<number, Client[]> = async (ids) => {
  const orders = await Client.query().select("id").withGraphFetched("orders");

  return ids.map((id) => orders.filter((i) => i.id === id));
};
const order_waste: BatchLoadFn<number, OrderProduct[]> = async (ids) => {
  const products = await OrderProduct.query().withGraphFetched("product");
  return ids.map((id) => products.filter((i) => i.order_id === id));
};

const onStockMaterial : BatchLoadFn<number ,Material[]> = async(ids)=>{
  const materials  = await Material.query().select("id").withGraphFetched("store");

  return ids.map(id=> materials.filter(i=> i.id === id));

}

export default () => ({
  material_types: new DataLoader(material_types),
  material_store: new DataLoader(material_store),
  materialByProduct: new DataLoader(materialByProduct),
  order_client: new DataLoader(order_client),
  user_creator: new DataLoader(user_creator),
  orderProducts: new DataLoader(order_products),
  clientOrders: new DataLoader(client_orders),
  materials: new DataLoader(materials),
  store_providers: new DataLoader(store_providers),
  order_creator: new DataLoader(order_creator),
  order_waste: new DataLoader(order_waste),
  materials_products: new DataLoader(materials_products),
  onStock : new DataLoader(onStockMaterial),
  materialStorage: new DataLoader(materialStorage)
});
