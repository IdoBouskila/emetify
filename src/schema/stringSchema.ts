import initializeParsers from './utils/initializeParsers';
import { ensureString, ensureStringLength } from '../utils/validations';

function stringSchema() {
    const { parse, registerParser } = initializeParsers<string>(ensureString);

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
};

export default stringSchema;
