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
    public."order" for each row execute function order_log('update');`)
}


export async function down(knex: Knex): Promise<any> {
}

