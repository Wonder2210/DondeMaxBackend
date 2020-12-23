import {Model } from "objection";
import {Maybe} from "../../__generated";

class ProductsLog extends Model {
    static tableName ="products_log";
    id_product?: number;
    user_db?: string;
    action_name?: string;
    date?: string;

}

export default ProductsLog;