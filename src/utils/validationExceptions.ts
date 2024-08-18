export const throwSizeError = ({ type, validationType, requiredLength }: {
	requiredLength: number;
	type: 'string' | 'number';
	validationType: 'min' | 'max';
}) => {
	const isMinimum = validationType === 'min';

	const errorMessage =
		type === 'number'
			? `Number must be ${ isMinimum ? 'greater' : 'less' } than or equal to ${ String(requiredLength) }`
			: `String must contain at ${ isMinimum ? 'least' : 'most' } ${ String(requiredLength) } character(s)`;

	const error = {
		code: isMinimum ? 'too_small' : 'too_big',
		message: errorMessage,
	};
	
	throw new Error(JSON.stringify(error));
}

export const throwTypeError = (value: unknown, expectedType: string) => {
	const error = {
		code: 'invalid_type',
		expected: expectedType,
		message: `Expected ${expectedType}, received ${ typeof value }`,
	};

	throw new Error(JSON.stringify(error));
};
