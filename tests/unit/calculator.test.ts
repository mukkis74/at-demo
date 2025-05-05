import { add, subtract, multiply, divide } from '../../src/utils/calculator';

describe('Calculator Unit Tests', () => {
  // Unit test with @unit tag for categorization
  test('should add two numbers correctly', () => {
    // Arrange
    const a = 5;
    const b = 3;
    const expected = 8;
    
    // Act
    const result = add(a, b);
    
    // Assert
    expect(result).toBe(expected);
  });

  test('should subtract two numbers correctly', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(3, 5)).toBe(-2);
  });

  test('should multiply two numbers correctly', () => {
    expect(multiply(5, 3)).toBe(15);
    expect(multiply(5, 0)).toBe(0);
  });

  test('should divide two numbers correctly', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(5, 2)).toBe(2.5);
  });

  test('should throw error when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
  });
});