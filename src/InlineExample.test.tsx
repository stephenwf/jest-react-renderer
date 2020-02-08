import React from 'react';
import { runTest } from './utility';
import { Test } from './components/Test';
import { Expect } from './components/Expect';

runTest(
  <Test name="Inline example test">
    <Expect toEqual={2}>{1 + 1}</Expect>
  </Test>
);
