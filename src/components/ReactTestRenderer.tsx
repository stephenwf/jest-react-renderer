import renderer from 'react-test-renderer';
import { useMemo } from 'react';
import React from 'react';

export function ReactTestRenderer({
  create,
  children,
}: {
  create: any;
  children: (component: renderer.ReactTestRenderer) => any;
}) {
  const created = useMemo(() => renderer.create(create), [create]);

  return children(created);
}
