import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extiende las funcionalidades de expect con las de jest-dom
expect.extend(matchers);

// Limpia el DOM después de cada test
afterEach(() => {
    cleanup();
});