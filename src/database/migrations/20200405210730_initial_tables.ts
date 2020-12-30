import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  knex.raw("  SET datestyle = dmy;");
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
    .createTable("session_log",(table: Knex.CreateTableBuilder)=>{
      table.increments("id");
      table.integer("id_user");
      table.string("username");
      table.timestamp("date").defaultTo(knex.fn.now());
      table.string("action_name");
    })
    .createTable("client", (table: Knex.CreateTableBuilder) => {
      table.increments("id");
      table.string("name");
      table.integer("cedula").unique();
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
        .nullable()
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
    .createTable("orders_log",(table:Knex.CreateTableBuilder)=>{
      table.integer("id_pedido");
      table.string("user_db").defaultTo("SYSTEM");
      table.timestamp("date").defaultTo(knex.fn.now());
      table.integer("client");
      table.boolean("delivered");
      table.boolean("stage");
      table.boolean("production");
      table.string("action_name");

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
      table.boolean("available").defaultTo(true);
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
    .createTable("products_log",(table: Knex.CreateTableBuilder)=>{
      table.string("user_db").defaultTo("SYSTEM");
      table.integer("id_product");
      table.string("action_name");
      table.timestamp("date").defaultTo(knex.fn.now());
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
      table.float("united_weight");
      table.boolean("gastada").defaultTo(false);
      table.timestamps(true, true);
    }).createTable("storage_log",(table: Knex.CreateTableBuilder)=>{
      table.integer("id_material");
      table.integer("id_provider");
      table.string("user_db").defaultTo("SYSTEM");
      table.string("action_name");
      table.timestamp("date").defaultTo(knex.fn.now());
    }).createTable("materials_stage",(table: Knex.CreateTableBuilder)=>{
      table.increments('id');
      table.integer("material_id");
      table.foreign("material_id")
        .references("material.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("name");
      table.float("weight");
    });
}

export async function down(knex: Knex): Promise<any> {
  await knex.raw(`DROP TABLE IF EXISTS "user",session_log, client, "order", orders_log, product_type, preservation_type, product, order_product, material_type, material, product_material, provider, store, storage_log, materials_stage, products_log CASCADE;`);

}
