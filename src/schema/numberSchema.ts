import initializeParsers from './utils/initializeParsers';
import { ensureNumber, ensureNumberSize } from '../utils/validations';

function numberSchema() {
    const { parse, safeParse, registerParser } = initializeParsers<number>(ensureNumber);

    return {
        parse,
        safeParse,
        min: function (requiredSize: number) {
            registerParser((value) => ensureNumberSize({
                requiredSize,
                value: value,
                validationType: 'min',
            }));

            return this;
        },
        max: function (requiredSize: number) {
            registerParser((value) => ensureNumberSize({
                requiredSize,
                value: value,
                validationType: 'max',
            }));

            return this;
        },
    };
}

export default numberSchema;
