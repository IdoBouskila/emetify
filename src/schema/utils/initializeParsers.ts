type RestParsers<T> = (value: T) => T;
type FirstParser<T> = (value: unknown) => T;

const initializeParsers = <T>(initialParser: FirstParser<T>) => {
	const parserFunctions = new Set<RestParsers<T>>([]);

	const parse = (value: unknown) => {
		let validatedValue = initialParser(value);

		for(const parser of parserFunctions) {
			validatedValue = parser(validatedValue);
		};

		return validatedValue;
	};

	const registerParser = (parser: RestParsers<T>) => parserFunctions.add(parser);

	return {
		parse,
		registerParser,
	};
}

export default initializeParsers;
