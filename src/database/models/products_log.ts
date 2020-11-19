import {Model } from "objection";
import {Maybe} from "../../__generated";

class ProductsLog extends Model {
    static tableName ="products_log";
    id_product?: Maybe<number>;
    user_db?: Maybe<string>;
    action_name?: Maybe<string>;
    date?: Maybe<string>;

}

export default ProductsLog;