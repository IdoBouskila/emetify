import { throwSizeError, throwTypeError } from './validationExceptions';

export const ensureObject = (value: unknown): Record<string, any> => {
    if (typeof value === "object" && ! Array.isArray(value) && value !== null) {
        return value;
    }
    
    return throwTypeError(value, 'object');
};

export const ensureNumber = (value: unknown): number => {
	if (typeof value !== 'number') {
		return throwTypeError(value, 'number');
	}

	return value;
};

export const ensureString = (value: unknown): string => {
	if (typeof value !== 'string') {
		return throwTypeError(value, 'string');
	}

	return value;
};

export const ensureStringLength = ({ value, requiredLength, validationType }: {
	value: string;
	requiredLength: number;
	validationType: 'min' | 'max';
}) => {
	const isMinimum = validationType === 'min';

	const isValidLength = isMinimum
		? requiredLength <= value.length
		: requiredLength >= value.length;
		
	if (! isValidLength) {
		throwSizeError({
			type: 'string',
			validationType,
			requiredLength,
		});
	}

	return value;
};

export const ensureNumberSize = ({ value, requiredSize, validationType }: {
	value: number;
	requiredSize: number;
	validationType: 'min' | 'max';
}) => {
	const isMinimum = validationType === 'min';

	const isValidLength = isMinimum
		? requiredSize <= value
		: requiredSize >= value;
		
	if (! isValidLength) {
		throwSizeError({
			type: 'number',
			validationType,
			requiredLength: requiredSize,
		});
	}

	return value;
};
