import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.raw(`CREATE OR REPLACE FUNCTION public.order_log()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    VOLATILE
    COST 100
AS $BODY$begin
	INSERT INTO orders_log(id_pedido,user_db,client,delivered,stage,production,action_name) values(NEW.id,CURRENT_USER,NEW.client_id,NEW.delivery_status,NEW.stage_status,NEW.production_status,TG_ARGV[0]);
	
	RETURN NEW;
end;$BODY$;

CREATE OR REPLACE FUNCTION public.products_log()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    VOLATILE
    COST 100
AS $BODY$begin
	INSERT INTO products_log(user_db,id_product,action_name) values(CURRENT_USER,NEW.id,TG_ARGV[0]);
	RETURN NEW;
	
end;$BODY$;

CREATE OR REPLACE FUNCTION public.storage_log()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    VOLATILE
    COST 100
AS $BODY$begin
	INSERT INTO storage_log(id_material,id_provider,user_db,action_name) values(NEW.material_id,NEW.provider_id,CURRENT_USER,TG_ARGV[0]);
	RETURN NEW;
	
end;$BODY$;


-- DROP TRIGGER on_insert ON public.store;

create trigger on_insert before
insert
    on
    public.store for each row execute function storage_log('insert');

-- DROP TRIGGER on_update ON public.store;
create trigger on_update before
update
    on
    public.store for each row execute function storage_log('update');

-- DROP TRIGGER on_delete ON public.store;
create trigger on_delete before
delete
    on
    public.store for each row execute function storage_log('delete');

-- DROP TRIGGER on_insert ON public.product;

create trigger on_insert before
insert
    on
    public.product for each row execute function products_log('insert');

-- DROP TRIGGER on_update ON public.product;

create trigger on_update before
update
    on
    public.product for each row execute function products_log('update');

-- DROP TRIGGER on_delete ON public.product;

create trigger on_delete before
delete
    on
    public.product for each row execute function products_log('delete');

-- DROP TRIGGER on_insert ON public."order";

create trigger on_insert before
insert
    on
    public."order" for each row execute function order_log('insert');

-- DROP TRIGGER on_update ON public."order";

create trigger on_update before
update
    on
    public."order" for each row execute function order_log('update');
    


CREATE FUNCTION public.create_material_storage()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$begin
	INSERT into materials_stage(material_id,name,weight)
    VALUES(NEW.id,NEW.nombre,0);
    RETURN NEW;
end;$BODY$;

ALTER FUNCTION public.create_material_storage()
    OWNER TO postgres;

CREATE TRIGGER create_material_stage
    AFTER INSERT
    ON public.material
    FOR EACH ROW
    EXECUTE PROCEDURE public.create_material_storage();

    CREATE FUNCTION public.update_materials_stage()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$declare mat materials_stage;
begin
	select * from materials_stage where materials_stage.material_id=new.material_id into mat;
	UPDATE public.materials_stage
	SET   weight= mat.weight + NEW.weight
	WHERE material_id=NEW.material_id;
	return NEW;
end;$BODY$;

ALTER FUNCTION public.update_materials_stage()
    OWNER TO postgres;

CREATE TRIGGER upd_materials_stage
    AFTER INSERT
    ON public.store
    FOR EACH ROW
    EXECUTE PROCEDURE public.update_materials_stage();
    `)
}


export async function down(knex: Knex): Promise<any> {
}

