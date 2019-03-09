import * as React from "react";
import { useState } from "react";

import AmigaErrorBoundary from "../../../src/components/AmigaErrorBoundary";
import { DocsExample } from "../../theme/theme";

export function AmigaErrorBoundaryExample() {
  const [debug, setDebug] = useState(false);

  return (
    <DocsExample>
      <AmigaErrorBoundary show={debug} error={"#fdc000"}/>
      <h1>AmigaErrorBoundary Example</h1>
      <button onClick={() => setDebug(true)}>Show</button>
    </DocsExample>
  );
}
