import e from '../../index';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('String Schema', () => {
    it('should parse a string', () => {
        // Arrange
        const schema = e.string();

        // Assert - Valid & Type Assertion
        expect(schema.parse('John')).toBe('John');
        expectTypeOf(schema.parse('John')).toEqualTypeOf<string>();

        // Assert - Invalid
        expect(() => schema.parse(123)).toThrowError(JSON.stringify({
            code: 'invalid_type',
            expected: 'string',
            message: 'Expected string, received number',
        }));
    });

    it('should parse a string with min length', () => {
        // Arrange
        const schema = e.string().min(3);

        // Assert - Valid & Type Assertion
        expect(schema.parse('John')).toBe('John');
        expectTypeOf(schema.parse('John')).toEqualTypeOf<string>();

        // Assert - Invalid
        expect(() => schema.parse('Jo')).toThrowError(JSON.stringify({
            code: 'too_small',
            message: 'String must contain at least 3 character(s)',
        }));
    });

    it('should parse a string with max length', () => {
        // Arrange
        const schema = e.string().max(5);

        // Assert - Valid & Type Assertion
        expect(schema.parse('John')).toBe('John');
        expectTypeOf(schema.parse('John')).toEqualTypeOf<string>();

        // Assert - Invalid
        expect(() => schema.parse('John Doe')).toThrowError(JSON.stringify({
            code: 'too_big',
            message: 'String must contain at most 5 character(s)',
        }));
    });

    it('should parse a string with both min and max length', () => {
        // Arrange
        const schema = e.string().min(3).max(5);

        // Assert - Valid & Type Assertion
        expect(schema.parse('John')).toBe('John');
        expectTypeOf(schema.parse('John')).toEqualTypeOf<string>();

        // Assert - Invalid
        expect(() => schema.parse('John Doe')).toThrowError(JSON.stringify({
            code: 'too_big',
            message: 'String must contain at most 5 character(s)',
        }));
    });
});
