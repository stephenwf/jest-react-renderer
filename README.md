# jest-react-renderer
Write Jest tests using JSX and React, render them in the DOM and on the CLI. Test as you write your React components in the browser.  

```
yarn add jest-react-renderer
```

Example:
```jsx
// sum.test.js
import React from 'react';
import { Test, Expect, runTest } from 'jest-react-renderer';

runTest(
  <Test name="adds 1 + 2 to equal 3">
    <Expect toBe={3}>{ sum(1, 2) }</Expect>
  </Test>
);
```

Create a test file not tracked by Jest:
```jsx
import { Test, Expect } from 'jest-react-renderer';
import { sum } from './sum';

export const MyTestFile = () => (
  <Test name="adds 1 + 2 to equal 3">
    <Expect toBe={3}>{ sum(1, 2) }</Expect>
  </Test>
);
```

Then add them to jest from a `file.test.js`.
```
import { runTests } from 'jest-react-renderer';
import { MyTestFile } from './my-test-file';

runTests([
  <MyTestFile />
]);
```

This can be dropped straight into something like Storybook to have your tests alongside your documentation and examples.

Internally this uses the `expect` library from Jest, so you can extend is using `expect.extend()` for other extensions.
