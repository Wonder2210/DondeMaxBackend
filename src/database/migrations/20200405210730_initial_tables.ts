import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("user", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("name");
      table.string("email").unique();
      table.string("password");
      table.string("role");
      table.string("phone", 12);
      table.timestamps(true, true);
    })
    .createTable("client", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("name");
      table.integer("cedula");
      table.string("nationality");
      table.integer("user_creator").unsigned();
      table
        .foreign("user_creator")
        .references("user.id")
        .onDelete("SET NULL")
        .onUpdate("CASCADE");
      table.string("phone");
      table.timestamps(true, true);
    })
    .createTable("order", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("client_id").unsigned();
      table
        .foreign("client_id")
        .references("client.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("pay_method").nullable();
      table.date("delivery_date");
      table.text("note");
      table.boolean("delivery_status");
      table.boolean("production_status");
      table.boolean("stage_status");
      table.float("abono");
      table.float("monto");
      table.float("total");
      table.timestamps(true, true);
    })
    .createTable("product_type", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("type").unique();
    })
    .createTable("preservation_type", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("type").unique();
    })
    .createTable("product", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("name");
      table.float("precio");
      table.string("image");
      table.string("info");
      table.string("type").unsigned();
      table
        .foreign("type")
        .references("product_type.type")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("preservation");
      table
        .foreign("preservation")
        .references("preservation_type.type")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("order_product", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.integer("order_id").unsigned();
      table
        .foreign("order_id")
        .references("order.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("product_id").unsigned();
      table
        .foreign("product_id")
        .references("product.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("quantity");
      table.timestamps(true, true);
    })

    .createTable("material_type", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("name");
      table.timestamps(true, true);
    })
    .createTable("material", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("nombre");
      table.integer("type_id").unsigned();
      table
        .foreign("type_id")
        .references("material_type.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps(true, true);
    })

    .createTable("product_material", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.integer("product_id");
      table.integer("material_id");
      
      table.float("quantity");
      table.timestamps(true, true);
      table
      .foreign("product_id")
      .references("product.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
      table
        .foreign("material_id")
        .references("material.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
     
      
    })
    .createTable("provider", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("name");
      table.string("RIF");
      table.string("phone");
      table.string("direction");
      table.timestamps(true, true);
    })

    .createTable("store", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.integer("material_id").unsigned();
      table
        .foreign("material_id")
        .references("material.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("provider_id").unsigned();
      table
        .foreign("provider_id")
        .references("provider.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("uniteds");
      table.date("expiration_date");
      table.string("brand");
      table.float("weight");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.destroy();
}
