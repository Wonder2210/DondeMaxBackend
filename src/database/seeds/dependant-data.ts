import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  let date = new Date();
  let now = `${11}-${1}-${2020}`;

  return knex("order")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("order").insert([
        {
          id: 1,
          user_id: 1,
          client_id: 1,
          pay_method: "EFECTIVO",
          delivery_date: now,
          note: "Nothing",
          delivery_status: false,
          production_status: true,
          stage_status: true,
          abono: "1000",
          monto: "5000",
          total: "6000",
        },
      ]);
    })
    .then(() => {
      return knex("product_material")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("product_material").insert([
            {
              id: 1,
              product_id: 1,
              material_id: 1,
              quantity: 0.5,
            },
            {
              id: 2,
              product_id: 2,
              material_id: 2,
              quantity: 0.5,
            },
            {
              id: 3,
              product_id: 2,
              material_id: 2,
              quantity: 0.5,
            },
          ]);
        });
    })
    .then(() => {
      return knex("order_product")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("order_product").insert([
            {
              id: 1,
              order_id: 1,
              product_id: 1,
              quantity: 1,
            },
            {
              id: 2,
              order_id: 1,
              product_id: 2,
              quantity: 1,
            },
            {
              id: 3,
              order_id: 1,
              product_id: 3,
              quantity: 1,
            },
          ]);
        });
    });
}
