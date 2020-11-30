// @ts-nocheck
import { Material, MaterialType, MaterialsStage } from "../../database/models";
import { Resolvers } from "../../__generated";
import { UserInputError } from "apollo-server-express";

export const material: Resolvers = {
  Query: {
    materialTypes: async (parent, args, ctx) => {
      const types: MaterialType[] = await MaterialType.query().select(
        "id",
        "name"
      );
      return types;
    },
    materials: async (_, args, ctx) => {
      const material: Material[] = await Material.query().select(
        "id",
        "nombre"
      );
      return material;
      //resolver eso de no mandar el ID del tipo 2 veces
    },
    materialsStage: async (parent,args,ctx)=>{
      const materials = await MaterialsStage.query();
      console.log(materials)
      return materials;
    }
  },
  Material: {
    type: async (parent, args, ctx) => {
      const data = await ctx.loaders.material_types.load(parent.id);

      return data[0]!.type;
    },
    store: async (parent,args,ctx)=>{
      const list = await ctx.loaders.materialStorage.load(parent.id);
      
      return list[0].store;
    },
    onStock: async (parent, args, ctx)=>{

      const list =await ctx.loaders.onStock.load(parent.id);
      const result = list[0].store.reduce((ac:{weight: number, uniteds: number;},current:{weight: number, uniteds: number;})=>({ uniteds:ac.uniteds + current.uniteds, 
        weight: ac.weight + (current.uniteds * current.weight)}), {uniteds:0, weight:0})
     return result;
    }
  },


  Mutation: {
    createMaterial: async (parent, args, ctx) => {
      const {material:{nombre,type}} = args;
      const material: Material = await Material.query().insert({
       nombre: nombre,
       type_id: type
      });
      return material;
    },
    updateMaterial: async (parent , args , ctx)=>{
      const {id , material} = args;
      const updateMaterial = await Material.query().patchAndFetchById(id,{nombre:material.nombre, type_id:material.type})
      return updateMaterial;
    },
    deleteMaterial:async (parent,args, ctx)=>{
      const deleted = await Material.query().deleteById(args.id);
      return deleted ? true : false ;
    },
    createMaterialType: async (parent, args, ctx) => {
      const { name } = args;
      let types: MaterialType;
      try {
        types = await MaterialType.query().insert({ name });
      } catch (error) {
        throw new UserInputError("Email Invalido", {
          invalidArgs: Object.keys(args),
        });
      }
      return types;
    },
    updateMaterialStage: async (parent,{id,uniteds,weight},ctx)=>{
      const update = await MaterialsStage.query().where("material_id",id).first();
      const results = await update.$query().patchAndFetch({uniteds,weight});

      return results;
    },
    updateMateriaStageW: async (parent,args,ctx)=>{
      const update = await MaterialsStage.query().findById(args.materials[0].id).patch();
      return update;
    }
  },
};
