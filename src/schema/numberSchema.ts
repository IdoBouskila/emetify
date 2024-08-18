import initializeParsers from './utils/initializeParsers';
import { ensureNumber, ensureNumberSize } from '../utils/validations';

function numberSchema() {
    const { parse, registerParser } = initializeParsers<number>(ensureNumber);

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
}

export default numberSchema;
