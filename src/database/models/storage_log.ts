import {Model } from "objection";

class StorageLog extends Model {
    static tableName ="storage_log";
    id_material?: number;
    id_provider?: number;
    user_db?: string;
    action_name?: string;
    date?: string;

}

export default StorageLog;