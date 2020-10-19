import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};


export type Product = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  precio?: Maybe<Scalars['Float']>;
  image?: Maybe<Scalars['String']>;
};

export type IUser = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type User = IUser & {
   __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type Client = {
   __typename?: 'Client';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  cedula?: Maybe<Scalars['String']>;
  nationality?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  creator?: Maybe<User>;
  orders?: Maybe<Array<Maybe<Orders>>>;
};

export enum PayMethod {
  Efectivo = 'EFECTIVO',
  Debito = 'DEBITO',
  Transferencia = 'TRANSFERENCIA',
  Dolares = 'DOLARES',
  Pesos = 'PESOS'
}

export type OrderProducts = {
   __typename?: 'OrderProducts';
  id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  product?: Maybe<Products>;
  materials?: Maybe<Array<Maybe<MaterialWaste>>>;
};

export type MaterialWaste = {
   __typename?: 'MaterialWaste';
  material_name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
};

export type OrderWaste = {
   __typename?: 'OrderWaste';
  name?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<Maybe<MaterialWaste>>>;
};

export type Orders = {
   __typename?: 'Orders';
  id?: Maybe<Scalars['Int']>;
  payMethod?: Maybe<PayMethod>;
  deliveryDate?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  deliveryStatus?: Maybe<Scalars['Boolean']>;
  productionStatus?: Maybe<Scalars['Boolean']>;
  stageStatus?: Maybe<Scalars['Boolean']>;
  abono?: Maybe<Scalars['Float']>;
  monto?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  creator?: Maybe<User>;
  client?: Maybe<Client>;
  products?: Maybe<Array<Maybe<OrderProducts>>>;
};

export type MaterialsProduct = {
   __typename?: 'MaterialsProduct';
  id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Float']>;
  material?: Maybe<Material>;
};

export type Material = {
   __typename?: 'Material';
  id?: Maybe<Scalars['Int']>;
  nombre?: Maybe<Scalars['String']>;
  type?: Maybe<MaterialType>;
};

export type MaterialType = {
   __typename?: 'MaterialType';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Provider = {
   __typename?: 'Provider';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  RIF?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
};

export type ProductType = {
   __typename?: 'ProductType';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Products>>>;
};

export type PreservationType = {
   __typename?: 'PreservationType';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Products>>>;
};

export type Products = Product & {
   __typename?: 'Products';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  precio?: Maybe<Scalars['Float']>;
  image?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<Maybe<MaterialsProduct>>>;
  info?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  preservation?: Maybe<Scalars['String']>;
};

export type Store = {
   __typename?: 'Store';
  id?: Maybe<Scalars['Int']>;
  material?: Maybe<Material>;
  provider?: Maybe<Provider>;
  uniteds?: Maybe<Scalars['Int']>;
  expiration_date?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type UserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type ClientInput = {
  name: Scalars['String'];
  cedula: Scalars['String'];
  nationality: Scalars['String'];
  phone: Scalars['String'];
  creator: Scalars['Int'];
};

export type UpdateClientInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  cedula?: Maybe<Scalars['String']>;
  nationality?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type MaterialInput = {
  nombre: Scalars['String'];
  typeId: Scalars['Int'];
};

export type ProviderInput = {
  name: Scalars['String'];
  RIF: Scalars['String'];
  phone: Scalars['String'];
  direction: Scalars['String'];
};

export type UpdateProviderInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  RIF?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
};

export type StoreInput = {
  materialsId: Scalars['Int'];
  providerId: Scalars['Int'];
  uniteds: Scalars['Int'];
  expirationDate: Scalars['String'];
  brand: Scalars['String'];
  weight: Scalars['Float'];
};

export type UpdateStoreInput = {
  id: Scalars['Int'];
  materialsId?: Maybe<Scalars['Int']>;
  providerId?: Maybe<Scalars['Int']>;
  uniteds?: Maybe<Scalars['Int']>;
  expiration_date?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type MaterialProductInput = {
  materialId: Scalars['Int'];
  quantity: Scalars['Float'];
};

export type ProductsInput = {
  name: Scalars['String'];
  precio: Scalars['Float'];
  image: Scalars['Upload'];
  materials: Array<MaterialProductInput>;
};

export type UpdateProductsInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  precio?: Maybe<Scalars['Float']>;
  image?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<MaterialProductInput>>;
};

export type ProductOrderInput = {
  id: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type OrderInput = {
  id?: Maybe<Scalars['Int']>;
  payMethod?: Maybe<PayMethod>;
  deliveryDate?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  deliveryStatus?: Maybe<Scalars['Boolean']>;
  productionStatus?: Maybe<Scalars['Boolean']>;
  stage_status?: Maybe<Scalars['Boolean']>;
  abono?: Maybe<Scalars['Float']>;
  monto?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  client: Scalars['Int'];
  orderProducts?: Maybe<Array<Maybe<ProductOrderInput>>>;
};

export type TakeOrderInput = {
  payMethod: PayMethod;
  deliveryDate: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  deliveryStatus: Scalars['Boolean'];
  productionStatus: Scalars['Boolean'];
  stageStatus: Scalars['Boolean'];
  abono: Scalars['Float'];
  monto: Scalars['Float'];
  total: Scalars['Float'];
  client: Scalars['Int'];
  orderProducts: Array<ProductOrderInput>;
};

export type GetProducts = {
   __typename?: 'GetProducts';
  results?: Maybe<Array<Maybe<Products>>>;
  total?: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  loginUser?: Maybe<User>;
  client?: Maybe<Client>;
  clients?: Maybe<Array<Maybe<Client>>>;
  materialTypes?: Maybe<Array<Maybe<MaterialType>>>;
  materials?: Maybe<Array<Maybe<Material>>>;
  provider?: Maybe<Provider>;
  providers?: Maybe<Array<Maybe<Provider>>>;
  store?: Maybe<Store>;
  storage?: Maybe<Array<Maybe<Store>>>;
  products?: Maybe<GetProducts>;
  productTypes?: Maybe<Array<Maybe<ProductType>>>;
  productPreservation?: Maybe<Array<Maybe<PreservationType>>>;
  product?: Maybe<Products>;
  order?: Maybe<Orders>;
  orders?: Maybe<Array<Maybe<Orders>>>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryClientArgs = {
  id: Scalars['Int'];
};


export type QueryProviderArgs = {
  id: Scalars['Int'];
};


export type QueryStoreArgs = {
  id: Scalars['Int'];
};


export type QueryProductsArgs = {
  size: Scalars['Int'];
  cursor: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
  preservation?: Maybe<Scalars['String']>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryOrderArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createUser?: Maybe<User>;
  editUser?: Maybe<User>;
  deleteUser?: Maybe<Scalars['String']>;
  createClient?: Maybe<Client>;
  editClient?: Maybe<Client>;
  deleteClient?: Maybe<Scalars['String']>;
  createMaterial?: Maybe<Material>;
  createMaterialType?: Maybe<MaterialType>;
  createProvider?: Maybe<Provider>;
  updateProvider?: Maybe<Provider>;
  addToStore?: Maybe<Store>;
  updateStore?: Maybe<Store>;
  deleteStored?: Maybe<Scalars['String']>;
  createProduct?: Maybe<Products>;
  updateProduct?: Maybe<Products>;
  takeOrder?: Maybe<Orders>;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationEditUserArgs = {
  user: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationCreateClientArgs = {
  client: ClientInput;
};


export type MutationEditClientArgs = {
  client: UpdateClientInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int'];
};


export type MutationCreateMaterialArgs = {
  material: MaterialInput;
};


export type MutationCreateMaterialTypeArgs = {
  name: Scalars['String'];
};


export type MutationCreateProviderArgs = {
  provider: ProviderInput;
};


export type MutationUpdateProviderArgs = {
  provider: UpdateProviderInput;
};


export type MutationAddToStoreArgs = {
  store: StoreInput;
};


export type MutationUpdateStoreArgs = {
  store: UpdateStoreInput;
};


export type MutationDeleteStoredArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProductArgs = {
  product: ProductsInput;
};


export type MutationUpdateProductArgs = {
  product: UpdateProductsInput;
};


export type MutationTakeOrderArgs = {
  order: TakeOrderInput;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  product: ResolversTypes['Products'],
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  IUser: ResolversTypes['User'],
  User: ResolverTypeWrapper<User>,
  Client: ResolverTypeWrapper<Client>,
  PayMethod: PayMethod,
  OrderProducts: ResolverTypeWrapper<OrderProducts>,
  MaterialWaste: ResolverTypeWrapper<MaterialWaste>,
  OrderWaste: ResolverTypeWrapper<OrderWaste>,
  Orders: ResolverTypeWrapper<Orders>,
  MaterialsProduct: ResolverTypeWrapper<MaterialsProduct>,
  Material: ResolverTypeWrapper<Material>,
  MaterialType: ResolverTypeWrapper<MaterialType>,
  Provider: ResolverTypeWrapper<Provider>,
  ProductType: ResolverTypeWrapper<ProductType>,
  PreservationType: ResolverTypeWrapper<PreservationType>,
  Products: ResolverTypeWrapper<Products>,
  Store: ResolverTypeWrapper<Store>,
  UserInput: UserInput,
  UpdateUserInput: UpdateUserInput,
  ClientInput: ClientInput,
  UpdateClientInput: UpdateClientInput,
  MaterialInput: MaterialInput,
  ProviderInput: ProviderInput,
  UpdateProviderInput: UpdateProviderInput,
  StoreInput: StoreInput,
  UpdateStoreInput: UpdateStoreInput,
  MaterialProductInput: MaterialProductInput,
  ProductsInput: ProductsInput,
  UpdateProductsInput: UpdateProductsInput,
  ProductOrderInput: ProductOrderInput,
  OrderInput: OrderInput,
  TakeOrderInput: TakeOrderInput,
  GetProducts: ResolverTypeWrapper<GetProducts>,
  Query: ResolverTypeWrapper<{}>,
  Mutation: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Upload: Scalars['Upload'],
  product: ResolversParentTypes['Products'],
  Int: Scalars['Int'],
  Float: Scalars['Float'],
  IUser: ResolversParentTypes['User'],
  User: User,
  Client: Client,
  PayMethod: PayMethod,
  OrderProducts: OrderProducts,
  MaterialWaste: MaterialWaste,
  OrderWaste: OrderWaste,
  Orders: Orders,
  MaterialsProduct: MaterialsProduct,
  Material: Material,
  MaterialType: MaterialType,
  Provider: Provider,
  ProductType: ProductType,
  PreservationType: PreservationType,
  Products: Products,
  Store: Store,
  UserInput: UserInput,
  UpdateUserInput: UpdateUserInput,
  ClientInput: ClientInput,
  UpdateClientInput: UpdateClientInput,
  MaterialInput: MaterialInput,
  ProviderInput: ProviderInput,
  UpdateProviderInput: UpdateProviderInput,
  StoreInput: StoreInput,
  UpdateStoreInput: UpdateStoreInput,
  MaterialProductInput: MaterialProductInput,
  ProductsInput: ProductsInput,
  UpdateProductsInput: UpdateProductsInput,
  ProductOrderInput: ProductOrderInput,
  OrderInput: OrderInput,
  TakeOrderInput: TakeOrderInput,
  GetProducts: GetProducts,
  Query: {},
  Mutation: {},
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['product'] = ResolversParentTypes['product']> = {
  __resolveType: TypeResolveFn<'Products', ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  precio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type IUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IUser'] = ResolversParentTypes['IUser']> = {
  __resolveType: TypeResolveFn<'User', ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cedula?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nationality?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Orders']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrderProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderProducts'] = ResolversParentTypes['OrderProducts']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  product?: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType>,
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaterialWaste']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialWasteResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaterialWaste'] = ResolversParentTypes['MaterialWaste']> = {
  material_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrderWasteResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderWaste'] = ResolversParentTypes['OrderWaste']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaterialWaste']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrdersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Orders'] = ResolversParentTypes['Orders']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  payMethod?: Resolver<Maybe<ResolversTypes['PayMethod']>, ParentType, ContextType>,
  deliveryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  deliveryStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  productionStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  stageStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  abono?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  monto?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType>,
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrderProducts']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialsProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaterialsProduct'] = ResolversParentTypes['MaterialsProduct']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  material?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialResolvers<ContextType = any, ParentType extends ResolversParentTypes['Material'] = ResolversParentTypes['Material']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  nombre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['MaterialType']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaterialType'] = ResolversParentTypes['MaterialType']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProviderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Provider'] = ResolversParentTypes['Provider']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  RIF?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  direction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProductTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductType'] = ResolversParentTypes['ProductType']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Products']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PreservationTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreservationType'] = ResolversParentTypes['PreservationType']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Products']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Products'] = ResolversParentTypes['Products']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  precio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaterialsProduct']>>>, ParentType, ContextType>,
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  preservation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  material?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType>,
  provider?: Resolver<Maybe<ResolversTypes['Provider']>, ParentType, ContextType>,
  uniteds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  expiration_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GetProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetProducts'] = ResolversParentTypes['GetProducts']> = {
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Products']>>>, ParentType, ContextType>,
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  loginUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryLoginUserArgs, 'email' | 'password'>>,
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<QueryClientArgs, 'id'>>,
  clients?: Resolver<Maybe<Array<Maybe<ResolversTypes['Client']>>>, ParentType, ContextType>,
  materialTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaterialType']>>>, ParentType, ContextType>,
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['Material']>>>, ParentType, ContextType>,
  provider?: Resolver<Maybe<ResolversTypes['Provider']>, ParentType, ContextType, RequireFields<QueryProviderArgs, 'id'>>,
  providers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Provider']>>>, ParentType, ContextType>,
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QueryStoreArgs, 'id'>>,
  storage?: Resolver<Maybe<Array<Maybe<ResolversTypes['Store']>>>, ParentType, ContextType>,
  products?: Resolver<Maybe<ResolversTypes['GetProducts']>, ParentType, ContextType, RequireFields<QueryProductsArgs, 'size' | 'cursor'>>,
  productTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductType']>>>, ParentType, ContextType>,
  productPreservation?: Resolver<Maybe<Array<Maybe<ResolversTypes['PreservationType']>>>, ParentType, ContextType>,
  product?: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>,
  order?: Resolver<Maybe<ResolversTypes['Orders']>, ParentType, ContextType, RequireFields<QueryOrderArgs, 'id'>>,
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Orders']>>>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>,
  editUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationEditUserArgs, 'user'>>,
  deleteUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
  createClient?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<MutationCreateClientArgs, 'client'>>,
  editClient?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<MutationEditClientArgs, 'client'>>,
  deleteClient?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteClientArgs, 'id'>>,
  createMaterial?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<MutationCreateMaterialArgs, 'material'>>,
  createMaterialType?: Resolver<Maybe<ResolversTypes['MaterialType']>, ParentType, ContextType, RequireFields<MutationCreateMaterialTypeArgs, 'name'>>,
  createProvider?: Resolver<Maybe<ResolversTypes['Provider']>, ParentType, ContextType, RequireFields<MutationCreateProviderArgs, 'provider'>>,
  updateProvider?: Resolver<Maybe<ResolversTypes['Provider']>, ParentType, ContextType, RequireFields<MutationUpdateProviderArgs, 'provider'>>,
  addToStore?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationAddToStoreArgs, 'store'>>,
  updateStore?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationUpdateStoreArgs, 'store'>>,
  deleteStored?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteStoredArgs, 'id'>>,
  createProduct?: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'product'>>,
  updateProduct?: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'product'>>,
  takeOrder?: Resolver<Maybe<ResolversTypes['Orders']>, ParentType, ContextType, RequireFields<MutationTakeOrderArgs, 'order'>>,
};

export type Resolvers<ContextType = any> = {
  Upload?: GraphQLScalarType,
  product?: ProductResolvers,
  IUser?: IUserResolvers,
  User?: UserResolvers<ContextType>,
  Client?: ClientResolvers<ContextType>,
  OrderProducts?: OrderProductsResolvers<ContextType>,
  MaterialWaste?: MaterialWasteResolvers<ContextType>,
  OrderWaste?: OrderWasteResolvers<ContextType>,
  Orders?: OrdersResolvers<ContextType>,
  MaterialsProduct?: MaterialsProductResolvers<ContextType>,
  Material?: MaterialResolvers<ContextType>,
  MaterialType?: MaterialTypeResolvers<ContextType>,
  Provider?: ProviderResolvers<ContextType>,
  ProductType?: ProductTypeResolvers<ContextType>,
  PreservationType?: PreservationTypeResolvers<ContextType>,
  Products?: ProductsResolvers<ContextType>,
  Store?: StoreResolvers<ContextType>,
  GetProducts?: GetProductsResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
