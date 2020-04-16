import { Model } from 'objection';
import Material from './materials';

class Product extends Model {
    static get tableName() {
        return "products";
      }

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