import * as Knex from "knex";
import bcrypt from "bcrypt";
import casual from "casual";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  let date = new Date();
  let now = `${date.getMonth}/${date.getDay}/${date.getFullYear}`;
  knex.raw("SET datestyle = dmy;");
  return knex("user")
    .del()
    .then(async () => {
      // Inserts seed entries
      return knex("user").insert([
        {
       
          name: "Raul",
          email: "ra@gmail.com",
          password: await bcrypt.hash("1234", 10),
          phone: "0412345678",
          role:"ADMINISTRADOR"
        },
        {
       
          name: "Jose",
          email: "jose@gmail.com",
          password: await bcrypt.hash("1234", 10),
          phone: "0412347632",
          role:"EMPLEADO"
        },
        {
   
          name: "Manuel",
          email: "manuel@gmail.com",
          password: await bcrypt.hash("1234", 10),
          phone: "041234098",
          role:"EMPLEADO"
        },
        {
          id: 1999,
          name: "system",
          email: "system@root.com",
          password: await bcrypt.hash("1234", 10),
          phone: "0000000000",
          role:"ADMINISTRADOR"
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
          
              name: "Sara",
              cedula: "21566398",
              nationality: "VE",
              user_creator: 1,
              phone: "0414567890",
            },
            {
          
              name: "Difi",
              cedula: "14528736",
              nationality: "VE",
              user_creator: 2,
              phone: "0414567890",
            },
            {
        
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
            {  type: "Refrigerado" },
            {
    
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
     
              name: "Tres leches",
              precio: "3500",
              image:    "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80",
              
              type: "Tortas",
              preservation: "Refrigerado",
              info:"here"
            },
            {
       
              name: "Milhojas",
              precio: "3000",
              image:  "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
              type: "Porcion de torta",
              preservation: "Refrigerado",
              info:"casual.description"
            },
            {
          
              name: "alfajor",
              precio: "1000",
              image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
              
              type: "Galleta",
              preservation: "No refrigerado",
              info:"there"
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
             
              name: "FRIO",
            },
            {
           
              name: "POLVO",
            },
            {
            
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
         
              nombre: "Harina",
              type_id: 2,
            },
            {
        
              nombre: "Huevos",
              type_id: 3,
            },
            {
     
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
          return knex("store").insert([
            {
            
              material_id: 1,
              provider_id: 1,
              uniteds: 15,
              expiration_date: "10-12-2020",
              brand: "Juana",
              weight: 15,
              united_weight:1
            },
            {
         
              material_id: 2,
              provider_id: 2,
              uniteds: 15,
              expiration_date: "10-12-2020",
              brand: "polar",
              weight: 7.5,
              united_weight:0.5
            },
            {
         
              material_id: 3,
              provider_id: 3,
              uniteds: 25,
              expiration_date: "10-12-2020",
              brand: "Tachira",
              weight: 25,
              united_weight:1,
            },
          ]);
        });
    });
}
