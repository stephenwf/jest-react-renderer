import React from 'react';
import { Describe } from './components/Describe';
import { Test } from './components/Test';
import { Expect } from './components/Expect';
import { filterFuncName, shouldReturnBoolean } from './utility';

export default { title: 'Example' };

// Example function to be tested.
function add(a: number, b: number) {
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Invalid argument passed');
  }

  if (a === 10) {
    throw new Error('Not this number'); // This will be caught in coverage report
  }

  return a + b;
}

export const SumOfNumbers: React.FC = () => (
  <div>
    <h2>Sum of numbers example</h2>
    <p>Here's the source code for this particular example.</p>
    <code>
      <pre style={{ background: '#eee', padding: 15 }}>{add.toString()}</pre>
    </code>
    <p>You can start writing tests in React for this in your stories.</p>
    <code>
      <pre
        style={{ background: '#eee', padding: 15 }}
      >{`export const SumOfNumbers = () => (
  <Describe name="Adding sum of numbers">
    <Test name="When given a sum of 1 plus 1, the expected value is two, because maths">
      <Expect toEqual={2}>{add(1, 1)}</Expect>
      <Expect toEqual={2} toBeGreaterThan={1} toBeLessThan={3}>
        {add(1, 1)}
      </Expect>
    </Test>
    <Test name="However, the following values will throw:">
      <Expect toThrow>{() => add(NaN, 1)}</Expect>
      <Expect toThrow>{() => add(NaN, NaN)}</Expect>
      <Expect toThrow>{() => add(1, NaN)}</Expect>
    </Test>
  </Describe>
);`}</pre>
    </code>
    <h3>Output results:</h3>
    <Describe name="Adding sum of numbers">
      <Test name="When given a sum of 1 plus 1, the expected value is two, because maths">
        <Expect toEqual={2}>{add(1, 1)}</Expect>
        <Expect toEqual={2} toBeGreaterThan={1} toBeLessThan={3}>
          {add(1, 1)}
        </Expect>
      </Test>
      <Test name="However, the following values will throw:">
        <Expect toThrow>{() => add(NaN, 1)}</Expect>
        <Expect toThrow>{() => add(NaN, NaN)}</Expect>
        <Expect toThrow>{() => add(1, NaN)}</Expect>
      </Test>
    </Describe>
  </div>
);

export const VerboseExample: React.FC = () => (
  <Describe verbose name="Adding sum of numbers (with verbose prop)">
    <Test name="When given a sum of 1 plus 1, the expected value is two, because maths">
      <Expect toEqual={2}>{add(1, 1)}</Expect>
      <Expect toEqual={2} toBeGreaterThan={1} toBeLessThan={3}>
        {add(1, 1)}
      </Expect>
    </Test>
    <Test name="However, the following values will throw:">
      <Expect toThrow>{() => add(NaN, 1)}</Expect>
      <Expect toThrow>{() => add(NaN, NaN)}</Expect>
      <Expect toThrow>{() => add(1, NaN)}</Expect>
    </Test>
  </Describe>
);

export const FailingExample: React.FC = () => (
  <div>
    <Describe name="Failing example of a test">
      <Test name="This is marked as throwing, but will not throw.">
        <Expect toThrow>{() => add(1, 1)}</Expect>
      </Test>
    </Describe>
    Note: this test is not imported into the Jest test runner.
  </div>
);

export const FilterFuncName: React.FC = () => (
  <Describe name="filterFuncName">
    <Test name="It will remove functions">
      <Expect toEqual={'someCall(1, 2, 3);'}>
        {filterFuncName('function () { return someCall(1, 2, 3); }')}
      </Expect>
    </Test>
    <Test name="It will leave named functions unchanged">
      <Expect not toEqual={'someCall(1, 2, 3);'}>
        {filterFuncName('function someName() { return someCall(1, 2, 3); }')}
      </Expect>
    </Test>

    <Test name="It will ignore invalid input">
      <Expect toEqual={'SOME INVALID INPUT'}>
        {filterFuncName('SOME INVALID INPUT')}
      </Expect>
    </Test>
  </Describe>
);

export const ShouldReturnBoolean: React.FC = () => (
  <div>
    <h1>Should return boolean tests</h1>
    <p>This test is part of the library itself</p>
    <Describe name="shouldReturnBoolean">
      <Test name="should be false when using toThrow property">
        <Expect toEqual={false}>{shouldReturnBoolean('toThrow', false)}</Expect>
      </Test>
      <Test name="should be true for all other properties">
        {['toEqual', 'toBeCloseTo'].map(value => (
          <Expect toEqual={true} variant={value} key={value}>
            {shouldReturnBoolean(value, 'something')}
          </Expect>
        ))}
      </Test>
    </Describe>
  </div>
);
