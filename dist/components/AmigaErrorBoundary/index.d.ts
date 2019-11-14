import { Component } from "react";
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
    backgroundColor?: string;
    /**
     * Color of border and text
     *
     * @default #b00
     */
    color?: string;
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
export default class AmigaErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidCatch(a: any, b: any): void;
    render(): {} | null;
}
export {};
