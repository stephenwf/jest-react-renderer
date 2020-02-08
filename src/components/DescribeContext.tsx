import React from 'react';

export const DescribeContext = React.createContext<{
  push: (name: string, testBodyFunction: (...args: any[]) => any) => void;
  active: boolean;
  verbose: boolean;
}>({
  push() {},
  active: false,
  verbose: false,
});
