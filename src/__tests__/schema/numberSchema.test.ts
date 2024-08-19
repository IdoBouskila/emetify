import e from '../../index';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('Numbers', () => {
    it('should parse a number', () => {
        // Arrange
        const schema = e.number();

        // Assert - Valid & Type Assertion
        expect(schema.parse(123)).toBe(123);
        expectTypeOf(schema.parse(123)).toEqualTypeOf<number>();

        // Assert - Invalid
        expect(() => schema.parse('123')).toThrowError(JSON.stringify({
            code: 'invalid_type',
            expected: 'number',
            message: 'Expected number, received string',
        }));
    });

    it('should parse a number with min value', () => {
        // Arrange
        const schema = e.number().min(3);

        // Assert - Valid & Type Assertion
        expect(schema.parse(123)).toBe(123);
        expectTypeOf(schema.parse(123)).toEqualTypeOf<number>();

        // Assert - Invalid
        expect(() => schema.parse(2)).toThrowError(JSON.stringify({
            code: 'too_small',
            message: 'Number must be greater than or equal to 3',
        }));
    });

    it('should parse a number with max value', () => {
        // Arrange
        const schema = e.number().max(5);

        // Assert - Valid & Type Assertion
        expect(schema.parse(3)).toBe(3);
        expectTypeOf(schema.parse(3)).toEqualTypeOf<number>();

        // Assert - Invalid
        expect(() => schema.parse(6)).toThrowError(JSON.stringify({
            code: 'too_big',
            message: 'Number must be less than or equal to 5',
        }));
    });

    it('should parse a number with both min and max value', () => {
        // Arrange
        const schema = e.number().min(3).max(5);

        // Assert - Valid & Type Assertion
        expect(schema.parse(4)).toBe(4);
        expectTypeOf(schema.parse(4)).toEqualTypeOf<number>();

        // Assert - Invalid
        expect(() => schema.parse(6)).toThrowError(JSON.stringify({
            code: 'too_big',
            message: 'Number must be less than or equal to 5',
        }));
    });
});
