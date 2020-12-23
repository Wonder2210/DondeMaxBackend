import {Model } from "objection";
import {Maybe} from "../../__generated";

class OrdersLog extends Model {
    static tableName ="orders_log";
    id_pedido?: number;
    user_db?: string;
    date?: string;
    client?: number;
    stage?: boolean;
    production?: boolean;
    delivered?: boolean;
    action_name?: string;

}

export default OrdersLog;