/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { runTests } from './utility';
import {
  FilterFuncName,
  SumOfNumbers,
  ShouldReturnBoolean,
  TestRenderer,
} from './Example.stories';

// This could be a jest loader, which _could_ be configured to import all .stories files
runTests([
  <SumOfNumbers />,
  <FilterFuncName />,
  <ShouldReturnBoolean />,
  <TestRenderer />,
]);
