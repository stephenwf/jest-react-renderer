import React, { useContext, useMemo } from 'react';
import { useErrorBoundary } from 'use-error-boundary';
import { DescribeContext } from './DescribeContext';
import { jestIsActive, parseError } from '../utility';
import { TestContext } from './TestContext';

export const Test: React.FC<{ name: string; verbose?: boolean }> = ({
  name,
  verbose = false,
  children,
}) => {
  const describeCtx = useContext(DescribeContext);
  const testCtx = useContext(TestContext);
  const { ErrorBoundary, error, errorInfo } = useErrorBoundary();

  const testContext = useMemo(() => {
    const listOfFuncs: Function[] = [];

    if (jestIsActive) {
      const testFunc = (cb: any) => {
        Promise.all(listOfFuncs.map(func => func())).then(() => cb());
      };

      if (testCtx.active) {
        testCtx.push(() => {
          test(name, testFunc);
        });
      } else if (describeCtx.active) {
        describeCtx.push(name, testFunc);
      } else {
        test(name, testFunc);
      }
    }
    const push = (func: () => any) => {
      listOfFuncs.push(func);
    };
    return {
      push,
      active: jestIsActive,
      verbose,
    };
  }, [describeCtx, name, testCtx, verbose]);

  return (
    <TestContext.Provider value={testContext}>
      <article className={`test ${error ? 'test--error' : ''}`}>
        <h4 className="test__name">{name}</h4>
        {error ? (
          <div className="test__error">
            <code>
              <pre>{error.toString()}</pre>
              <pre>{parseError(errorInfo)}</pre>
            </code>
          </div>
        ) : (
          <ErrorBoundary>{children}</ErrorBoundary>
        )}
      </article>
    </TestContext.Provider>
  );
};
