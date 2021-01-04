import { Model } from "objection";
import Product from "./product";

class RatingProduct extends Model{
    static tableName="rating_product"
    id?: number;
    product_id?: number;
    value?: number;
    times_valued?: number;
    product?: Product;

    static relationMappings = ()=>({
        product:{
            relation: Model.BelongsToOneRelation,
             modelClass: Product,
             join: {
                 from: "rating_product.product_id",
                 to: "product.id",
                 },
        }
    })
    
}

export default RatingProduct;