
/**
 * Client
**/

import * as runtime from './runtime';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 */

export type User = {
  id: number
  email: string
  username: string
  password: string
  role: UserRole
  certification: Certification
  url: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Token
 */

export type Token = {
  id: number
  createdAt: Date
  updatedAt: Date
  valid: boolean
  userId: number
  content: string
}

/**
 * Model Notification
 */

export type Notification = {
  id: number
  createdAt: Date
  updatedAt: Date
  receiverId: number
  emitterId: number
  postId: number
  commentId: number
  message: string
}

/**
 * Model Post
 */

export type Post = {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  body: string
  excerpt: string
  url: string
  previewUrl: string
  published: boolean
  allowComments: boolean
  authorId: number
  likeCount: number
  commentCount: number
}

/**
 * Model Comment
 */

export type Comment = {
  id: number
  createdAt: Date
  updatedAt: Date
  text: string
  authorId: number
  postId: number
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const Certification: {
  OPEN_WATER: 'OPEN_WATER',
  ADVANCED: 'ADVANCED',
  RESCUE: 'RESCUE',
  DIVEMASTER: 'DIVEMASTER',
  INSTRUCTOR: 'INSTRUCTOR'
};

export type Certification = (typeof Certification)[keyof typeof Certification]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.$executeRaw``, values will be escaped automatically
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.$executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.$queryRaw``, values will be escaped automatically
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.$queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<GlobalReject>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<GlobalReject>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<GlobalReject>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.30.2
   * Query Engine version: b8c35d44de987a9691890b3ddf3e2e7effb9bf20
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Token: 'Token',
    Notification: 'Notification',
    Post: 'Post',
    Comment: 'Comment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
    max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    password: string | null
    role: UserRole | null
    certification: Certification | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    password: string | null
    role: UserRole | null
    certification: Certification | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    role: number
    certification: number
    url: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    certification?: true
    url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    certification?: true
    url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    certification?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }


    
    
  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    email: string
    username: string
    password: string
    role: UserRole
    certification: Certification
    url: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Promise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], UserGroupByOutputType[P]> 
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      > 
    >


  export type UserSelect = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    certification?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    token?: boolean | TokenFindManyArgs
    notifications?: boolean | NotificationFindManyArgs
    posts?: boolean | PostFindManyArgs
    likes?: boolean | PostFindManyArgs
    comments?: boolean | CommentFindManyArgs
  }

  export type UserInclude = {
    token?: boolean | TokenFindManyArgs
    notifications?: boolean | NotificationFindManyArgs
    posts?: boolean | PostFindManyArgs
    likes?: boolean | PostFindManyArgs
    comments?: boolean | CommentFindManyArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'token'
        ? Array < TokenGetPayload<S['include'][P]>>  :
        P extends 'notifications'
        ? Array < NotificationGetPayload<S['include'][P]>>  :
        P extends 'posts'
        ? Array < PostGetPayload<S['include'][P]>>  :
        P extends 'likes'
        ? Array < PostGetPayload<S['include'][P]>>  :
        P extends 'comments'
        ? Array < CommentGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof User ?User [P]
  : 
          P extends 'token'
        ? Array < TokenGetPayload<S['select'][P]>>  :
        P extends 'notifications'
        ? Array < NotificationGetPayload<S['select'][P]>>  :
        P extends 'posts'
        ? Array < PostGetPayload<S['select'][P]>>  :
        P extends 'likes'
        ? Array < PostGetPayload<S['select'][P]>>  :
        P extends 'comments'
        ? Array < CommentGetPayload<S['select'][P]>>  : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    token<T extends TokenFindManyArgs = {}>(args?: Subset<T, TokenFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Token>>, PrismaPromise<Array<TokenGetPayload<T>>>>;

    notifications<T extends NotificationFindManyArgs = {}>(args?: Subset<T, NotificationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Notification>>, PrismaPromise<Array<NotificationGetPayload<T>>>>;

    posts<T extends PostFindManyArgs = {}>(args?: Subset<T, PostFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Post>>, PrismaPromise<Array<PostGetPayload<T>>>>;

    likes<T extends PostFindManyArgs = {}>(args?: Subset<T, PostFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Post>>, PrismaPromise<Array<PostGetPayload<T>>>>;

    comments<T extends CommentFindManyArgs = {}>(args?: Subset<T, CommentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Token
   */


  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
    max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TokenMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    valid: boolean | null
    userId: number | null
    content: string | null
  }

  export type TokenMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    valid: boolean | null
    userId: number | null
    content: string | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    valid: number
    userId: number
    content: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TokenMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    valid?: true
    userId?: true
    content?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    valid?: true
    userId?: true
    content?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    valid?: true
    userId?: true
    content?: true
    _all?: true
  }

  export type TokenAggregateArgs = {
    /**
     * Filter which Token to aggregate.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }


    
    
  export type TokenGroupByArgs = {
    where?: TokenWhereInput
    orderBy?: Enumerable<TokenOrderByInput>
    by: Array<TokenScalarFieldEnum>
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }


  export type TokenGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    valid: boolean
    userId: number
    content: string
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Promise<
    Array<
      PickArray<TokenGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], TokenGroupByOutputType[P]> 
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      > 
    >


  export type TokenSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    valid?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    content?: boolean
  }

  export type TokenInclude = {
    user?: boolean | UserArgs
  }

  export type TokenGetPayload<
    S extends boolean | null | undefined | TokenArgs,
    U = keyof S
      > = S extends true
        ? Token
    : S extends undefined
    ? never
    : S extends TokenArgs | TokenFindManyArgs
    ?'include' extends U
    ? Token  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Token ?Token [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> : never
  } 
    : Token
  : Token


  type TokenCountArgs = Merge<
    Omit<TokenFindManyArgs, 'select' | 'include'> & {
      select?: TokenCountAggregateInputType | true
    }
  >

  export interface TokenDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Token'> extends True ? CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>> : CheckSelect<T, Prisma__TokenClient<Token | null >, Prisma__TokenClient<TokenGetPayload<T> | null >>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Token'> extends True ? CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>> : CheckSelect<T, Prisma__TokenClient<Token | null >, Prisma__TokenClient<TokenGetPayload<T> | null >>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TokenFindManyArgs>(
      args?: SelectSubset<T, TokenFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Token>>, PrismaPromise<Array<TokenGetPayload<T>>>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
    **/
    create<T extends TokenCreateArgs>(
      args: SelectSubset<T, TokenCreateArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Create many Tokens.
     *     @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     *     @example
     *     // Create many Tokens
     *     const token = await prisma.token.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TokenCreateManyArgs>(
      args?: SelectSubset<T, TokenCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
    **/
    delete<T extends TokenDeleteArgs>(
      args: SelectSubset<T, TokenDeleteArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TokenUpdateArgs>(
      args: SelectSubset<T, TokenUpdateArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TokenDeleteManyArgs>(
      args?: SelectSubset<T, TokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TokenUpdateManyArgs>(
      args: SelectSubset<T, TokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
    **/
    upsert<T extends TokenUpsertArgs>(
      args: SelectSubset<T, TokenUpsertArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TokenClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Throw an Error if a Token can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Token to fetch.
     * 
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Throw an Error if a Token can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Token to fetch.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     * 
    **/
    distinct?: Enumerable<TokenScalarFieldEnum>
  }


  /**
   * Token findMany
   */
  export type TokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Tokens to fetch.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TokenScalarFieldEnum>
  }


  /**
   * Token create
   */
  export type TokenCreateArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The data needed to create a Token.
     * 
    **/
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }


  /**
   * Token createMany
   */
  export type TokenCreateManyArgs = {
    data: Enumerable<TokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Token update
   */
  export type TokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The data needed to update a Token.
     * 
    **/
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     * 
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs = {
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    where?: TokenWhereInput
  }


  /**
   * Token upsert
   */
  export type TokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The filter to search for the Token to update in case it exists.
     * 
    **/
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     * 
    **/
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }


  /**
   * Token delete
   */
  export type TokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter which Token to delete.
     * 
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs = {
    where?: TokenWhereInput
  }


  /**
   * Token without action
   */
  export type TokenArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
  }



  /**
   * Model Notification
   */


  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
    max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    receiverId: number | null
    emitterId: number | null
    postId: number | null
    commentId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    receiverId: number | null
    emitterId: number | null
    postId: number | null
    commentId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    receiverId: number | null
    emitterId: number | null
    postId: number | null
    commentId: number | null
    message: string | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    receiverId: number | null
    emitterId: number | null
    postId: number | null
    commentId: number | null
    message: string | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    receiverId: number
    emitterId: number
    postId: number
    commentId: number
    message: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    receiverId?: true
    emitterId?: true
    postId?: true
    commentId?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    receiverId?: true
    emitterId?: true
    postId?: true
    commentId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    receiverId?: true
    emitterId?: true
    postId?: true
    commentId?: true
    message?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    receiverId?: true
    emitterId?: true
    postId?: true
    commentId?: true
    message?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    receiverId?: true
    emitterId?: true
    postId?: true
    commentId?: true
    message?: true
    _all?: true
  }

  export type NotificationAggregateArgs = {
    /**
     * Filter which Notification to aggregate.
     * 
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     * 
    **/
    orderBy?: Enumerable<NotificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }


    
    
  export type NotificationGroupByArgs = {
    where?: NotificationWhereInput
    orderBy?: Enumerable<NotificationOrderByInput>
    by: Array<NotificationScalarFieldEnum>
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }


  export type NotificationGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    receiverId: number
    emitterId: number
    postId: number
    commentId: number
    message: string
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Promise<
    Array<
      PickArray<NotificationGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], NotificationGroupByOutputType[P]> 
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      > 
    >


  export type NotificationSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    receiver?: boolean | UserArgs
    receiverId?: boolean
    emitterId?: boolean
    postId?: boolean
    commentId?: boolean
    message?: boolean
  }

  export type NotificationInclude = {
    receiver?: boolean | UserArgs
  }

  export type NotificationGetPayload<
    S extends boolean | null | undefined | NotificationArgs,
    U = keyof S
      > = S extends true
        ? Notification
    : S extends undefined
    ? never
    : S extends NotificationArgs | NotificationFindManyArgs
    ?'include' extends U
    ? Notification  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'receiver'
        ? UserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Notification ?Notification [P]
  : 
          P extends 'receiver'
        ? UserGetPayload<S['select'][P]> : never
  } 
    : Notification
  : Notification


  type NotificationCountArgs = Merge<
    Omit<NotificationFindManyArgs, 'select' | 'include'> & {
      select?: NotificationCountAggregateInputType | true
    }
  >

  export interface NotificationDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NotificationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NotificationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Notification'> extends True ? CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>> : CheckSelect<T, Prisma__NotificationClient<Notification | null >, Prisma__NotificationClient<NotificationGetPayload<T> | null >>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NotificationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NotificationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Notification'> extends True ? CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>> : CheckSelect<T, Prisma__NotificationClient<Notification | null >, Prisma__NotificationClient<NotificationGetPayload<T> | null >>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends NotificationFindManyArgs>(
      args?: SelectSubset<T, NotificationFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Notification>>, PrismaPromise<Array<NotificationGetPayload<T>>>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
    **/
    create<T extends NotificationCreateArgs>(
      args: SelectSubset<T, NotificationCreateArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Create many Notifications.
     *     @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     *     @example
     *     // Create many Notifications
     *     const notification = await prisma.notification.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends NotificationCreateManyArgs>(
      args?: SelectSubset<T, NotificationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
    **/
    delete<T extends NotificationDeleteArgs>(
      args: SelectSubset<T, NotificationDeleteArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NotificationUpdateArgs>(
      args: SelectSubset<T, NotificationUpdateArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NotificationDeleteManyArgs>(
      args?: SelectSubset<T, NotificationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NotificationUpdateManyArgs>(
      args: SelectSubset<T, NotificationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
    **/
    upsert<T extends NotificationUpsertArgs>(
      args: SelectSubset<T, NotificationUpsertArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NotificationClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    receiver<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * Throw an Error if a Notification can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Notification to fetch.
     * 
    **/
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * Throw an Error if a Notification can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Notification to fetch.
     * 
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     * 
    **/
    orderBy?: Enumerable<NotificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     * 
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     * 
    **/
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * Filter, which Notifications to fetch.
     * 
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     * 
    **/
    orderBy?: Enumerable<NotificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     * 
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     * 
    **/
    skip?: number
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * Notification create
   */
  export type NotificationCreateArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * The data needed to create a Notification.
     * 
    **/
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }


  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs = {
    data: Enumerable<NotificationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Notification update
   */
  export type NotificationUpdateArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * The data needed to update a Notification.
     * 
    **/
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     * 
    **/
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs = {
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    where?: NotificationWhereInput
  }


  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * The filter to search for the Notification to update in case it exists.
     * 
    **/
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     * 
    **/
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }


  /**
   * Notification delete
   */
  export type NotificationDeleteArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
    /**
     * Filter which Notification to delete.
     * 
    **/
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs = {
    where?: NotificationWhereInput
  }


  /**
   * Notification without action
   */
  export type NotificationArgs = {
    /**
     * Select specific fields to fetch from the Notification
     * 
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NotificationInclude | null
  }



  /**
   * Model Post
   */


  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
    max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
    likeCount: number | null
    commentCount: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
    authorId: number | null
    likeCount: number | null
    commentCount: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    body: string | null
    excerpt: string | null
    url: string | null
    previewUrl: string | null
    published: boolean | null
    allowComments: boolean | null
    authorId: number | null
    likeCount: number | null
    commentCount: number | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    body: string | null
    excerpt: string | null
    url: string | null
    previewUrl: string | null
    published: boolean | null
    allowComments: boolean | null
    authorId: number | null
    likeCount: number | null
    commentCount: number | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    body: number
    excerpt: number
    url: number
    previewUrl: number
    published: number
    allowComments: number
    authorId: number
    likeCount: number
    commentCount: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    authorId?: true
    likeCount?: true
    commentCount?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    authorId?: true
    likeCount?: true
    commentCount?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    body?: true
    excerpt?: true
    url?: true
    previewUrl?: true
    published?: true
    allowComments?: true
    authorId?: true
    likeCount?: true
    commentCount?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    body?: true
    excerpt?: true
    url?: true
    previewUrl?: true
    published?: true
    allowComments?: true
    authorId?: true
    likeCount?: true
    commentCount?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    body?: true
    excerpt?: true
    url?: true
    previewUrl?: true
    published?: true
    allowComments?: true
    authorId?: true
    likeCount?: true
    commentCount?: true
    _all?: true
  }

  export type PostAggregateArgs = {
    /**
     * Filter which Post to aggregate.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }


    
    
  export type PostGroupByArgs = {
    where?: PostWhereInput
    orderBy?: Enumerable<PostOrderByInput>
    by: Array<PostScalarFieldEnum>
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }


  export type PostGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    body: string
    excerpt: string
    url: string
    previewUrl: string
    published: boolean
    allowComments: boolean
    authorId: number
    likeCount: number
    commentCount: number
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Promise<
    Array<
      PickArray<PostGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], PostGroupByOutputType[P]> 
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      > 
    >


  export type PostSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    body?: boolean
    excerpt?: boolean
    url?: boolean
    previewUrl?: boolean
    published?: boolean
    allowComments?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
    likedBy?: boolean | UserFindManyArgs
    likeCount?: boolean
    comments?: boolean | CommentFindManyArgs
    commentCount?: boolean
  }

  export type PostInclude = {
    author?: boolean | UserArgs
    likedBy?: boolean | UserFindManyArgs
    comments?: boolean | CommentFindManyArgs
  }

  export type PostGetPayload<
    S extends boolean | null | undefined | PostArgs,
    U = keyof S
      > = S extends true
        ? Post
    : S extends undefined
    ? never
    : S extends PostArgs | PostFindManyArgs
    ?'include' extends U
    ? Post  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'author'
        ? UserGetPayload<S['include'][P]> :
        P extends 'likedBy'
        ? Array < UserGetPayload<S['include'][P]>>  :
        P extends 'comments'
        ? Array < CommentGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Post ?Post [P]
  : 
          P extends 'author'
        ? UserGetPayload<S['select'][P]> :
        P extends 'likedBy'
        ? Array < UserGetPayload<S['select'][P]>>  :
        P extends 'comments'
        ? Array < CommentGetPayload<S['select'][P]>>  : never
  } 
    : Post
  : Post


  type PostCountArgs = Merge<
    Omit<PostFindManyArgs, 'select' | 'include'> & {
      select?: PostCountAggregateInputType | true
    }
  >

  export interface PostDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Post'> extends True ? CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>> : CheckSelect<T, Prisma__PostClient<Post | null >, Prisma__PostClient<PostGetPayload<T> | null >>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Post'> extends True ? CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>> : CheckSelect<T, Prisma__PostClient<Post | null >, Prisma__PostClient<PostGetPayload<T> | null >>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PostFindManyArgs>(
      args?: SelectSubset<T, PostFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Post>>, PrismaPromise<Array<PostGetPayload<T>>>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
    **/
    create<T extends PostCreateArgs>(
      args: SelectSubset<T, PostCreateArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Create many Posts.
     *     @param {PostCreateManyArgs} args - Arguments to create many Posts.
     *     @example
     *     // Create many Posts
     *     const post = await prisma.post.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PostCreateManyArgs>(
      args?: SelectSubset<T, PostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
    **/
    delete<T extends PostDeleteArgs>(
      args: SelectSubset<T, PostDeleteArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PostUpdateArgs>(
      args: SelectSubset<T, PostUpdateArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PostDeleteManyArgs>(
      args?: SelectSubset<T, PostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PostUpdateManyArgs>(
      args: SelectSubset<T, PostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
    **/
    upsert<T extends PostUpsertArgs>(
      args: SelectSubset<T, PostUpsertArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PostClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    likedBy<T extends UserFindManyArgs = {}>(args?: Subset<T, UserFindManyArgs>): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>;

    comments<T extends CommentFindManyArgs = {}>(args?: Subset<T, CommentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Throw an Error if a Post can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post findFirst
   */
  export type PostFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Throw an Error if a Post can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     * 
    **/
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post findMany
   */
  export type PostFindManyArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Posts to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post create
   */
  export type PostCreateArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The data needed to create a Post.
     * 
    **/
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }


  /**
   * Post createMany
   */
  export type PostCreateManyArgs = {
    data: Enumerable<PostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Post update
   */
  export type PostUpdateArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The data needed to update a Post.
     * 
    **/
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs = {
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    where?: PostWhereInput
  }


  /**
   * Post upsert
   */
  export type PostUpsertArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The filter to search for the Post to update in case it exists.
     * 
    **/
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     * 
    **/
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }


  /**
   * Post delete
   */
  export type PostDeleteArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter which Post to delete.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs = {
    where?: PostWhereInput
  }


  /**
   * Post without action
   */
  export type PostArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
  }



  /**
   * Model Comment
   */


  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
    max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
    postId: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    authorId: number | null
    postId: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    text: string | null
    authorId: number | null
    postId: number | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    text: string | null
    authorId: number | null
    postId: number | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    text: number
    authorId: number
    postId: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    authorId?: true
    postId?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    authorId?: true
    postId?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    text?: true
    authorId?: true
    postId?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    text?: true
    authorId?: true
    postId?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    text?: true
    authorId?: true
    postId?: true
    _all?: true
  }

  export type CommentAggregateArgs = {
    /**
     * Filter which Comment to aggregate.
     * 
    **/
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }


    
    
  export type CommentGroupByArgs = {
    where?: CommentWhereInput
    orderBy?: Enumerable<CommentOrderByInput>
    by: Array<CommentScalarFieldEnum>
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }


  export type CommentGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    text: string
    authorId: number
    postId: number
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Promise<
    Array<
      PickArray<CommentGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], CommentGroupByOutputType[P]> 
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      > 
    >


  export type CommentSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    text?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
    post?: boolean | PostArgs
    postId?: boolean
  }

  export type CommentInclude = {
    author?: boolean | UserArgs
    post?: boolean | PostArgs
  }

  export type CommentGetPayload<
    S extends boolean | null | undefined | CommentArgs,
    U = keyof S
      > = S extends true
        ? Comment
    : S extends undefined
    ? never
    : S extends CommentArgs | CommentFindManyArgs
    ?'include' extends U
    ? Comment  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'author'
        ? UserGetPayload<S['include'][P]> :
        P extends 'post'
        ? PostGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Comment ?Comment [P]
  : 
          P extends 'author'
        ? UserGetPayload<S['select'][P]> :
        P extends 'post'
        ? PostGetPayload<S['select'][P]> : never
  } 
    : Comment
  : Comment


  type CommentCountArgs = Merge<
    Omit<CommentFindManyArgs, 'select' | 'include'> & {
      select?: CommentCountAggregateInputType | true
    }
  >

  export interface CommentDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CommentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CommentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Comment'> extends True ? CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>> : CheckSelect<T, Prisma__CommentClient<Comment | null >, Prisma__CommentClient<CommentGetPayload<T> | null >>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CommentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CommentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Comment'> extends True ? CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>> : CheckSelect<T, Prisma__CommentClient<Comment | null >, Prisma__CommentClient<CommentGetPayload<T> | null >>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CommentFindManyArgs>(
      args?: SelectSubset<T, CommentFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
    **/
    create<T extends CommentCreateArgs>(
      args: SelectSubset<T, CommentCreateArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Create many Comments.
     *     @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     *     @example
     *     // Create many Comments
     *     const comment = await prisma.comment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CommentCreateManyArgs>(
      args?: SelectSubset<T, CommentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
    **/
    delete<T extends CommentDeleteArgs>(
      args: SelectSubset<T, CommentDeleteArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CommentUpdateArgs>(
      args: SelectSubset<T, CommentUpdateArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CommentDeleteManyArgs>(
      args?: SelectSubset<T, CommentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CommentUpdateManyArgs>(
      args: SelectSubset<T, CommentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
    **/
    upsert<T extends CommentUpsertArgs>(
      args: SelectSubset<T, CommentUpsertArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CommentClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, Prisma__PostClient<Post | null >, Prisma__PostClient<PostGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * Throw an Error if a Comment can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Comment to fetch.
     * 
    **/
    where: CommentWhereUniqueInput
  }


  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * Throw an Error if a Comment can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Comment to fetch.
     * 
    **/
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     * 
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     * 
    **/
    distinct?: Enumerable<CommentScalarFieldEnum>
  }


  /**
   * Comment findMany
   */
  export type CommentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * Filter, which Comments to fetch.
     * 
    **/
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     * 
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CommentScalarFieldEnum>
  }


  /**
   * Comment create
   */
  export type CommentCreateArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * The data needed to create a Comment.
     * 
    **/
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }


  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs = {
    data: Enumerable<CommentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Comment update
   */
  export type CommentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * The data needed to update a Comment.
     * 
    **/
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     * 
    **/
    where: CommentWhereUniqueInput
  }


  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs = {
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    where?: CommentWhereInput
  }


  /**
   * Comment upsert
   */
  export type CommentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * The filter to search for the Comment to update in case it exists.
     * 
    **/
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     * 
    **/
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }


  /**
   * Comment delete
   */
  export type CommentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * Filter which Comment to delete.
     * 
    **/
    where: CommentWhereUniqueInput
  }


  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs = {
    where?: CommentWhereInput
  }


  /**
   * Comment without action
   */
  export type CommentArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    role: 'role',
    certification: 'certification',
    url: 'url',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    valid: 'valid',
    userId: 'userId',
    content: 'content'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    receiverId: 'receiverId',
    emitterId: 'emitterId',
    postId: 'postId',
    commentId: 'commentId',
    message: 'message'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    body: 'body',
    excerpt: 'excerpt',
    url: 'url',
    previewUrl: 'previewUrl',
    published: 'published',
    allowComments: 'allowComments',
    authorId: 'authorId',
    likeCount: 'likeCount',
    commentCount: 'commentCount'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    text: 'text',
    authorId: 'authorId',
    postId: 'postId'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    email?: StringFilter | string
    username?: StringFilter | string
    password?: StringFilter | string
    role?: EnumUserRoleFilter | UserRole
    certification?: EnumCertificationFilter | Certification
    url?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    token?: TokenListRelationFilter
    notifications?: NotificationListRelationFilter
    posts?: PostListRelationFilter
    likes?: PostListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type UserOrderByInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    certification?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = {
    id?: number
    email?: string
    username?: string
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    email?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    role?: EnumUserRoleWithAggregatesFilter | UserRole
    certification?: EnumCertificationWithAggregatesFilter | Certification
    url?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TokenWhereInput = {
    AND?: Enumerable<TokenWhereInput>
    OR?: Enumerable<TokenWhereInput>
    NOT?: Enumerable<TokenWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    valid?: BoolFilter | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    content?: StringFilter | string
  }

  export type TokenOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    valid?: SortOrder
    userId?: SortOrder
    content?: SortOrder
  }

  export type TokenWhereUniqueInput = {
    id?: number
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<TokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TokenScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    valid?: BoolWithAggregatesFilter | boolean
    userId?: IntWithAggregatesFilter | number
    content?: StringWithAggregatesFilter | string
  }

  export type NotificationWhereInput = {
    AND?: Enumerable<NotificationWhereInput>
    OR?: Enumerable<NotificationWhereInput>
    NOT?: Enumerable<NotificationWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    receiver?: XOR<UserRelationFilter, UserWhereInput>
    receiverId?: IntFilter | number
    emitterId?: IntFilter | number
    postId?: IntFilter | number
    commentId?: IntFilter | number
    message?: StringFilter | string
  }

  export type NotificationOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    receiverId?: SortOrder
    emitterId?: SortOrder
    postId?: SortOrder
    commentId?: SortOrder
    message?: SortOrder
  }

  export type NotificationWhereUniqueInput = {
    id?: number
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    OR?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    receiverId?: IntWithAggregatesFilter | number
    emitterId?: IntWithAggregatesFilter | number
    postId?: IntWithAggregatesFilter | number
    commentId?: IntWithAggregatesFilter | number
    message?: StringWithAggregatesFilter | string
  }

  export type PostWhereInput = {
    AND?: Enumerable<PostWhereInput>
    OR?: Enumerable<PostWhereInput>
    NOT?: Enumerable<PostWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    title?: StringFilter | string
    body?: StringFilter | string
    excerpt?: StringFilter | string
    url?: StringFilter | string
    previewUrl?: StringFilter | string
    published?: BoolFilter | boolean
    allowComments?: BoolFilter | boolean
    author?: XOR<UserRelationFilter, UserWhereInput>
    authorId?: IntFilter | number
    likedBy?: UserListRelationFilter
    likeCount?: IntFilter | number
    comments?: CommentListRelationFilter
    commentCount?: IntFilter | number
  }

  export type PostOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    body?: SortOrder
    excerpt?: SortOrder
    url?: SortOrder
    previewUrl?: SortOrder
    published?: SortOrder
    allowComments?: SortOrder
    authorId?: SortOrder
    likeCount?: SortOrder
    commentCount?: SortOrder
  }

  export type PostWhereUniqueInput = {
    id?: number
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PostScalarWhereWithAggregatesInput>
    OR?: Enumerable<PostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PostScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    title?: StringWithAggregatesFilter | string
    body?: StringWithAggregatesFilter | string
    excerpt?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    previewUrl?: StringWithAggregatesFilter | string
    published?: BoolWithAggregatesFilter | boolean
    allowComments?: BoolWithAggregatesFilter | boolean
    authorId?: IntWithAggregatesFilter | number
    likeCount?: IntWithAggregatesFilter | number
    commentCount?: IntWithAggregatesFilter | number
  }

  export type CommentWhereInput = {
    AND?: Enumerable<CommentWhereInput>
    OR?: Enumerable<CommentWhereInput>
    NOT?: Enumerable<CommentWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    text?: StringFilter | string
    author?: XOR<UserRelationFilter, UserWhereInput>
    authorId?: IntFilter | number
    post?: XOR<PostRelationFilter, PostWhereInput>
    postId?: IntFilter | number
  }

  export type CommentOrderByInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    text?: SortOrder
    authorId?: SortOrder
    postId?: SortOrder
  }

  export type CommentWhereUniqueInput = {
    id?: number
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CommentScalarWhereWithAggregatesInput>
    OR?: Enumerable<CommentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CommentScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    text?: StringWithAggregatesFilter | string
    authorId?: IntWithAggregatesFilter | number
    postId?: IntWithAggregatesFilter | number
  }

  export type UserCreateInput = {
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutReceiverInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    likes?: PostCreateNestedManyWithoutLikedByInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutReceiverInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateManyWithoutUserInput
    notifications?: NotificationUpdateManyWithoutReceiverInput
    posts?: PostUpdateManyWithoutAuthorInput
    likes?: PostUpdateManyWithoutLikedByInput
    comments?: CommentUpdateManyWithoutAuthorInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUncheckedUpdateManyWithoutUserInput
    notifications?: NotificationUncheckedUpdateManyWithoutReceiverInput
    posts?: PostUncheckedUpdateManyWithoutAuthorInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    valid?: boolean
    content: string
    user: UserCreateNestedOneWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    valid?: boolean
    userId: number
    content: string
  }

  export type TokenUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTokenInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
  }

  export type TokenCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    valid?: boolean
    userId: number
    content: string
  }

  export type TokenUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    emitterId: number
    postId?: number
    commentId?: number
    message: string
    receiver: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    receiverId: number
    emitterId: number
    postId?: number
    commentId?: number
    message: string
  }

  export type NotificationUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emitterId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    receiver?: UserUpdateOneRequiredWithoutNotificationsInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiverId?: IntFieldUpdateOperationsInput | number
    emitterId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    receiverId: number
    emitterId: number
    postId?: number
    commentId?: number
    message: string
  }

  export type NotificationUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emitterId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiverId?: IntFieldUpdateOperationsInput | number
    emitterId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
  }

  export type PostCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    likeCount?: number
    commentCount?: number
    author: UserCreateNestedOneWithoutPostsInput
    likedBy?: UserCreateNestedManyWithoutLikesInput
    comments?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    authorId: number
    likeCount?: number
    commentCount?: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
    author?: UserUpdateOneRequiredWithoutPostsInput
    likedBy?: UserUpdateManyWithoutLikesInput
    comments?: CommentUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostInput
  }

  export type PostCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    authorId: number
    likeCount?: number
    commentCount?: number
  }

  export type PostUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    author: UserCreateNestedOneWithoutCommentsInput
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    authorId: number
    postId: number
  }

  export type CommentUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutCommentsInput
    post?: PostUpdateOneRequiredWithoutCommentsInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    authorId: number
    postId: number
  }

  export type CommentUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type EnumUserRoleFilter = {
    equals?: UserRole
    in?: Enumerable<UserRole>
    notIn?: Enumerable<UserRole>
    not?: NestedEnumUserRoleFilter | UserRole
  }

  export type EnumCertificationFilter = {
    equals?: Certification
    in?: Enumerable<Certification>
    notIn?: Enumerable<Certification>
    not?: NestedEnumCertificationFilter | Certification
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type TokenListRelationFilter = {
    every?: TokenWhereInput
    some?: TokenWhereInput
    none?: TokenWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _avg?: NestedFloatFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedIntFilter
    _min?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedIntFilter
    _max?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringFilter
    _max?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringFilter
  }

  export type EnumUserRoleWithAggregatesFilter = {
    equals?: UserRole
    in?: Enumerable<UserRole>
    notIn?: Enumerable<UserRole>
    not?: NestedEnumUserRoleWithAggregatesFilter | UserRole
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedEnumUserRoleFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedEnumUserRoleFilter
    _max?: NestedEnumUserRoleFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedEnumUserRoleFilter
  }

  export type EnumCertificationWithAggregatesFilter = {
    equals?: Certification
    in?: Enumerable<Certification>
    notIn?: Enumerable<Certification>
    not?: NestedEnumCertificationWithAggregatesFilter | Certification
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedEnumCertificationFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedEnumCertificationFilter
    _max?: NestedEnumCertificationFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedEnumCertificationFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedDateTimeFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBoolFilter
    _max?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBoolFilter
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type PostRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type TokenCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenCreateWithoutUserInput>, Enumerable<TokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type NotificationCreateNestedManyWithoutReceiverInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutReceiverInput>, Enumerable<NotificationUncheckedCreateWithoutReceiverInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutReceiverInput>
    createMany?: NotificationCreateManyReceiverInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type PostCreateNestedManyWithoutLikedByInput = {
    create?: XOR<Enumerable<PostCreateWithoutLikedByInput>, Enumerable<PostUncheckedCreateWithoutLikedByInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutLikedByInput>
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type CommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentCreateWithoutAuthorInput>, Enumerable<CommentUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutAuthorInput>
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type TokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenCreateWithoutUserInput>, Enumerable<TokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type NotificationUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutReceiverInput>, Enumerable<NotificationUncheckedCreateWithoutReceiverInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutReceiverInput>
    createMany?: NotificationCreateManyReceiverInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentCreateWithoutAuthorInput>, Enumerable<CommentUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutAuthorInput>
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: UserRole
  }

  export type EnumCertificationFieldUpdateOperationsInput = {
    set?: Certification
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TokenUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenCreateWithoutUserInput>, Enumerable<TokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type NotificationUpdateManyWithoutReceiverInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutReceiverInput>, Enumerable<NotificationUncheckedCreateWithoutReceiverInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutReceiverInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutReceiverInput>
    createMany?: NotificationCreateManyReceiverInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutReceiverInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutReceiverInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type PostUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type PostUpdateManyWithoutLikedByInput = {
    create?: XOR<Enumerable<PostCreateWithoutLikedByInput>, Enumerable<PostUncheckedCreateWithoutLikedByInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutLikedByInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutLikedByInput>
    connect?: Enumerable<PostWhereUniqueInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutLikedByInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutLikedByInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type CommentUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentCreateWithoutAuthorInput>, Enumerable<CommentUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TokenUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenCreateWithoutUserInput>, Enumerable<TokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type NotificationUncheckedUpdateManyWithoutReceiverInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutReceiverInput>, Enumerable<NotificationUncheckedCreateWithoutReceiverInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutReceiverInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutReceiverInput>
    createMany?: NotificationCreateManyReceiverInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutReceiverInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutReceiverInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentCreateWithoutAuthorInput>, Enumerable<CommentUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutTokenInput = {
    create?: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutTokenInput = {
    create?: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    upsert?: UserUpsertWithoutTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTokenInput, UserUncheckedUpdateWithoutTokenInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutLikesInput = {
    create?: XOR<Enumerable<UserCreateWithoutLikesInput>, Enumerable<UserUncheckedCreateWithoutLikesInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutLikesInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentCreateWithoutPostInput>, Enumerable<CommentUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutPostInput>
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentCreateWithoutPostInput>, Enumerable<CommentUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutPostInput>
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateManyWithoutLikesInput = {
    create?: XOR<Enumerable<UserCreateWithoutLikesInput>, Enumerable<UserUncheckedCreateWithoutLikesInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutLikesInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutLikesInput>
    connect?: Enumerable<UserWhereUniqueInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutLikesInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutLikesInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type CommentUpdateManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentCreateWithoutPostInput>, Enumerable<CommentUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput>
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentCreateWithoutPostInput>, Enumerable<CommentUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput>
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    connect?: PostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateOneRequiredWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    upsert?: PostUpsertWithoutCommentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumUserRoleFilter = {
    equals?: UserRole
    in?: Enumerable<UserRole>
    notIn?: Enumerable<UserRole>
    not?: NestedEnumUserRoleFilter | UserRole
  }

  export type NestedEnumCertificationFilter = {
    equals?: Certification
    in?: Enumerable<Certification>
    notIn?: Enumerable<Certification>
    not?: NestedEnumCertificationFilter | Certification
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _avg?: NestedFloatFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedIntFilter
    _min?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedIntFilter
    _max?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringFilter
    _max?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringFilter
  }

  export type NestedEnumUserRoleWithAggregatesFilter = {
    equals?: UserRole
    in?: Enumerable<UserRole>
    notIn?: Enumerable<UserRole>
    not?: NestedEnumUserRoleWithAggregatesFilter | UserRole
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedEnumUserRoleFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedEnumUserRoleFilter
    _max?: NestedEnumUserRoleFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedEnumUserRoleFilter
  }

  export type NestedEnumCertificationWithAggregatesFilter = {
    equals?: Certification
    in?: Enumerable<Certification>
    notIn?: Enumerable<Certification>
    not?: NestedEnumCertificationWithAggregatesFilter | Certification
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedEnumCertificationFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedEnumCertificationFilter
    _max?: NestedEnumCertificationFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedEnumCertificationFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedDateTimeFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBoolFilter
    _max?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBoolFilter
  }

  export type TokenCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    valid?: boolean
    content: string
  }

  export type TokenUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    valid?: boolean
    content: string
  }

  export type TokenCreateOrConnectWithoutUserInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TokenCreateManyUserInputEnvelope = {
    data: Enumerable<TokenCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutReceiverInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    emitterId: number
    postId?: number
    commentId?: number
    message: string
  }

  export type NotificationUncheckedCreateWithoutReceiverInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    emitterId: number
    postId?: number
    commentId?: number
    message: string
  }

  export type NotificationCreateOrConnectWithoutReceiverInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutReceiverInput, NotificationUncheckedCreateWithoutReceiverInput>
  }

  export type NotificationCreateManyReceiverInputEnvelope = {
    data: Enumerable<NotificationCreateManyReceiverInput>
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutAuthorInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    likeCount?: number
    commentCount?: number
    likedBy?: UserCreateNestedManyWithoutLikesInput
    comments?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    likeCount?: number
    commentCount?: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: Enumerable<PostCreateManyAuthorInput>
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutLikedByInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    likeCount?: number
    commentCount?: number
    author: UserCreateNestedOneWithoutPostsInput
    comments?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutLikedByInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    authorId: number
    likeCount?: number
    commentCount?: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutLikedByInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutLikedByInput, PostUncheckedCreateWithoutLikedByInput>
  }

  export type CommentCreateWithoutAuthorInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    postId: number
  }

  export type CommentCreateOrConnectWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentCreateManyAuthorInputEnvelope = {
    data: Enumerable<CommentCreateManyAuthorInput>
    skipDuplicates?: boolean
  }

  export type TokenUpsertWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    update: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TokenUpdateWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    data: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
  }

  export type TokenUpdateManyWithWhereWithoutUserInput = {
    where: TokenScalarWhereInput
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyWithoutTokenInput>
  }

  export type TokenScalarWhereInput = {
    AND?: Enumerable<TokenScalarWhereInput>
    OR?: Enumerable<TokenScalarWhereInput>
    NOT?: Enumerable<TokenScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    valid?: BoolFilter | boolean
    userId?: IntFilter | number
    content?: StringFilter | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutReceiverInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutReceiverInput, NotificationUncheckedUpdateWithoutReceiverInput>
    create: XOR<NotificationCreateWithoutReceiverInput, NotificationUncheckedCreateWithoutReceiverInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutReceiverInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutReceiverInput, NotificationUncheckedUpdateWithoutReceiverInput>
  }

  export type NotificationUpdateManyWithWhereWithoutReceiverInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutNotificationsInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: Enumerable<NotificationScalarWhereInput>
    OR?: Enumerable<NotificationScalarWhereInput>
    NOT?: Enumerable<NotificationScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    receiverId?: IntFilter | number
    emitterId?: IntFilter | number
    postId?: IntFilter | number
    commentId?: IntFilter | number
    message?: StringFilter | string
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutPostsInput>
  }

  export type PostScalarWhereInput = {
    AND?: Enumerable<PostScalarWhereInput>
    OR?: Enumerable<PostScalarWhereInput>
    NOT?: Enumerable<PostScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    title?: StringFilter | string
    body?: StringFilter | string
    excerpt?: StringFilter | string
    url?: StringFilter | string
    previewUrl?: StringFilter | string
    published?: BoolFilter | boolean
    allowComments?: BoolFilter | boolean
    authorId?: IntFilter | number
    likeCount?: IntFilter | number
    commentCount?: IntFilter | number
  }

  export type PostUpsertWithWhereUniqueWithoutLikedByInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutLikedByInput, PostUncheckedUpdateWithoutLikedByInput>
    create: XOR<PostCreateWithoutLikedByInput, PostUncheckedCreateWithoutLikedByInput>
  }

  export type PostUpdateWithWhereUniqueWithoutLikedByInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutLikedByInput, PostUncheckedUpdateWithoutLikedByInput>
  }

  export type PostUpdateManyWithWhereWithoutLikedByInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutLikesInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
  }

  export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutCommentsInput>
  }

  export type CommentScalarWhereInput = {
    AND?: Enumerable<CommentScalarWhereInput>
    OR?: Enumerable<CommentScalarWhereInput>
    NOT?: Enumerable<CommentScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    text?: StringFilter | string
    authorId?: IntFilter | number
    postId?: IntFilter | number
  }

  export type UserCreateWithoutTokenInput = {
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationCreateNestedManyWithoutReceiverInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    likes?: PostCreateNestedManyWithoutLikedByInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutTokenInput = {
    id?: number
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutReceiverInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
  }

  export type UserUpsertWithoutTokenInput = {
    update: XOR<UserUpdateWithoutTokenInput, UserUncheckedUpdateWithoutTokenInput>
    create: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
  }

  export type UserUpdateWithoutTokenInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutReceiverInput
    posts?: PostUpdateManyWithoutAuthorInput
    likes?: PostUpdateManyWithoutLikedByInput
    comments?: CommentUpdateManyWithoutAuthorInput
  }

  export type UserUncheckedUpdateWithoutTokenInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutReceiverInput
    posts?: PostUncheckedUpdateManyWithoutAuthorInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorInput
  }

  export type UserCreateWithoutNotificationsInput = {
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    likes?: PostCreateNestedManyWithoutLikedByInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateManyWithoutUserInput
    posts?: PostUpdateManyWithoutAuthorInput
    likes?: PostUpdateManyWithoutLikedByInput
    comments?: CommentUpdateManyWithoutAuthorInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUncheckedUpdateManyWithoutUserInput
    posts?: PostUncheckedUpdateManyWithoutAuthorInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorInput
  }

  export type UserCreateWithoutPostsInput = {
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutReceiverInput
    likes?: PostCreateNestedManyWithoutLikedByInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: number
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutReceiverInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserCreateWithoutLikesInput = {
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutReceiverInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutLikesInput = {
    id?: number
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutReceiverInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
  }

  export type CommentCreateWithoutPostInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    author: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutPostInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    authorId: number
  }

  export type CommentCreateOrConnectWithoutPostInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentCreateManyPostInputEnvelope = {
    data: Enumerable<CommentCreateManyPostInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateManyWithoutUserInput
    notifications?: NotificationUpdateManyWithoutReceiverInput
    likes?: PostUpdateManyWithoutLikedByInput
    comments?: CommentUpdateManyWithoutAuthorInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUncheckedUpdateManyWithoutUserInput
    notifications?: NotificationUncheckedUpdateManyWithoutReceiverInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorInput
  }

  export type UserUpsertWithWhereUniqueWithoutLikesInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
  }

  export type UserUpdateWithWhereUniqueWithoutLikesInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateManyWithWhereWithoutLikesInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutLikedByInput>
  }

  export type UserScalarWhereInput = {
    AND?: Enumerable<UserScalarWhereInput>
    OR?: Enumerable<UserScalarWhereInput>
    NOT?: Enumerable<UserScalarWhereInput>
    id?: IntFilter | number
    email?: StringFilter | string
    username?: StringFilter | string
    password?: StringFilter | string
    role?: EnumUserRoleFilter | UserRole
    certification?: EnumCertificationFilter | Certification
    url?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
  }

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutReceiverInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    likes?: PostCreateNestedManyWithoutLikedByInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: number
    email: string
    username: string
    password: string
    role?: UserRole
    certification?: Certification
    url?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    token?: TokenUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutReceiverInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type PostCreateWithoutCommentsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    likeCount?: number
    commentCount?: number
    author: UserCreateNestedOneWithoutPostsInput
    likedBy?: UserCreateNestedManyWithoutLikesInput
  }

  export type PostUncheckedCreateWithoutCommentsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    authorId: number
    likeCount?: number
    commentCount?: number
  }

  export type PostCreateOrConnectWithoutCommentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateManyWithoutUserInput
    notifications?: NotificationUpdateManyWithoutReceiverInput
    posts?: PostUpdateManyWithoutAuthorInput
    likes?: PostUpdateManyWithoutLikedByInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUncheckedUpdateManyWithoutUserInput
    notifications?: NotificationUncheckedUpdateManyWithoutReceiverInput
    posts?: PostUncheckedUpdateManyWithoutAuthorInput
  }

  export type PostUpsertWithoutCommentsInput = {
    update: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
  }

  export type PostUpdateWithoutCommentsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
    author?: UserUpdateOneRequiredWithoutPostsInput
    likedBy?: UserUpdateManyWithoutLikesInput
  }

  export type PostUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
  }

  export type TokenCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    valid?: boolean
    content: string
  }

  export type NotificationCreateManyReceiverInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    emitterId: number
    postId?: number
    commentId?: number
    message: string
  }

  export type PostCreateManyAuthorInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    body: string
    excerpt: string
    url?: string
    previewUrl?: string
    published?: boolean
    allowComments?: boolean
    likeCount?: number
    commentCount?: number
  }

  export type CommentCreateManyAuthorInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    postId: number
  }

  export type TokenUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
  }

  export type TokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
  }

  export type TokenUncheckedUpdateManyWithoutTokenInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valid?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationUpdateWithoutReceiverInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emitterId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationUncheckedUpdateWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emitterId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationUncheckedUpdateManyWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emitterId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
  }

  export type PostUpdateWithoutAuthorInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
    likedBy?: UserUpdateManyWithoutLikesInput
    comments?: CommentUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
  }

  export type PostUpdateWithoutLikedByInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
    author?: UserUpdateOneRequiredWithoutPostsInput
    comments?: CommentUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateWithoutLikedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostInput
  }

  export type PostUncheckedUpdateManyWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    previewUrl?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    allowComments?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    commentCount?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUpdateWithoutAuthorInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    post?: PostUpdateOneRequiredWithoutCommentsInput
  }

  export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUncheckedUpdateManyWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateManyPostInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    authorId: number
  }

  export type UserUpdateWithoutLikesInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateManyWithoutUserInput
    notifications?: NotificationUpdateManyWithoutReceiverInput
    posts?: PostUpdateManyWithoutAuthorInput
    comments?: CommentUpdateManyWithoutAuthorInput
  }

  export type UserUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUncheckedUpdateManyWithoutUserInput
    notifications?: NotificationUncheckedUpdateManyWithoutReceiverInput
    posts?: PostUncheckedUpdateManyWithoutAuthorInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorInput
  }

  export type UserUncheckedUpdateManyWithoutLikedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    certification?: EnumCertificationFieldUpdateOperationsInput | Certification
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutPostInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutCommentsInput
  }

  export type CommentUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}