import { calculateAge } from './date';

describe('calculateAge', () => {
  const mockDate = new Date(2024, 2, 15); // March 15, 2024

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should calculate age correctly', () => {
    expect(calculateAge('1990-01-01')).toBe(34);
    expect(calculateAge('2000-12-31')).toBe(23);
  });

  it("should handle birthdays that haven't occurred this year", () => {
    expect(calculateAge('1990-6-31')).toBe(33);
  });

  it('should return null for invalid dates', () => {
    expect(calculateAge('invalid-date')).toBeNull();
    expect(calculateAge(undefined)).toBeNull();
  });
});
