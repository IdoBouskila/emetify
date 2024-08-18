const initializeParsers = <T>(initialParser: (value: unknown) => T) => {
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

export default initializeParsers;
