import { Material, MaterialType } from "../../database/models";
import { Resolvers } from "../../__generated";
import { UserInputError } from "apollo-server-express";

export const material: Resolvers = {
  Query: {
    materialTypes: async (parent, args, ctx) => {
      const types: MaterialType[] = await MaterialType.query().select(
        "id",
        "type"
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
  },
  Material: {
    type: async (parent, args, ctx) => {
      const data = await ctx.loaders.material_types.load(parent.id);

      return data[0];
    },
  },
  Mutation: {
    createMaterial: async (parent, args, ctx) => {
      const material: Material = await Material.query().insert({
        ...args.material,
      });
      return material;
    },
    createMaterialType: async (parent, args, ctx) => {
      const { type } = args;
      let types: MaterialType;
      try {
        types = await MaterialType.query().insert({ type });
      } catch (error) {
        throw new UserInputError("Email Invalido", {
          invalidArgs: Object.keys(args),
        });
      }
      return types;
    },
  },
};
