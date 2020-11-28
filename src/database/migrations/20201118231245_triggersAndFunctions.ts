import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.raw(`CREATE FUNCTION order_log()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$declare nm session_log;
begin
SELECT "id", id_user, username, date, action_name
	FROM session_log ORDER BY id DESC LIMIT 1 INTO nm;
	INSERT INTO orders_log(id_pedido,user_db,client,delivered,stage,production,action_name) values(NEW.id,nm.username,NEW.client_id,NEW.delivery_status,NEW.stage_status,NEW.production_status,TG_ARGV[0]);
	
	RETURN NEW;
end;$BODY$;



CREATE FUNCTION products_log()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$declare nm session_log;
begin
SELECT "id", id_user, username, date, action_name
	FROM session_log ORDER BY id DESC LIMIT 1 into nm;
	INSERT INTO products_log(user_db,id_product,action_name) values(nm.username,NEW.id,TG_ARGV[0]);
	RETURN NEW;
	
end;$BODY$;


CREATE FUNCTION storage_log()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$declare nm session_log;
begin
SELECT "id", id_user, username, date, action_name
	FROM session_log ORDER BY id DESC LIMIT 1 INTO nm;
	INSERT INTO storage_log(id_material,id_provider,user_db,action_name) values(NEW.material_id,NEW.provider_id,nm.username,TG_ARGV[0]);
	RETURN NEW;
	
end;$BODY$;


-- DROP TRIGGER on_insert ON store;

create trigger on_insert before
insert
    on
    store for each row execute function storage_log('insert');

-- DROP TRIGGER on_update ON store;
create trigger on_update before
update
    on
    store for each row execute function storage_log('update');

-- DROP TRIGGER on_delete ON store;
create trigger on_delete before
delete
    on
    store for each row execute function storage_log('delete');

-- DROP TRIGGER on_insert ON product;

create trigger on_insert before
insert
    on
    product for each row execute function products_log('insert');

-- DROP TRIGGER on_update ON product;

create trigger on_update before
update
    on
    product for each row execute function products_log('update');

-- DROP TRIGGER on_delete ON product;

create trigger on_delete before
delete
    on
    product for each row execute function products_log('delete');

-- DROP TRIGGER on_insert ON "order";

create trigger on_insert before
insert
    on
    "order" for each row execute function order_log('insert');

-- DROP TRIGGER on_update ON "order";

create trigger on_update before
update
    on
    "order" for each row execute function order_log('update');
    


CREATE FUNCTION create_material_storage()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$begin
	INSERT into materials_stage(material_id,name,weight)
    VALUES(NEW.id,NEW.nombre,0);
    RETURN NEW;
end;$BODY$;

CREATE TRIGGER create_material_stage
    AFTER INSERT
    ON material
    FOR EACH ROW
    EXECUTE PROCEDURE create_material_storage();

    CREATE FUNCTION update_materials_stage()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$declare mat materials_stage;
begin
	select * from materials_stage where materials_stage.material_id=new.material_id into mat;
	UPDATE materials_stage
	SET   weight= mat.weight + NEW.weight
	WHERE material_id=NEW.material_id;
	return NEW;
end;$BODY$;



CREATE TRIGGER upd_materials_stage
    AFTER INSERT
    ON store
    FOR EACH ROW
    EXECUTE PROCEDURE update_materials_stage();
    `)
}


export async function down(knex: Knex): Promise<any> {
}

