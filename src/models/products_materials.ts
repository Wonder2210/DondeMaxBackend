import { Model } from 'objection';
import Product from './products';
import Material from './materials';

class ProductMaterial extends Model {
    static tableName = "products_materials";
    static getRelationsMapping(){
        return {
            product : {
                relation: Model.BelongsToOneRelation,
                modelClass:Product,
                join:{
                    from : 'products_materials.id',
                    to:"products.id"
                }
            },
            material:{
                relation: Model.BelongsToOneRelation,
                modelClass:Material,
                join:{
                    from : 'products_materials.id',
                    to:"materials.id"
                }
            }
        }
    }
}

export default ProductMaterial;