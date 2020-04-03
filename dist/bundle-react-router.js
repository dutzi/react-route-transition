'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRouterDom = require('react-router-dom');

var listeners = [];
var TransitionContext = React__default.createContext({
    listeners: listeners,
    push: function (path, state) { return window.history.pushState(state, '', path); },
    location: window.location,
});
function TransitionProvider(_a) {
    var children = _a.children, push = _a.push, location = _a.location;
    return (React__default.createElement(TransitionContext.Provider, { value: { listeners: listeners, push: push, location: location } }, children));
}

function ReactRouterTransitionProvider(_a) {
    var children = _a.children;
    var history = reactRouterDom.useHistory();
    var location = reactRouterDom.useLocation();
    return (React__default.createElement(TransitionProvider, { push: history.push, location: location }, children));
}

function useTransition (options) {
    var listeners = React.useContext(TransitionContext).listeners;
    React.useLayoutEffect(function () {
        listeners.push.apply(listeners, options.handlers);
        return function () {
            options.handlers.forEach(function (listener) {
                listeners.splice(listeners.indexOf(listener));
            });
        };
    }, []);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function arrarizePath(pathOrPaths) {
    return typeof pathOrPaths === 'string' ? [pathOrPaths] : pathOrPaths !== null && pathOrPaths !== void 0 ? pathOrPaths : [];
}
function hasPath(pathOrPaths, path) {
    var pathsArray = arrarizePath(pathOrPaths);
    if (pathsArray.indexOf('*') !== -1) {
        return true;
    }
    return pathsArray.indexOf(path) !== -1;
}
function useTransitionHistory () {
    var _this = this;
    var _a = React.useContext(TransitionContext), listeners = _a.listeners, location = _a.location, push = _a.push;
    return {
        push: function (path, state) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(path !== location.pathname)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(listeners
                                .filter(function (listener) {
                                return hasPath(listener.path, location.pathname) ||
                                    (hasPath(listener.from, location.pathname) &&
                                        hasPath(listener.to, path));
                            })
                                .filter(function (listener) { return !!listener.onLeave; })
                                .map(function (listener) { return listener.onLeave(); }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        push(path, state);
                        if (!(path !== location.pathname)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(listeners
                                .filter(function (listener) {
                                return hasPath(listener.path, path) ||
                                    (hasPath(listener.from, location.pathname) &&
                                        hasPath(listener.to, path));
                            })
                                .filter(function (listener) { return !!listener.onEnter; })
                                .map(function (listener) { return listener.onEnter(); }))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); },
    };
}

exports.ReactRouterTransitionProvider = ReactRouterTransitionProvider;
exports.useTransition = useTransition;
exports.useTransitionHistory = useTransitionHistory;