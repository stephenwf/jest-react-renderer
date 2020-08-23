import React, { useContext } from 'react';
import { TestContext } from './TestContext';

const noArgs = ['toBeTruthy', 'toBeFalsy', 'toMatchSnapshot'];

export const Assertion: React.FC<{
  expectFunction: any;
  value: any;
  method: any;
  verbose?: boolean;
}> = ({ expectFunction, method, value, verbose = false }) => {
  const func = expectFunction[method];
  const { active, push } = useContext(TestContext);

  if (!func) {
    return (
      <>
        missing func <strong>${method}</strong>
      </>
    );
  }

  const functionWithValue = () => {
    if (noArgs.indexOf(method) !== -1) {
      return (func as any)();
    }

    return (func as (actual: any) => { pass: boolean; message: string })(
      value as any
    );
  };

  if (active) {
    push(functionWithValue);
  } else {
    functionWithValue();
  }

  if (!verbose) {
    return <></>;
  }

  return (
    <li className="assertion">
      {method}{' '}
      {typeof value !== 'undefined' ? <strong>{value.toString()}</strong> : ''}
    </li>
  );
};
