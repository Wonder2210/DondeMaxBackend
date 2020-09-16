import { BatchLoadFn } from "dataloader";
import { Maybe } from "../__generated";

import {
  Material,
  MaterialType,
  Store,
  ProductMaterial,
  Order,
  Provider,
  Client,
  OrderProduct,
  User,, Product
} from "../database/models";

export const material_store: BatchLoadFn<number, Array<Material>> = async (
  ids
) => {
  const stores = await Store.query().select("id").withGraphFetched("material");

  return ids.map((id) => stores!.filter((i) => i.id === id));
};

export const materialByProduct: BatchLoadFn<
  number,
  Array<ProductMaterial>
> = async (ids) => {
  const materials = await ProductMaterial.query().withGraphFetched("material");
  return ids.map(id=> materials.filter(i=>i.material_id===id));
};

export const material_required = () => {};

export const order_products: BatchLoadFn<number, OrderProduct[]> = async (
  ids
) => {
  const items = await OrderProduct.query().withGraphFetched("product");
  return ids.map((id) => items.filter((item) => item.id === id));
};

export const order_client: BatchLoadFn<number, Order[]> = async (ids) => {
  const orders: Order[] = await Order.query().withGraphFetched("client");
  return ids.map((id) => orders.filter((i) => id === i.id));
};

// agregar los tipos que se obtienen a los modelos
export const material_types: BatchLoadFn<number, Material[]> = async (ids) => {
  const materials: Material[] = await Material.query()
    .select("id")
    .withGraphFetched({
      type: true,
    });

  return ids.map((id) => materials.filter((i) => i.id === id));
};

export const user_creator: BatchLoadFn<number, Client[]> = async (ids) => {
  const users = await Client.query().withGraphFetched("creator");

  return ids.map((id) => users.filter((user) => user.id == id));
};

export const materials: BatchLoadFn<number, Array<Material>> = (ids) => {
  return Material.query()
    .select("id", "nombre")
    .then((materials) =>
      ids.map((id) => materials.filter((material) => material.id == id))
    );
};

export const store_providers: BatchLoadFn<number, Provider[]> = async (ids) => {
  const providers: Provider[] = await Store.query()
    .select("id")
    .withGraphFetched("provider");
  return ids.map((id) => providers.filter((i) => i.id === id));
};

export const client_orders: BatchLoadFn<number, Client[]> = async (ids) => {
  const orders = await Client.query().select("id").withGraphFetched("orders");

  return ids.map((id) => orders.filter((i) => i.id === id));
};

// > [...a.filter(i=>i%2==0)].map(i=> i+2)
