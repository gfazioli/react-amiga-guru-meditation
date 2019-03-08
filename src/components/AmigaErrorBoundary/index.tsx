import * as React from "react";
import {Component} from "react";
import {createPortal} from "react-dom";

// const ToggleContainer = styled.label``;

interface State {
  error?: any;
  errorInfo?: any;
}

function AmigaErrorBoundaryStyled() {
  return <h1>Error</h1>;
}

export default class AmigaErrorBoundary extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      error: false,
      errorInfo: false,
    };
  }

  componentDidCatch() {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: "ops",
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.error) {
      return createPortal(<AmigaErrorBoundaryStyled/>, document.getElementsByTagName("body")[0]);
    }

    return this.props.children;
  }
}
