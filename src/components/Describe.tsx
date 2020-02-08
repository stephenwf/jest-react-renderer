import React, { useMemo } from 'react';
import { jestIsActive } from '../utility';
import { Test } from './Test';
import { DescribeContext } from './DescribeContext';

export const Describe: React.FC<{
  name: string;
  verbose?: boolean;
}> = ({ name, children, verbose = false }) => {
  // The describe context allows <Test /> components to inject a test into a
  // this describe block. Since the `describe()` calls are immediate and non
  // async, we must emit the `describe()` once we have the expected number of
  // tests from the counter above.
  const describeContext = useMemo(() => {
    const listOfJestTestFunctions: Array<{
      name: string;
      testBodyFunction: (...args: any[]) => any;
    }> = [];
    let expectedNumberOfJestTestsInDescribe = 0;
    let numberOfJestTestsFound = 0;

    // Find number of direct children in node that are <Test /> functions.
    // This will create an expected subtotal that will be used to create the
    // Describe block, once rendered.
    React.Children.forEach(children, child => {
      // @ts-ignore
      if (child.type === Test) {
        expectedNumberOfJestTestsInDescribe++;
      }
    });

    // This is the function available to the <Test /> components.
    const push = (
      nameOfTest: string,
      testBodyFunction: (...args: any[]) => any
    ) => {
      // If we're in the browser, exit early.
      if (!jestIsActive) {
        return;
      }
      // Every time <Test /> calls this push method we increment.
      numberOfJestTestsFound++;

      // First we push the item onto the list.
      listOfJestTestFunctions.push({
        name: nameOfTest,
        testBodyFunction,
      });

      // Emit once we have the expected number of tests.
      if (numberOfJestTestsFound === expectedNumberOfJestTestsInDescribe) {
        // This is a normal describe call, looping through the test functions.
        // This will be read correctly by Jest when you render the React
        // component as static HTML.
        describe(name, () => {
          listOfJestTestFunctions.forEach(fn => {
            test(fn.name, fn.testBodyFunction);
          });
        });
      }
    };

    // The return of the describe context is our push function above and
    // whether or not the context is active (i.e. command line or browser.)
    return {
      push,
      active: jestIsActive,
      verbose,
    };
  }, [children, name, verbose]);

  return (
    <DescribeContext.Provider value={describeContext}>
      <section className="describe">
        <h2 className="describe__name">{name}</h2>
        <div className="describe__tests">{children}</div>
      </section>
    </DescribeContext.Provider>
  );
};
