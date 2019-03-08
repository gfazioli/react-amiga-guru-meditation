import * as React from "react";
import {Component} from "react";
import {createPortal} from "react-dom";
import styled from "styled-components";

const AmigaErrorBoundaryBase = styled.div`
  border: 6px solid #b00;
  background-color: #111;
  width: 100%;
  height: 120px;
  text-align: center;
`;

interface State {
  error?: any;
  errorInfo?: any;
}

interface Props {
  debug?:boolean;
}

function AmigaErrorBoundaryStyled() {
  return (
    <AmigaErrorBoundaryBase>
      <p>Software Failure. Press left mouse button to continue</p>
      <p>Guru meditation</p>
    </AmigaErrorBoundaryBase>
  );
}

export default class AmigaErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      errorInfo: false,
    };
  }

  componentDidCatch(a:any, b:any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: a,
      errorInfo: b
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.error || this.props.debug) {
      return createPortal(<AmigaErrorBoundaryStyled/>, document.getElementsByTagName("body")[0]);
    }

    return this.props.children;
  }
}
