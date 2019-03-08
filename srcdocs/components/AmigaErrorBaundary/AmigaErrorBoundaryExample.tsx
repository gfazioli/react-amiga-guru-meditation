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

  return (
    <AmigaErrorBoundary>
      <DocsExample>
        <h1>AmigaErrorBoundary Example</h1>

        <Button />
      </DocsExample>
    </AmigaErrorBoundary>
  );
}
