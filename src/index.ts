/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ReadableObjectType } from './utils/types';
import { ensureNumber, ensureString, ensureNumberSize, ensureStringLength, ensureObject } from './validations';

type AnySchemaObject<TReturn> = {
	parse: (value: unknown) => TReturn;
} & Record<string, any>;

const i = {
	object: <T extends Record<string, AnySchemaObject<any>>>(schema: T) => {
		type ParsedSchema = ReadableObjectType<{
			[K in keyof T]: ReturnType<T[K]['parse']>
		}>;

		return {
			parse: (value: unknown) => {
				const parsedValue = ensureObject(value);

				return (Object.keys(schema) as Array<keyof typeof schema>).reduce((acc, key) => {
					acc[key] = schema[key]?.parse(parsedValue[key as string]);
					
					return acc;
					// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
				}, {} as ParsedSchema)
			}
		}
	},
	number: function () {
		const parsers = new Set<(value: unknown) => number>();

		parsers.add((value: unknown) => ensureNumber(value));

		const parse = (value: unknown) => {
			let parsedValue: number = 0;

			for (const parser of parsers) {
				parsedValue = parser(value);
			}

			return parsedValue;
		};

		return {
			parse,
			min: function (requiredSize: number) {
				parsers.add((value: unknown) => ensureNumberSize({
					requiredSize,
					value: value as number,
					validationType: 'min',
				}));

				return this;
			},
			max: function (requiredSize: number) {
				parsers.add((value: unknown) => ensureNumberSize({
					requiredSize,
					value: value as number,
					validationType: 'max',
				}));

				return this;
			},
		};
	},
	string: function () {
		const parsers = new Set<(value: unknown) => string>();

		parsers.add((value: unknown) => ensureString(value));

		const parse = (value: unknown) => {
			let parsedValue: string = '';

			for (const parser of parsers) {
				parsedValue = parser(value);
			}

			return parsedValue;
		};

		return {
			parse,
			min: function (requiredLength: number) {
				parsers.add((value: unknown) => ensureStringLength({
					requiredLength,
					value: value as string,
					validationType: 'min',
				}));

				return this;
			},
			max: function (requiredLength: number) {
				parsers.add((value: unknown) => ensureStringLength({
					requiredLength,
					value: value as string,
					validationType: 'max',
				}));

				return this;
			},
		};
	},
};

export default i;
