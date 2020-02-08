import React, { useContext } from 'react';
import { TestContext } from './TestContext';

export const Assertion: React.FC<{
  expectFunction: any;
  value: any;
  method: any;
  verbose?: boolean;
}> = ({ expectFunction, method, value, verbose = false }) => {
  const func = expectFunction[method];
  const { active, push } = useContext(TestContext);

  if (!func) {
    return <>`missing func ${method}`</>;
  }

  const functionWithValue = () =>
    (func as (actual: any) => { pass: boolean; message: string })(value as any);

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
