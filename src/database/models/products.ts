import { Model } from 'objection';
import {Maybe} from '../../generated/graphql';
import Material from './materials';

class Product extends Model {
    static tableName = "products";
    name?:Maybe<string>;
    precio?:Maybe<number>;
    image?:Maybe<string>;
    
      static getRelationsMapping(){
        return {
            materials:{
                relation:Model.ManyToManyRelation,
                modelClass : Material,
                join : {
                    from : 'products.id',
                    through:{
                        from : 'products_materials.product_id',
                        to : 'products_materials.material_id',
                    },
                    to:'materials.id'
                }

            }
        }
      }
}

export default Product;