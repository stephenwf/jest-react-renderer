import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TestContext } from './TestContext';

import { getQueriesForElement, queries } from '@testing-library/dom';
import { BoundFunctions } from '@testing-library/dom/types/get-queries-for-element';

export function ReactComponent(props: {
  render: any;
  children: (
    result: BoundFunctions<typeof queries>,
    fire: typeof fireEvent
  ) => any;
}) {
  const preview = useRef();

  const [inner, setInner] = useState();
  const [error, setError] = useState();
  const { active, push } = useContext(TestContext);

  if (active) {
    push(async () => {
      await cleanup();
      const rendered = render(props.render);

      return require('react-dom/server').renderToStaticMarkup(
        await props.children(rendered, fireEvent)
      );
    });
  }

  useEffect(() => {
    if (!active) {
      setError(false);
      const result = props.children(
        getQueriesForElement(preview.current as any) as any,
        fireEvent
      );

      Promise.resolve(result)
        .then(r => setInner(r as any))
        .catch(err => setError(err));
    }
  }, [active, props]);

  if (active) {
    return <React.Fragment />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div
        style={{
          padding: 10,
          background: '#eee',
          margin: '10px 0',
          borderRadius: 3,
        }}
        ref={preview as any}
      >
        {props.render}
      </div>
      {inner}
    </div>
  );
}
