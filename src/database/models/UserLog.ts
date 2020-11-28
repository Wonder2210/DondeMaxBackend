import {Model } from "objection";
import {Maybe} from "../../__generated";

class UserLog extends Model {
    static tableName ="session_log";
    
    id_user?: Maybe<number>;
    username?: Maybe<string>;
    date?: Maybe<string>;
    action_name?: Maybe<string>;

}

export default UserLog;