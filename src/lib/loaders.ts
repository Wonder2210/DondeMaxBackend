import DataLoader, { BatchLoadFn } from "dataloader";

import {
  Material,
  Store,
  Customer,
  ProductMaterial,
  Order,
  RatingProduct,
  OrderProduct,
  User
} from "../database/models";


const material_store: BatchLoadFn<number, Array<Store>> = async (ids) => {
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

const userOrders: BatchLoadFn<number, Array<User>> = async (ids)=>{
  const users : User[] = await User.query().withGraphFetched("ordersRaw");
  return ids.map(id=> users.filter(user=> user.id==id));
}
const customerOrders: BatchLoadFn<number, Array<Customer>> = async (ids)=>{
  const customers : Customer[] = await Customer.query().withGraphFetched("ordersRaw");
  return ids.map(id=> customers.filter(customer=> customer.id==id));
}

const order_customer: BatchLoadFn<number, Order[]> = async (ids) => {
  const creator = await Order.query().select("id").withGraphFetched("customer");
  return ids.map((id) => creator.filter((i) => i.id === id));
};

const order_products: BatchLoadFn<number, OrderProduct[]> = async (ids) => {
  const items = await OrderProduct.query().withGraphFetched("product");
  return ids.map((id) => items.filter((item) => item.order_id === id));
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

const materials: BatchLoadFn<number, Array<Material>> = (ids) => {
  return Material.query()
    .select("id", "nombre")
    .then((materials) =>
      ids.map((id) => materials.filter((material) => material.id == id))
    );
};
const store_providers: BatchLoadFn<number, Store[]> = async (ids) => {
  const providers: Store[] = await Store.query()
    .select("id")
    .withGraphFetched("provider");
  return ids.map((id) => providers.filter((i) => i.id === id));
};

const order_waste: BatchLoadFn<number, OrderProduct[]> = async (ids) => {
  const products = await OrderProduct.query().withGraphFetched("product");
  return ids.map((id) => products.filter((i) => i.order_id === id));
};

const onStockMaterial : BatchLoadFn<number ,Material[]> = async(ids)=>{
  const materials  = await Material.query().select("id").withGraphFetched("store");

  return ids.map(id=> materials.filter(i=> i.id === id));

}

const productRate: BatchLoadFn<number, RatingProduct[]> = async (ids)=>{
  const rates = await RatingProduct.query();

  return ids.map(id=> rates.filter(rate=> rate.product_id===id))
}

export default () => ({

  material_types: new DataLoader(material_types),
  material_store: new DataLoader(material_store),
  materialByProduct: new DataLoader(materialByProduct),
  orderProducts: new DataLoader(order_products),
  materials: new DataLoader(materials),
  store_providers: new DataLoader(store_providers),
  order_customer: new DataLoader(order_customer),
  order_waste: new DataLoader(order_waste),
  materials_products: new DataLoader(materials_products),
  onStock : new DataLoader(onStockMaterial),
  materialStorage: new DataLoader(materialStorage),
  productRate: new DataLoader(productRate),
  userOrders: new DataLoader(userOrders),
  customerOrders: new DataLoader(customerOrders),
});
