import {Model } from "objection";
import {Maybe} from "../../__generated";

class OrdersLog extends Model {
    static tableName ="orders_log";
    id_pedido?: Maybe<number>;
    user_db?: Maybe<string>;
    date?: Maybe<string>;
    client?: Maybe<number>;
    stage?: Maybe<boolean>;
    production?: Maybe<boolean>;
    delivered?: Maybe<boolean>;
    action_name?: Maybe<string>;

}

export default OrdersLog;