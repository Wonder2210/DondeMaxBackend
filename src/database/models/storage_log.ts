import {Model } from "objection";
import {Maybe} from "../../__generated";

class StorageLog extends Model {
    static tableName ="storage_log";
    id_material?: Maybe<number>;
    id_provider?: Maybe<number>;
    user_db?: Maybe<string>;
    action_name?: Maybe<string>;
    date?: Maybe<string>;

}

export default StorageLog;