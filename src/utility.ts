import { ReactElement, useContext } from 'react';
import { DescribeContext } from './components/DescribeContext';
import { TestContext } from './components/TestContext';

// @ts-ignore
export const jestIsActive = typeof global.it === 'function';

export const useIsVerbose = () => {
  const describeCtx = useContext(DescribeContext);
  const testCtx = useContext(TestContext);

  return describeCtx.verbose || testCtx.verbose;
};

export function shouldReturnBoolean(key: any, value: any) {
  if (key === 'toThrow' || key === 'toBeUndefined') {
    return false;
  }

  return true;
}

export function filterFuncName(name: string) {
  // Unwrap anonymous function with single return (compiled arrow)
  if (name.match(/function \(\) {\s+return /)) {
    const [_$, ...parts] = name.split('return');
    return parts
      .join('')
      .slice(0, -1)
      .trim();
  }
  return name;
}

export function runTest(element: ReactElement) {
  return runTests([element]);
}

export function runTests(elements: ReactElement[]) {
  if (!jestIsActive) return;
  let error: any;
  try {
    for (let element of elements) {
      require('react-dom/server').renderToStaticMarkup(element);
    }
  } catch (err) {
    error = err;
  }

  describe('Dynamic JSX tests', () => {
    test('All Dynamic tests loaded successfully', () => {
      expect(error).toBeUndefined();
    });
  });
}

export function parseError(errorInfo: { componentStack: string }) {
  return errorInfo.componentStack
    .split('\n')
    .filter(
      (s: string) =>
        !s.match(/in Call/) &&
        !s.match(/in ErrorBoundary/) &&
        !s.match(/in UseErrorBoundaryWrapper/) &&
        !s.match(/in Assertion/) &&
        !s.match(/in article \(at Test\.tsx/) &&
        !s.match(/in section \(at Describe\.tsx/)
    )
    .join('\n');
}
