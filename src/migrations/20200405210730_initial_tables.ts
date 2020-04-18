import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('users',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.string('name');
        table.string('email').unique();
        table.string('password');
        table.string("phone",12);
        table.timestamps(true,true);

    })
    .createTable('client',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.string('client_name');
        table.integer('cedula');
        table.string('client_phone');
        table.timestamps(true,true);
        //renombrar los campos TIPO DE NACIONALIDAD Y EL USUARIO QUE LO CREO 

    })
    .createTable('orders',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.integer('user_id').unsigned().references('users.id');
       table.integer('client_id').unsigned();
       table.foreign('client_id').references('client.id');
        table.string('pay_method').nullable();
        table.date('delivery_date');
        table.text('note');
        table.boolean('delivery_status');
        table.boolean('production_status');
        table.boolean('stage_status');
        table.float('abono');
        table.float('monto');
        table.float('total');        
        table.timestamps(true,true);

    })
    .createTable('products',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.string('name');
        table.float('precio');
        table.string('image');
        table.timestamps(true,true);

    })
    .createTable('orders_products',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.integer('order_id').unsigned();
        table.foreign('order_id').references('orders.id');
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('products.id');
        table.integer('quantity');
        table.timestamps(true,true);
        
    })
    
    
    .createTable('materials_type',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        
        table.string('type');
        table.timestamps(true,true);

    })
    .createTable('materials',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.string("nombre");
        table.integer('type_id').unsigned();
        table.foreign('type_id').references('materials_type.id');
        table.timestamps(true,true);
        
    })
    
    .createTable('products_materials',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('products.id');
        table.integer('material_id').unsigned();
        table.foreign('material_id').references('materials.id');
        table.timestamps(true,true);
     
    })
    .createTable('providers',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.string('name');
        table.string('RIF');
        table.string('phone');
        table.string('direction');
        table.timestamps(true,true);
        
    })
    .createTable('store',(table:Knex.CreateTableBuilder)=>{
        table.increments('id');
        table.integer('materials_id').unsigned();
        table.foreign('materials_id').references('materials.id');
        table.integer('provider_id').unsigned();
        table.foreign('provider_id').references('providers.id');
        table.integer('uniteds');        
        table.date('expiration_date');
        table.string("brand");
        table.integer('weight');
        table.timestamps(true,true);
    })
   
   
   
}


export async function down(knex: Knex): Promise<any> {
    return knex.destroy();
}

