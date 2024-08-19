import e from '../../index';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('Object Schema', () => {
	it('should parse an object', () => {
		// Arrange
		const schema = e.object({
			name: e.string(),
			age: e.number(),
		});

		// Assert - Valid & Type Assertion
		expect(schema.parse({ name: 'John', age: 25 })).toEqual({
			name: 'John',
			age: 25,
		});
        
		expectTypeOf(schema.parse({ name: 'John', age: 25 })).toEqualTypeOf<{
			name: string;
			age: number;
		}>();

		// Assert - Invalid
		expect(() =>
			schema.parse({ name: 'John', age: 'some-string' }),
		).toThrowError(
			JSON.stringify({
				code: 'invalid_type',
				expected: 'number',
				message: 'Expected number, received string',
			}),
		);
	});
});
