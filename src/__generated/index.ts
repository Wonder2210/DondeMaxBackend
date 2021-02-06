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
  Date: any;
};



export enum PayMethod {
  Efectivo = 'EFECTIVO',
  Debito = 'DEBITO',
  Transferencia = 'TRANSFERENCIA',
  Dolares = 'DOLARES',
  Pesos = 'PESOS'
}

export enum UserRole {
  Empleado = 'EMPLEADO',
  Administrador = 'ADMINISTRADOR',
  Cliente = 'CLIENTE'
}

export type OrdersLog = {
   __typename?: 'OrdersLog';
  id_pedido?: Maybe<Scalars['Int']>;
  user_db?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  client?: Maybe<Scalars['Int']>;
  delivered?: Maybe<Scalars['Boolean']>;
  stage?: Maybe<Scalars['Boolean']>;
  action_name?: Maybe<Scalars['String']>;
  production?: Maybe<Scalars['Boolean']>;
};

export type ProducstLog = {
   __typename?: 'ProducstLog';
  user_db?: Maybe<Scalars['String']>;
  id_product?: Maybe<Scalars['Int']>;
  action_name?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
};

export type SessionLog = {
   __typename?: 'SessionLog';
  id_user?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  action_name?: Maybe<Scalars['String']>;
};

export type StorageLog = {
   __typename?: 'StorageLog';
  id_material?: Maybe<Scalars['Int']>;
  id_provider?: Maybe<Scalars['Int']>;
  user_db?: Maybe<Scalars['String']>;
  action_name?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
};

export type Material = {
   __typename?: 'Material';
  id?: Maybe<Scalars['Int']>;
  nombre?: Maybe<Scalars['String']>;
  type?: Maybe<MaterialType>;
  store?: Maybe<Array<Maybe<Store>>>;
  onStock?: Maybe<OnStockMaterial>;
};

export type MaterialsStage = {
   __typename?: 'MaterialsStage';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  uniteds?: Maybe<Scalars['Int']>;
};

export type MaterialInput = {
  nombre: Scalars['String'];
  type: Scalars['Int'];
};

export type MaterialProductInput = {
  materialId: Scalars['Int'];
  quantity: Scalars['Float'];
};

export type UpdateMaterialStage = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  weight: Scalars['Float'];
};

export type MaterialWaste = {
   __typename?: 'MaterialWaste';
  id?: Maybe<Scalars['Int']>;
  material_name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
};

export type MaterialsProduct = {
   __typename?: 'MaterialsProduct';
  id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Float']>;
  material?: Maybe<Material>;
};

export type OnStockMaterial = {
   __typename?: 'onStockMaterial';
  uniteds?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Float']>;
};

export type MaterialType = {
   __typename?: 'MaterialType';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type OrderWaste = {
   __typename?: 'OrderWaste';
  name?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<Maybe<MaterialWaste>>>;
};

export type OrderProducts = {
   __typename?: 'OrderProducts';
  id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  product?: Maybe<Products>;
  materials?: Maybe<Array<Maybe<MaterialWaste>>>;
};

export type Orders = {
   __typename?: 'Orders';
  id?: Maybe<Scalars['Int']>;
  pay_method?: Maybe<PayMethod>;
  delivery_date?: Maybe<Scalars['Date']>;
  note?: Maybe<Scalars['String']>;
  delivery_status?: Maybe<Scalars['Boolean']>;
  production_status?: Maybe<Scalars['Boolean']>;
  stage_status?: Maybe<Scalars['Boolean']>;
  abono?: Maybe<Scalars['Float']>;
  monto?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  creator?: Maybe<User>;
  user?: Maybe<User>;
  products?: Maybe<Array<Maybe<OrderProducts>>>;
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
  orderProducts: Array<ProductOrderInput>;
};

export type UpdateOrder = {
  delivery_status?: Maybe<Scalars['Boolean']>;
  production_status?: Maybe<Scalars['Boolean']>;
  stage_status?: Maybe<Scalars['Boolean']>;
};

export type ProductType = {
   __typename?: 'ProductType';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Products>>>;
};

export type Rate = {
   __typename?: 'Rate';
  id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
  times_valued?: Maybe<Scalars['Int']>;
};

export type PreservationType = {
   __typename?: 'PreservationType';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Products>>>;
};

export type Products = {
   __typename?: 'Products';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  precio?: Maybe<Scalars['Float']>;
  image?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<Maybe<MaterialsProduct>>>;
  info?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  rate?: Maybe<Rate>;
  preservation?: Maybe<Scalars['String']>;
  available?: Maybe<Scalars['Boolean']>;
};

export type ProductsInput = {
  name: Scalars['String'];
  precio: Scalars['Float'];
  image: Scalars['Upload'];
  info: Scalars['String'];
  type: Scalars['String'];
  available?: Maybe<Scalars['Boolean']>;
  rate?: Maybe<Scalars['Float']>;
  materials: Array<MaterialProductInput>;
};

export type UpdateProductsInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  precio?: Maybe<Scalars['Float']>;
  image?: Maybe<Scalars['Upload']>;
  type?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
  available?: Maybe<Scalars['Boolean']>;
  materials?: Maybe<Array<Maybe<MaterialProductInput>>>;
};

export type ProductOrderInput = {
  id: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type GetProducts = {
   __typename?: 'GetProducts';
  results?: Maybe<Array<Maybe<Products>>>;
  total?: Maybe<Scalars['Int']>;
};

export type Provider = {
   __typename?: 'Provider';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  RIF?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
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

export type SessionUser = {
   __typename?: 'SessionUser';
  id?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  email?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  clients?: Maybe<Array<Maybe<User>>>;
  client?: Maybe<User>;
  sessionUser: SessionUser;
  sessionLog?: Maybe<Array<Maybe<SessionLog>>>;
  materialTypes?: Maybe<Array<Maybe<MaterialType>>>;
  materialsStage?: Maybe<Array<Maybe<MaterialsStage>>>;
  materials?: Maybe<Array<Maybe<Material>>>;
  provider?: Maybe<Provider>;
  providers?: Maybe<Array<Maybe<Provider>>>;
  store?: Maybe<Store>;
  storage?: Maybe<Array<Maybe<Store>>>;
  searchProducts?: Maybe<GetProducts>;
  getProducts?: Maybe<Array<Maybe<Products>>>;
  productTypes?: Maybe<Array<Maybe<ProductType>>>;
  productPreservation?: Maybe<Array<Maybe<PreservationType>>>;
  product?: Maybe<Products>;
  order?: Maybe<Orders>;
  orders?: Maybe<Array<Maybe<Orders>>>;
  productsLog?: Maybe<Array<Maybe<ProducstLog>>>;
  storageLog?: Maybe<Array<Maybe<StorageLog>>>;
  ordersLog?: Maybe<Array<Maybe<OrdersLog>>>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
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


export type QuerySearchProductsArgs = {
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

export type Store = {
   __typename?: 'Store';
  id?: Maybe<Scalars['Int']>;
  material?: Maybe<Material>;
  provider?: Maybe<Provider>;
  uniteds?: Maybe<Scalars['Int']>;
  expiration_date?: Maybe<Scalars['Date']>;
  brand?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  united_weight?: Maybe<Scalars['Float']>;
};

export type StoreInput = {
  materialsId: Scalars['Int'];
  providerId: Scalars['Int'];
  uniteds: Scalars['Int'];
  expirationDate: Scalars['String'];
  brand: Scalars['String'];
  weight: Scalars['Float'];
  united_weight: Scalars['Float'];
};

export type UpdateStoreInput = {
  id: Scalars['Int'];
  materials_id?: Maybe<Scalars['Int']>;
  provider_id?: Maybe<Scalars['Int']>;
  uniteds?: Maybe<Scalars['Int']>;
  expiration_date?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  united_weight?: Maybe<Scalars['Float']>;
};

export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  phone?: Maybe<Scalars['String']>;
  orders?: Maybe<ClientOrders>;
};

export type ClientOrders = {
   __typename?: 'ClientOrders';
  delivered?: Maybe<Array<Maybe<Orders>>>;
  pending?: Maybe<Array<Maybe<Orders>>>;
  all?: Maybe<Array<Maybe<Orders>>>;
};

export type LoginUser = {
   __typename?: 'loginUser';
  id?: Maybe<Scalars['Int']>;
  role?: Maybe<UserRole>;
  token: Scalars['String'];
};

export type UserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phone: Scalars['String'];
  role: UserRole;
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
};

export type Mutation = {
   __typename?: 'Mutation';
  loginUser?: Maybe<LoginUser>;
  createUser?: Maybe<User>;
  editUser?: Maybe<User>;
  deleteUser?: Maybe<Scalars['String']>;
  createMaterial?: Maybe<Material>;
  deleteMaterial?: Maybe<Scalars['Boolean']>;
  updateMaterial?: Maybe<Material>;
  createMaterialType?: Maybe<MaterialType>;
  createProvider?: Maybe<Provider>;
  deleteProvider?: Maybe<Scalars['Boolean']>;
  updateProvider?: Maybe<Provider>;
  updateMaterialStage?: Maybe<MaterialsStage>;
  updateMateriaStageW?: Maybe<Scalars['Int']>;
  addToStore?: Maybe<Store>;
  updateStore?: Maybe<Store>;
  deleteStored?: Maybe<Scalars['String']>;
  updatStateOrder?: Maybe<MaterialsStage>;
  produceOrder?: Maybe<Orders>;
  createProduct?: Maybe<Products>;
  updateProduct?: Maybe<Products>;
  deleteProduct?: Maybe<Scalars['String']>;
  takeOrder?: Maybe<Orders>;
  deleteOrder?: Maybe<Scalars['String']>;
  takeOrderClient?: Maybe<Orders>;
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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


export type MutationCreateMaterialArgs = {
  material: MaterialInput;
};


export type MutationDeleteMaterialArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateMaterialArgs = {
  id: Scalars['Int'];
  material: MaterialInput;
};


export type MutationCreateMaterialTypeArgs = {
  name: Scalars['String'];
};


export type MutationCreateProviderArgs = {
  provider: ProviderInput;
};


export type MutationDeleteProviderArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateProviderArgs = {
  provider: UpdateProviderInput;
};


export type MutationUpdateMaterialStageArgs = {
  id: Scalars['Int'];
  weight: Scalars['Float'];
  uniteds: Scalars['Int'];
};


export type MutationUpdateMateriaStageWArgs = {
  materials?: Maybe<Array<Maybe<UpdateMaterialStage>>>;
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


export type MutationUpdatStateOrderArgs = {
  id: Scalars['Int'];
  state?: Maybe<UpdateOrder>;
};


export type MutationProduceOrderArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProductArgs = {
  product: ProductsInput;
};


export type MutationUpdateProductArgs = {
  product: UpdateProductsInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};


export type MutationTakeOrderArgs = {
  order: TakeOrderInput;
};


export type MutationDeleteOrderArgs = {
  id: Scalars['Int'];
};


export type MutationTakeOrderClientArgs = {
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
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  PayMethod: PayMethod,
  UserRole: UserRole,
  OrdersLog: ResolverTypeWrapper<OrdersLog>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ProducstLog: ResolverTypeWrapper<ProducstLog>,
  SessionLog: ResolverTypeWrapper<SessionLog>,
  StorageLog: ResolverTypeWrapper<StorageLog>,
  Material: ResolverTypeWrapper<Material>,
  MaterialsStage: ResolverTypeWrapper<MaterialsStage>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  MaterialInput: MaterialInput,
  MaterialProductInput: MaterialProductInput,
  UpdateMaterialStage: UpdateMaterialStage,
  MaterialWaste: ResolverTypeWrapper<MaterialWaste>,
  MaterialsProduct: ResolverTypeWrapper<MaterialsProduct>,
  onStockMaterial: ResolverTypeWrapper<OnStockMaterial>,
  MaterialType: ResolverTypeWrapper<MaterialType>,
  OrderWaste: ResolverTypeWrapper<OrderWaste>,
  OrderProducts: ResolverTypeWrapper<OrderProducts>,
  Orders: ResolverTypeWrapper<Orders>,
  OrderInput: OrderInput,
  TakeOrderInput: TakeOrderInput,
  UpdateOrder: UpdateOrder,
  ProductType: ResolverTypeWrapper<ProductType>,
  Rate: ResolverTypeWrapper<Rate>,
  PreservationType: ResolverTypeWrapper<PreservationType>,
  Products: ResolverTypeWrapper<Products>,
  ProductsInput: ProductsInput,
  UpdateProductsInput: UpdateProductsInput,
  ProductOrderInput: ProductOrderInput,
  GetProducts: ResolverTypeWrapper<GetProducts>,
  Provider: ResolverTypeWrapper<Provider>,
  ProviderInput: ProviderInput,
  UpdateProviderInput: UpdateProviderInput,
  SessionUser: ResolverTypeWrapper<SessionUser>,
  Query: ResolverTypeWrapper<{}>,
  Store: ResolverTypeWrapper<Store>,
  StoreInput: StoreInput,
  UpdateStoreInput: UpdateStoreInput,
  User: ResolverTypeWrapper<User>,
  ClientOrders: ResolverTypeWrapper<ClientOrders>,
  loginUser: ResolverTypeWrapper<LoginUser>,
  UserInput: UserInput,
  UpdateUserInput: UpdateUserInput,
  Mutation: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Upload: Scalars['Upload'],
  Date: Scalars['Date'],
  PayMethod: PayMethod,
  UserRole: UserRole,
  OrdersLog: OrdersLog,
  Int: Scalars['Int'],
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  ProducstLog: ProducstLog,
  SessionLog: SessionLog,
  StorageLog: StorageLog,
  Material: Material,
  MaterialsStage: MaterialsStage,
  Float: Scalars['Float'],
  MaterialInput: MaterialInput,
  MaterialProductInput: MaterialProductInput,
  UpdateMaterialStage: UpdateMaterialStage,
  MaterialWaste: MaterialWaste,
  MaterialsProduct: MaterialsProduct,
  onStockMaterial: OnStockMaterial,
  MaterialType: MaterialType,
  OrderWaste: OrderWaste,
  OrderProducts: OrderProducts,
  Orders: Orders,
  OrderInput: OrderInput,
  TakeOrderInput: TakeOrderInput,
  UpdateOrder: UpdateOrder,
  ProductType: ProductType,
  Rate: Rate,
  PreservationType: PreservationType,
  Products: Products,
  ProductsInput: ProductsInput,
  UpdateProductsInput: UpdateProductsInput,
  ProductOrderInput: ProductOrderInput,
  GetProducts: GetProducts,
  Provider: Provider,
  ProviderInput: ProviderInput,
  UpdateProviderInput: UpdateProviderInput,
  SessionUser: SessionUser,
  Query: {},
  Store: Store,
  StoreInput: StoreInput,
  UpdateStoreInput: UpdateStoreInput,
  User: User,
  ClientOrders: ClientOrders,
  loginUser: LoginUser,
  UserInput: UserInput,
  UpdateUserInput: UpdateUserInput,
  Mutation: {},
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type OrdersLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrdersLog'] = ResolversParentTypes['OrdersLog']> = {
  id_pedido?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  user_db?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  client?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  delivered?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  stage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  action_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  production?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProducstLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProducstLog'] = ResolversParentTypes['ProducstLog']> = {
  user_db?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id_product?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  action_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SessionLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionLog'] = ResolversParentTypes['SessionLog']> = {
  id_user?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  action_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type StorageLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['StorageLog'] = ResolversParentTypes['StorageLog']> = {
  id_material?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  id_provider?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  user_db?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  action_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialResolvers<ContextType = any, ParentType extends ResolversParentTypes['Material'] = ResolversParentTypes['Material']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  nombre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['MaterialType']>, ParentType, ContextType>,
  store?: Resolver<Maybe<Array<Maybe<ResolversTypes['Store']>>>, ParentType, ContextType>,
  onStock?: Resolver<Maybe<ResolversTypes['onStockMaterial']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialsStageResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaterialsStage'] = ResolversParentTypes['MaterialsStage']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  uniteds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialWasteResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaterialWaste'] = ResolversParentTypes['MaterialWaste']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  material_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialsProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaterialsProduct'] = ResolversParentTypes['MaterialsProduct']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  material?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OnStockMaterialResolvers<ContextType = any, ParentType extends ResolversParentTypes['onStockMaterial'] = ResolversParentTypes['onStockMaterial']> = {
  uniteds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MaterialTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaterialType'] = ResolversParentTypes['MaterialType']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrderWasteResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderWaste'] = ResolversParentTypes['OrderWaste']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaterialWaste']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrderProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderProducts'] = ResolversParentTypes['OrderProducts']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  product?: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType>,
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaterialWaste']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrdersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Orders'] = ResolversParentTypes['Orders']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  pay_method?: Resolver<Maybe<ResolversTypes['PayMethod']>, ParentType, ContextType>,
  delivery_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  delivery_status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  production_status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  stage_status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  abono?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  monto?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrderProducts']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProductTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductType'] = ResolversParentTypes['ProductType']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Products']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type RateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rate'] = ResolversParentTypes['Rate']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  times_valued?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
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
  rate?: Resolver<Maybe<ResolversTypes['Rate']>, ParentType, ContextType>,
  preservation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  available?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GetProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetProducts'] = ResolversParentTypes['GetProducts']> = {
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Products']>>>, ParentType, ContextType>,
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
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

export type SessionUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionUser'] = ResolversParentTypes['SessionUser']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  clients?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  client?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryClientArgs, 'id'>>,
  sessionUser?: Resolver<ResolversTypes['SessionUser'], ParentType, ContextType>,
  sessionLog?: Resolver<Maybe<Array<Maybe<ResolversTypes['SessionLog']>>>, ParentType, ContextType>,
  materialTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaterialType']>>>, ParentType, ContextType>,
  materialsStage?: Resolver<Maybe<Array<Maybe<ResolversTypes['MaterialsStage']>>>, ParentType, ContextType>,
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['Material']>>>, ParentType, ContextType>,
  provider?: Resolver<Maybe<ResolversTypes['Provider']>, ParentType, ContextType, RequireFields<QueryProviderArgs, 'id'>>,
  providers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Provider']>>>, ParentType, ContextType>,
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QueryStoreArgs, 'id'>>,
  storage?: Resolver<Maybe<Array<Maybe<ResolversTypes['Store']>>>, ParentType, ContextType>,
  searchProducts?: Resolver<Maybe<ResolversTypes['GetProducts']>, ParentType, ContextType, RequireFields<QuerySearchProductsArgs, 'size' | 'cursor'>>,
  getProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Products']>>>, ParentType, ContextType>,
  productTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductType']>>>, ParentType, ContextType>,
  productPreservation?: Resolver<Maybe<Array<Maybe<ResolversTypes['PreservationType']>>>, ParentType, ContextType>,
  product?: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>,
  order?: Resolver<Maybe<ResolversTypes['Orders']>, ParentType, ContextType, RequireFields<QueryOrderArgs, 'id'>>,
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Orders']>>>, ParentType, ContextType>,
  productsLog?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProducstLog']>>>, ParentType, ContextType>,
  storageLog?: Resolver<Maybe<Array<Maybe<ResolversTypes['StorageLog']>>>, ParentType, ContextType>,
  ordersLog?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrdersLog']>>>, ParentType, ContextType>,
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  material?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType>,
  provider?: Resolver<Maybe<ResolversTypes['Provider']>, ParentType, ContextType>,
  uniteds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  expiration_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  united_weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orders?: Resolver<Maybe<ResolversTypes['ClientOrders']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ClientOrdersResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClientOrders'] = ResolversParentTypes['ClientOrders']> = {
  delivered?: Resolver<Maybe<Array<Maybe<ResolversTypes['Orders']>>>, ParentType, ContextType>,
  pending?: Resolver<Maybe<Array<Maybe<ResolversTypes['Orders']>>>, ParentType, ContextType>,
  all?: Resolver<Maybe<Array<Maybe<ResolversTypes['Orders']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LoginUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['loginUser'] = ResolversParentTypes['loginUser']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  loginUser?: Resolver<Maybe<ResolversTypes['loginUser']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'email' | 'password'>>,
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>,
  editUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationEditUserArgs, 'user'>>,
  deleteUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
  createMaterial?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<MutationCreateMaterialArgs, 'material'>>,
  deleteMaterial?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteMaterialArgs, 'id'>>,
  updateMaterial?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<MutationUpdateMaterialArgs, 'id' | 'material'>>,
  createMaterialType?: Resolver<Maybe<ResolversTypes['MaterialType']>, ParentType, ContextType, RequireFields<MutationCreateMaterialTypeArgs, 'name'>>,
  createProvider?: Resolver<Maybe<ResolversTypes['Provider']>, ParentType, ContextType, RequireFields<MutationCreateProviderArgs, 'provider'>>,
  deleteProvider?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteProviderArgs, 'id'>>,
  updateProvider?: Resolver<Maybe<ResolversTypes['Provider']>, ParentType, ContextType, RequireFields<MutationUpdateProviderArgs, 'provider'>>,
  updateMaterialStage?: Resolver<Maybe<ResolversTypes['MaterialsStage']>, ParentType, ContextType, RequireFields<MutationUpdateMaterialStageArgs, 'id' | 'weight' | 'uniteds'>>,
  updateMateriaStageW?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationUpdateMateriaStageWArgs, never>>,
  addToStore?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationAddToStoreArgs, 'store'>>,
  updateStore?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationUpdateStoreArgs, 'store'>>,
  deleteStored?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteStoredArgs, 'id'>>,
  updatStateOrder?: Resolver<Maybe<ResolversTypes['MaterialsStage']>, ParentType, ContextType, RequireFields<MutationUpdatStateOrderArgs, 'id'>>,
  produceOrder?: Resolver<Maybe<ResolversTypes['Orders']>, ParentType, ContextType, RequireFields<MutationProduceOrderArgs, 'id'>>,
  createProduct?: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'product'>>,
  updateProduct?: Resolver<Maybe<ResolversTypes['Products']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'product'>>,
  deleteProduct?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>,
  takeOrder?: Resolver<Maybe<ResolversTypes['Orders']>, ParentType, ContextType, RequireFields<MutationTakeOrderArgs, 'order'>>,
  deleteOrder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteOrderArgs, 'id'>>,
  takeOrderClient?: Resolver<Maybe<ResolversTypes['Orders']>, ParentType, ContextType, RequireFields<MutationTakeOrderClientArgs, 'order'>>,
};

export type Resolvers<ContextType = any> = {
  Upload?: GraphQLScalarType,
  Date?: GraphQLScalarType,
  OrdersLog?: OrdersLogResolvers<ContextType>,
  ProducstLog?: ProducstLogResolvers<ContextType>,
  SessionLog?: SessionLogResolvers<ContextType>,
  StorageLog?: StorageLogResolvers<ContextType>,
  Material?: MaterialResolvers<ContextType>,
  MaterialsStage?: MaterialsStageResolvers<ContextType>,
  MaterialWaste?: MaterialWasteResolvers<ContextType>,
  MaterialsProduct?: MaterialsProductResolvers<ContextType>,
  onStockMaterial?: OnStockMaterialResolvers<ContextType>,
  MaterialType?: MaterialTypeResolvers<ContextType>,
  OrderWaste?: OrderWasteResolvers<ContextType>,
  OrderProducts?: OrderProductsResolvers<ContextType>,
  Orders?: OrdersResolvers<ContextType>,
  ProductType?: ProductTypeResolvers<ContextType>,
  Rate?: RateResolvers<ContextType>,
  PreservationType?: PreservationTypeResolvers<ContextType>,
  Products?: ProductsResolvers<ContextType>,
  GetProducts?: GetProductsResolvers<ContextType>,
  Provider?: ProviderResolvers<ContextType>,
  SessionUser?: SessionUserResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Store?: StoreResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  ClientOrders?: ClientOrdersResolvers<ContextType>,
  loginUser?: LoginUserResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
