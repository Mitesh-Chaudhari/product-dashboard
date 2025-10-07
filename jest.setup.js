import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import React from 'react';

// -------------------- Mock debounce --------------------
jest.mock('lodash.debounce', () => (fn) => {
  fn.cancel = jest.fn();
  return fn;
});

// -------------------- Suppress console errors/warnings --------------------
const originalError = console.error;
console.error = (...args) => {
  const msg = args[0] || '';
  if (
    /Warning.*not wrapped in act/.test(msg) || // React act() warning
    /An empty string \(""\) was passed to the src attribute/.test(msg) // empty src
  ) {
    return; // ignore these
  }
  originalError(...args);
};

// -------------------- Mock scrollIntoView --------------------
window.HTMLElement.prototype.scrollIntoView = function () {};

// -------------------- Polyfill TextEncoder/TextDecoder --------------------
import { TextEncoder, TextDecoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
