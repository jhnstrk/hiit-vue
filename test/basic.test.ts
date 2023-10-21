// FizzBuzz.test.ts
/// <reference types="jest" />

import { Utils } from '../src/utils';

test('Utils test', () => {
  expect(true).toBe(true);
  expect(Utils.toTest('Hello')).toBe('Hello World');
});
