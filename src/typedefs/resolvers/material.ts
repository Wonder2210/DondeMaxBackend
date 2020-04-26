import {Material,MaterialType} from '../../models';
import {IResolvers} from '../../lib/utils';
 import {Material as IMaterial,MaterialType as IMaterialType,MaterialResolvers} from '../../generated/graphql';
 import {UserInputError} from 'apollo-server-express';
import Materials from '../../models/materials';

 interface Resolvers extends IResolvers{
     Material:MaterialResolvers
   
 }

 export const material:Resolvers  = {
     Query:{
         materialTypes:async (parent,args,ctx)=>{
           
            const types : IMaterialType[] = await MaterialType.query().select('id','type');
            return types;
         },
         materials:async (_,args,ctx)=>{
            const material : IMaterial[] = await Materials.query().select('id','nombre');
            return material;
//resolver eso de no mandar el ID del tipo 2 veces
            
         },

     },
     Material:{
        
        type:async (parent,args,ctx)=>{
               
            const data = await ctx.loaders.material_types.load(parent.id);
       
            return data[0];
        
        },

     },
     Mutation:{
         createMaterial:async (parent,args,ctx)=>{
             const material : IMaterial = await Material.query().insert({...args.material});
             return material;
         },
         createMaterialType:async (parent,args,ctx)=>{
             const {type} = args;
             let types:IMaterialType;
             try {
                 types = await MaterialType.query().insert({type});
                 
                 
             } catch (error) {
                throw new UserInputError('Email Invalido', {
                    invalidArgs: Object.keys(args),
                  });
             }
             return types;
         }
     }
 }

