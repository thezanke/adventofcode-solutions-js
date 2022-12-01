import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { gcd } from './gcd.ts';

Deno.test('gcd', () => {
  assertEquals(gcd(20, 30), 10);
});

Deno.test('gcd 3 numbers', () => {
  assertEquals(gcd(gcd(203, 91), 77), 7);
});
