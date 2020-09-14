import * as Knex from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  let date = new Date();
  let now = `${date.getMonth}/${date.getDay}/${date.getFullYear}`;
  return knex("users")
    .del()
    .then(async () => {
      // Inserts seed entries
      return knex("users").insert([
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
      return knex("clients")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("clients").insert([
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
      return knex("products")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("products").insert([
            {
              id: 1,
              name: "Tres leches",
              precio: "3500",
              image: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
            },
            {
              id: 2,
              name: "Milhojas",
              precio: "3000",
              image: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
            },
            {
              id: 3,
              name: "alfajor",
              precio: "1000",
              image: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
            },
          ]);
        });
    })

    .then(() => {
      return knex("materials_type")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("materials_type").insert([
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
      return knex("materials")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("materials").insert([
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
      return knex("providers")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("providers").insert([
            {
              id: 1,
              name: "VIAINCO",
              RIF: "231456-j",
              phone: "0987654321",
              direction: "Sant teresa",
            },
            {
              id: 2,
              name: "Azucar los andes",
              RIF: "231456-j",
              phone: "0987654321",
              direction: "Sant teresa",
            },
            {
              id: 3,
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
              materials_id: 1,
              provider_id: 1,
              uniteds: 15,
              expiration_date: "17-12-2015",
              brand: "Juana",
              weight: 1,
            },
            {
              id: 2,
              materials_id: 2,
              provider_id: 2,
              uniteds: 15,
              expiration_date: "17-12-2015",
              brand: "polar",
              weight: 0.5,
            },
            {
              id: 3,
              materials_id: 3,
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
