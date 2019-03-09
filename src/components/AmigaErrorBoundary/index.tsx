import * as React from "react";
import {Component} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface Props {
  /**
   * Error
   */
  error?: any;
  /**
   * Error info
   */
  errorInfo?: any;
  /**
   * Background color
   *
   * @default #111
   */
  backgroundColor?:string;
  /**
   * Color of border and text
   *
   * @default #b00
   */
  color?:string;
  /**
   * Force the display
   *
   * @default false
   */
  show?: boolean;
}

interface State {
  catchError?: any;
  catchErrorInfo?: any;
  container?: any;
}

const AmigaErrorBoundaryBase = styled.div<Props>`
  position: relative;
  z-index: 9999;
  border: 6px solid ${p => p.backgroundColor || "#111"};
  background-color: ${p => p.backgroundColor || "#111"};
  min-height: 120px;
  text-align: center;
  color: ${p => p.color || "#b00"};
  font-family: "Times New Roman", Times, serif;
  font-weight: 400;
  font-size: 18px;

  @keyframes blink {
    50% {
      border-color: ${p => p.color || "#b00"};
    }
  }

  animation-name: blink;
  animation-duration: 0.5s;
  animation-timing-function: step-end;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

export default class AmigaErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      catchError: false,
      catchErrorInfo: false,
      container: null,
    };
  }

  public componentDidMount(): void {
    // check for any others amiga-guru containers
    const previous = document.getElementById("amiga-guru");
    if( previous ) {
      return this.setState({ container: previous });
    }

    // create a new container
    const c = document.createElement("div");
    c.id = "amiga-guru";
    const body = document.getElementsByTagName("body")[0];
    if (body) {
      body.insertBefore(c, document.body.firstChild);
    }
    this.setState({ container: c });
  }

  public componentWillUnmount(): void {
    const c = document.getElementById("amiga-guru");
    if (c) {
      c.remove();
    }
  }

  componentDidCatch(a: any, b: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      catchError: a,
      catchErrorInfo: b,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {

    const {catchError, catchErrorInfo} = this.state;
    const {show = false, error, errorInfo, ...others} = this.props;
    const pe = catchError || error;
    const pei = catchErrorInfo || errorInfo;

    if (this.state.container && (this.state.catchError || show)) {
      return createPortal(<AmigaErrorBoundaryStyled error={pe} errorInfo={pei} {...others} />, this.state.container);
    }

    return this.props.children || null;
  }
}

function AmigaErrorBoundaryStyled<Props>(props: any) {

  function AmigaErrorBoundaryDetails() {
    if(props.error.errorInfo) {
      return (
        <details>
          <pre>
            <code>
              {props.errorInfo.componentStack}
            </code>
          </pre>
        </details>
      );
    }
    return null;
  }

  return (
    <AmigaErrorBoundaryBase {...props}>
      <p>Software Failure. Press left mouse button to continue</p>
      <p>Guru meditation: {props.error.toString()}</p>
      <AmigaErrorBoundaryDetails />
    </AmigaErrorBoundaryBase>
  );
}
