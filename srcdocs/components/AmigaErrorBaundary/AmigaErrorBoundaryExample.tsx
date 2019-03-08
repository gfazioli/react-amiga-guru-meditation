import * as React from "react";
import {useState} from "react";

import AmigaErrorBoundary from "../../../src/components/AmigaErrorBoundary";
import {DocsExample} from "../../theme/theme";

function Button() {
  const [value, setValue] = useState(false);

  function onClick() {
    setValue(true);
  }

  if (value) {
    throw new Error("I crashed!");
  }

  return <button onClick={onClick}>Create an exception</button>;
}

export function AmigaErrorBoundaryExample() {

  const [debug, setDebug] = useState(false);

  return (
    <AmigaErrorBoundary debug={debug}>
      <DocsExample>
        <h1>AmigaErrorBoundary Example</h1>

        <button onClick={() => setDebug(true)}>Debug</button>

        <Button />
      </DocsExample>
    </AmigaErrorBoundary>
  );
}
