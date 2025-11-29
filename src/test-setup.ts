import { jest } from '@jest/globals'

(global as any).game = {
  settings: {
    register: jest.fn(),
    get: jest.fn(),
    set: jest.fn()
  },
  user: {
    isGM: true
  }
};

(global as any).ui = {
  notifications: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
};

(global as any).Hooks = {
  once: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  call: jest.fn(),
  callAll: jest.fn()
};

(global as any).CONFIG = {};

(global as any).foundry = {
  utils: {
    mergeObject: jest.fn()
  }
};
