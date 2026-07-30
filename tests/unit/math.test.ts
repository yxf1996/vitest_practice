import { describe, it, expect } from 'vitest'
import { add, subtract, multiply, divide, factorial, isPrime } from '../../src/utils/math'

describe('Math utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('should handle negative numbers', () => {
      expect(add(-1, -2)).toBe(-3)
    })

    it('should handle zero', () => {
      expect(add(5, 0)).toBe(5)
    })
  })

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe(2)
    })

    it('should handle negative results', () => {
      expect(subtract(3, 5)).toBe(-2)
    })
  })

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(3, 4)).toBe(12)
    })

    it('should handle zero', () => {
      expect(multiply(5, 0)).toBe(0)
    })
  })

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5)
    })

    it('should handle decimal results', () => {
      expect(divide(7, 2)).toBe(3.5)
    })

    it('should throw on division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero')
    })
  })

  describe('factorial', () => {
    it('should calculate factorial of 0', () => {
      expect(factorial(0)).toBe(1)
    })

    it('should calculate factorial of 1', () => {
      expect(factorial(1)).toBe(1)
    })

    it('should calculate factorial of 5', () => {
      expect(factorial(5)).toBe(120)
    })

    it('should throw for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Negative numbers not supported')
    })
  })

  describe('isPrime', () => {
    it('should return false for numbers less than 2', () => {
      expect(isPrime(0)).toBe(false)
      expect(isPrime(1)).toBe(false)
    })

    it('should return true for 2', () => {
      expect(isPrime(2)).toBe(true)
    })

    it('should return true for prime numbers', () => {
      expect(isPrime(3)).toBe(true)
      expect(isPrime(5)).toBe(true)
      expect(isPrime(7)).toBe(true)
      expect(isPrime(11)).toBe(true)
    })

    it('should return false for non-prime numbers', () => {
      expect(isPrime(4)).toBe(false)
      expect(isPrime(6)).toBe(false)
      expect(isPrime(9)).toBe(false)
      expect(isPrime(12)).toBe(false)
    })
  })
})
