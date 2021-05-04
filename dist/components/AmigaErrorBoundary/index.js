"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var styled_components_1 = __importDefault(require("styled-components"));
var AmigaErrorBoundaryBase = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  z-index: 9999;\n  border: 6px solid ", ";\n  background-color: ", ";\n  min-height: 120px;\n  text-align: center;\n  color: ", ";\n  font-family: \"Times New Roman\", Times, serif;\n  font-weight: 400;\n  font-size: 18px;\n\n  @keyframes blink {\n    50% {\n      border-color: ", ";\n    }\n  }\n\n  animation-name: blink;\n  animation-duration: 0.5s;\n  animation-timing-function: step-end;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n"], ["\n  position: relative;\n  z-index: 9999;\n  border: 6px solid ", ";\n  background-color: ", ";\n  min-height: 120px;\n  text-align: center;\n  color: ", ";\n  font-family: \"Times New Roman\", Times, serif;\n  font-weight: 400;\n  font-size: 18px;\n\n  @keyframes blink {\n    50% {\n      border-color: ", ";\n    }\n  }\n\n  animation-name: blink;\n  animation-duration: 0.5s;\n  animation-timing-function: step-end;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n"])), function (p) { return p.backgroundColor || "#111"; }, function (p) { return p.backgroundColor || "#111"; }, function (p) { return p.color || "#b00"; }, function (p) { return p.color || "#b00"; });
var AmigaErrorBoundary = /** @class */ (function (_super) {
    __extends(AmigaErrorBoundary, _super);
    function AmigaErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            catchError: false,
            catchErrorInfo: false,
            container: null,
        };
        return _this;
    }
    AmigaErrorBoundary.prototype.componentDidMount = function () {
        // check for any others amiga-guru containers
        var previous = document.getElementById("amiga-guru");
        if (previous) {
            return this.setState({ container: previous });
        }
        // create a new container
        var c = document.createElement("div");
        c.id = "amiga-guru";
        var body = document.getElementsByTagName("body")[0];
        if (body) {
            body.insertBefore(c, document.body.firstChild);
        }
        this.setState({ container: c });
    };
    AmigaErrorBoundary.prototype.componentWillUnmount = function () {
        var c = document.getElementById("amiga-guru");
        if (c) {
            c.remove();
        }
    };
    AmigaErrorBoundary.prototype.componentDidCatch = function (a, b) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            catchError: a,
            catchErrorInfo: b,
        });
        // You can also log error messages to an error reporting service here
    };
    AmigaErrorBoundary.prototype.render = function () {
        var _a = this.state, catchError = _a.catchError, catchErrorInfo = _a.catchErrorInfo;
        var _b = this.props, _c = _b.show, show = _c === void 0 ? false : _c, error = _b.error, errorInfo = _b.errorInfo, others = __rest(_b, ["show", "error", "errorInfo"]);
        var pe = catchError || error;
        var pei = catchErrorInfo || errorInfo;
        if (this.state.container && (this.state.catchError || show)) {
            return react_dom_1.createPortal(React.createElement(AmigaErrorBoundaryStyled, __assign({ error: pe, errorInfo: pei }, others)), this.state.container);
        }
        return this.props.children || null;
    };
    return AmigaErrorBoundary;
}(react_1.Component));
exports.default = AmigaErrorBoundary;
function AmigaErrorBoundaryStyled(props) {
    function AmigaErrorBoundaryDetails() {
        if (props.error.errorInfo) {
            return (React.createElement("details", null,
                React.createElement("pre", null,
                    React.createElement("code", null, props.errorInfo.componentStack))));
        }
        return null;
    }
    return (React.createElement(AmigaErrorBoundaryBase, __assign({}, props),
        React.createElement("p", null, "Software Failure. Press left mouse button to continue"),
        React.createElement("p", null,
            "Guru meditation: ",
            props.error.toString()),
        React.createElement(AmigaErrorBoundaryDetails, null)));
}
var templateObject_1;
//# sourceMappingURL=index.js.map