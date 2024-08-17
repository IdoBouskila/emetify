/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ensureNumber, ensureString, ensureNumberSize, ensureStringLength } from './validations';

const i = {
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
