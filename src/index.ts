/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/prefer-reduce-type-parameter */
import type { ReadableObjectType } from './utils/types';
import { ensureNumber, ensureString, ensureNumberSize, ensureStringLength, ensureObject } from './validations';

type ZodAny<TReturn> = {
	parse: (value: unknown) => TReturn;
} & Record<string, any>;

const initilizeZodType = <T>(initialParser: (value: unknown) => T) => {
	const parserFunctions = new Set<(value: unknown) => T>([initialParser]);

	const parse = (value: unknown) => {
		let validatedValue: T = value as T;

		for (const parser of parserFunctions) {
			validatedValue = parser(value);
		}

		return validatedValue;
	};

	const registerParser = (parser: (value: unknown) => T) => parserFunctions.add(parser);
	
	return {
		parse,
		registerParser,
	};

}

const e = {
	object: <T extends Record<string, ZodAny<any>>>(schema: T) => {
		type ParsedSchema = ReadableObjectType<{
			[K in keyof T]: ReturnType<T[K]['parse']>
		}>;

		const parseAndValidateObjectSchema = (value: unknown) => {
			const parsedValue = ensureObject(value);

			return (Object.keys(schema) as Array<keyof typeof schema>).reduce((acc, key) => {
				acc[key] = schema[key]?.parse(parsedValue[key as string]);
				
				return acc;
			}, {} as ParsedSchema);
		};

		const { parse } = initilizeZodType<ParsedSchema>(parseAndValidateObjectSchema);

		return {
			parse,
		}
	},
	number: function () {
		const { parse, registerParser } = initilizeZodType<number>(ensureNumber);

		return {
			parse,
			min: function (requiredSize: number) {
				registerParser((value: unknown) => ensureNumberSize({
					requiredSize,
					value: value as number,
					validationType: 'min',
				}));

				return this;
			},
			max: function (requiredSize: number) {
				registerParser((value: unknown) => ensureNumberSize({
					requiredSize,
					value: value as number,
					validationType: 'max',
				}));

				return this;
			},
		};
	},
	string: function () {
		const { parse, registerParser } = initilizeZodType<string>(ensureString);

		return {
			parse,
			min: function (requiredLength: number) {
				registerParser((value: unknown) => ensureStringLength({
					requiredLength,
					value: value as string,
					validationType: 'min',
				}));

				return this;
			},
			max: function (requiredLength: number) {
				registerParser((value: unknown) => ensureStringLength({
					requiredLength,
					value: value as string,
					validationType: 'max',
				}));

				return this;
			},
		};
	},
};

export default e;
