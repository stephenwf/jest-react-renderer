import React from 'react';
import expect, { Matchers } from 'expect';
import { filterFuncName, shouldReturnBoolean, useIsVerbose } from '../utility';
import { Assertion } from './Assertion';

type MatcherKeys = keyof Matchers<any>;

type ExpectProps = {
  [name in MatcherKeys]?: any;
};

export const Expect: React.FC<ExpectProps & {
  not?: boolean;
  variant?: string;
}> = ({ not, variant, children, ...props }) => {
  const verbose = useIsVerbose();
  const expectKeys = Object.keys(props);
  const expectFunction = not ? expect(children).not : expect(children);

  const assertionList = expectKeys.map(key => {
    const value = shouldReturnBoolean(key, (props as any)[key])
      ? (props as any)[key]
      : undefined;

    return (
      <Assertion
        verbose={verbose}
        key={key}
        method={key}
        expectFunction={expectFunction}
        value={value}
      />
    );
  });

  if (!verbose) {
    return <>{assertionList}</>;
  }

  return (
    <div className="expect">
      {not ? 'Do not expect ' : 'Expect '}
      <strong>
        {typeof children === 'function'
          ? filterFuncName(children.toString())
          : ((children as any) || '').toString()}
        {variant ? ` (variant: ${variant})` : ''}
      </strong>
      <ul className="expect__list">{assertionList}</ul>
    </div>
  );
};
