import { ensureObject } from '../utils/validations';
import initializeParsers from './utils/initializeParsers';
import type { AnySchema, ReadableObjectType } from '../utils/types';

type SchemaProperties = Record<string, AnySchema<any>>;

type ParsedObject<T extends SchemaProperties> = ReadableObjectType<{
    [K in keyof T]: ReturnType<T[K]['parse']>;
}>;

function objectSchema<T extends SchemaProperties>(schema: T) {
    const parseObject = (value: unknown) => {
        const parsedValue = ensureObject(value);

        return (Object.keys(schema) as Array<keyof typeof schema>).reduce((acc, key) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            acc[key] = schema[key]?.parse(parsedValue[key as string]);
            
            return acc;
        }, {} as ParsedObject<T>); // eslint-disable-line @typescript-eslint/prefer-reduce-type-parameter
    };

    const { parse } = initializeParsers<ParsedObject<T>>(parseObject);

    return {
        parse,
    }
}

export default objectSchema;
