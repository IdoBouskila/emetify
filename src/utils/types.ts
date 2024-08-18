export type ReadableObjectType<T> = T extends object ? {
    [K in keyof T]: T[K]
} : T;

export type AnySchema<TReturn> = {
    parse: (value: unknown) => TReturn;
} & Record<string, any>;
