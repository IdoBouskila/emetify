import initializeParsers from './utils/initializeParsers';
import { ensureString, ensureStringLength } from '../utils/validations';

function stringSchema() {
    const { parse, registerParser } = initializeParsers<string>(ensureString);

    return {
        parse,
        min: function (requiredLength: number) {
            registerParser((value) => ensureStringLength({
                value: value,
                requiredLength,
                validationType: 'min',
            }));

            return this;
        },
        max: function (requiredLength: number) {
            registerParser((value) => ensureStringLength({
                value: value,
                requiredLength,
                validationType: 'max',
            }));

            return this;
        },
    };
};

export default stringSchema;
