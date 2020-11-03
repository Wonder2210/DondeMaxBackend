import * as Knex from "knex";
import bcrypt from "bcrypt";
import casual from "casual";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  let date = new Date();
  let now = `${date.getMonth}/${date.getDay}/${date.getFullYear}`;
  return knex("user")
    .del()
    .then(async () => {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1,
          name: "Raul",
          email: "ra@gmail.com",
          password: await bcrypt.hash("1234", 10),
          phone: "0412345678",
        },
        {
          id: 2,
          name: "Jose",
          email: "jose@gmail.com",
          password: await bcrypt.hash("1234", 10),
          phone: "0412347632",
        },
        {
          id: 3,
          name: "Manuel",
          email: "manuel@gmail.com",
          password: await bcrypt.hash("1234", 10),
          phone: "041234098",
        },
      ]);
    })
    .then(() => {
      return knex("client")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("client").insert([
            {
              id: 1,
              name: "Sara",
              cedula: "21566398",
              nationality: "VE",
              user_creator: 1,
              phone: "0414567890",
            },
            {
              id: 2,
              name: "Difi",
              cedula: "14528736",
              nationality: "VE",
              user_creator: 2,
              phone: "0414567890",
            },
            {
              id: 3,
              name: "Keren",
              cedula: "25879357",
              nationality: "VE",
              user_creator: 3,
              phone: "0414567890",
            },
          ]);
        });
    })
    .then(() => {
      return knex("product_type")
        .del()
        .then(function () {
          return knex("product_type").insert([
            {
              id: 1,
              type: "Tortas",
            },
            {
              id: 2,
              type: "Porcion de torta",
            },
            {
              id: 3,
              type: "Galleta",
            },
          ]);
        });
    })
    .then(() => {
      return knex("preservation_type")
        .del()
        .then(function () {
          return knex("preservation_type").insert([
            { id: 1, type: "Refrigerado" },
            {
              id: 2,
              type: "No refrigerado",
            },
          ]);
        });
    })

    .then(() => {
      return knex("product")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("product").insert([
            {
              id: 1,
              name: "Tres leches",
              precio: "3500",
              image: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
              type: "Tortas",
              preservation: "Refrigerado",
              info:casual.description
            },
            {
              id: 2,
              name: "Milhojas",
              precio: "3000",
              image: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
              type: "Porcion de torta",
              preservation: "Refrigerado",
              info:casual.description
            },
            {
              id: 3,
              name: "alfajor",
              precio: "1000",
              image: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
              type: "Galleta",
              preservation: "No refrigerado",
              info:casual.description
            },
          ]);
        });
    })

    .then(() => {
      return knex("material_type")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("material_type").insert([
            {
              id: 1,
              name: "FRIO",
            },
            {
              id: 2,
              name: "POLVO",
            },
            {
              id: 3,
              name: "LIQUIDO",
            },
          ]);
        });
    })
    .then(() => {
      return knex("material")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("material").insert([
            {
              id: 1,
              nombre: "Harina",
              type_id: 2,
            },
            {
              id: 2,
              nombre: "Huevos",
              type_id: 3,
            },
            {
              id: 3,
              nombre: "Leche",
              type_id: 1,
            },
          ]);
        });
    })

    .then(() => {
      return knex("provider")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("provider").insert([
            {
             
              name: "VIAINCO",
              RIF: "231456-j",
              phone: "0987654321",
              direction: "Sant teresa",
            },
            {
           
              name: "Azucar los andes",
              RIF: "231456-j",
              phone: "0987654321",
              direction: "Sant teresa",
            },
            {
           
              name: "Dafilca",
              RIF: "231456-j",
              phone: "0987654321",
              direction: "Sant teresa",
            },
          ]);
        });
    })
    .then(() => {
      return knex("store")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("store").insert([
            {
              id: 1,
              material_id: 1,
              provider_id: 1,
              uniteds: 15,
              expiration_date: "17-12-2015",
              brand: "Juana",
              weight: 1,
            },
            {
              id: 2,
              material_id: 2,
              provider_id: 2,
              uniteds: 15,
              expiration_date: "17-12-2015",
              brand: "polar",
              weight: 0.5,
            },
            {
              id: 3,
              material_id: 3,
              provider_id: 3,
              uniteds: 25,
              expiration_date: "17-12-2015",
              brand: "Tachira",
              weight: 2,
            },
          ]);
        });
    });
}
