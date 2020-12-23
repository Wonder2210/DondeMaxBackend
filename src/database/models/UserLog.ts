import {Model } from "objection";

class UserLog extends Model {
    static tableName ="session_log";
    
    id_user?: number;
    username?: string;
    date?: string;
    action_name?: string;

}

export default UserLog;