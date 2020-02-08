import { createContext } from 'react';

export const TestContext = createContext<{
  push: (func: () => any) => void;
  active: boolean;
  verbose: boolean;
}>({
  push() {},
  active: false,
  verbose: false,
});
