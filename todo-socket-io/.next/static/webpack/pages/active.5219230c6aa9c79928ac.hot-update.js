"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/active",{

/***/ "./components/Todos.js":
/*!*****************************!*\
  !*** ./components/Todos.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Todos; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/build/esm/index.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar _jsxFileName = \"/home/cherunnako/Sample Code/hands-on-nodejs/todo-socket-io/components/Todos.js\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\nvar pages = {\n  index: {\n    title: 'すべてのToDo'\n  },\n  active: {\n    title: '未完了のToDo',\n    completed: false\n  },\n  completed: {\n    title: '完了したToDo',\n    completed: true\n  }\n};\nvar pageLinks = Object.keys(pages).map(function (page, index) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n    href: \"/\".concat(page === 'index' ? '' : page),\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"a\", {\n      style: {\n        marginRight: 10\n      },\n      children: pages[page].title\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 14,\n      columnNumber: 9\n    }, _this)\n  }, index, false, {\n    fileName: _jsxFileName,\n    lineNumber: 13,\n    columnNumber: 5\n  }, _this);\n});\nfunction Todos(props) {\n  _s();\n\n  var _this2 = this;\n\n  var _pages$props$page = pages[props.page],\n      title = _pages$props$page.title,\n      completed = _pages$props$page.completed;\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),\n      todos = _useState[0],\n      setTodos = _useState[1];\n\n  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),\n      socket = _useState2[0],\n      setSocket = _useState2[1];\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_3__.io('/todos');\n    socket.on('todos', function (todos) {\n      setTodos(typeof completed === 'undefined' ? todos : todos.filter(function (todo) {\n        return todo.completed === completed;\n      }));\n    });\n    setSocket(socket);\n    console.log(\"pko\");\n    return function () {\n      return socket.close();\n    };\n  }, [props.page]);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"title\", {\n        children: title\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 41,\n        columnNumber: 17\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 40,\n      columnNumber: 13\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"h1\", {\n      children: title\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 43,\n      columnNumber: 13\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"label\", {\n      children: [\"\\u65B0\\u3057\\u3044ToDo\\u3092\\u5165\\u529B\", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"input\", {\n        onKeyPress: function onKeyPress(e) {\n          var title = e.target.value;\n\n          if (e.key !== 'Enter' || !title) {\n            return;\n          }\n\n          e.target.value = '';\n          socket.emit('createTodo', title);\n        }\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 46,\n        columnNumber: 17\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 13\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"ul\", {\n      children: todos.map(function (_ref) {\n        var id = _ref.id,\n            title = _ref.title,\n            completed = _ref.completed;\n        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"li\", {\n          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"label\", {\n            style: completed ? {\n              textDecoration: 'line-through'\n            } : {},\n            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"input\", {\n              type: \"checkbox\",\n              checked: completed,\n              onChange: function onChange(e) {\n                return socket.emit('updateCompleted', id, e.target.checked);\n              }\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 59,\n              columnNumber: 29\n            }, _this2), title]\n          }, void 0, true, {\n            fileName: _jsxFileName,\n            lineNumber: 58,\n            columnNumber: 25\n          }, _this2), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"button\", {\n            onClick: function onClick() {\n              return socket.emit('deleteTodo', id);\n            },\n            children: \"\\u524A\\u9664\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 68,\n            columnNumber: 25\n          }, _this2)]\n        }, id, true, {\n          fileName: _jsxFileName,\n          lineNumber: 57,\n          columnNumber: 21\n        }, _this2);\n      })\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 55,\n      columnNumber: 13\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"div\", {\n      children: pageLinks\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 72,\n      columnNumber: 13\n    }, this)]\n  }, void 0, true);\n}\n\n_s(Todos, \"3A5vuZwhNiK5sEp62o1HxwTagQA=\");\n\n_c = Todos;\n\nvar _c;\n\n$RefreshReg$(_c, \"Todos\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBcUNIOztHQXpEdUJNOztLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL1RvZG9zLmpzP2Q1MjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0ICogYXMgSU8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCdcblxuY29uc3QgcGFnZXMgPSB7XG4gICAgaW5kZXg6IHsgdGl0bGU6ICfjgZnjgbnjgabjga5Ub0RvJ30sXG4gICAgYWN0aXZlOiB7dGl0bGU6ICfmnKrlrozkuobjga5Ub0RvJywgY29tcGxldGVkOiBmYWxzZX0sXG4gICAgY29tcGxldGVkOiB7dGl0bGU6ICflrozkuobjgZfjgZ9Ub0RvJywgY29tcGxldGVkOiB0cnVlfVxufVxuXG5jb25zdCBwYWdlTGlua3MgPSBPYmplY3Qua2V5cyhwYWdlcykubWFwKChwYWdlLCBpbmRleCkgPT4gXG4gICAgPExpbmsgaHJlZj17YC8ke3BhZ2UgPT09ICdpbmRleCcgPyAnJyA6IHBhZ2V9YH0ga2V5PXtpbmRleH0+XG4gICAgICAgIDxhIHN0eWxlPXt7bWFyZ2luUmlnaHQ6IDEwIH19PntwYWdlc1twYWdlXS50aXRsZX08L2E+XG4gICAgPC9MaW5rPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUb2Rvcyhwcm9wcykge1xuICAgIGNvbnN0IHsgdGl0bGUsIGNvbXBsZXRlZCB9ID0gcGFnZXNbcHJvcHMucGFnZV1cbiAgICBjb25zdCBbdG9kb3MsIHNldFRvZG9zXSA9IHVzZVN0YXRlKFtdKVxuXG4gICAgY29uc3QgW3NvY2tldCwgc2V0U29ja2V0XSA9IHVzZVN0YXRlKClcbiAgICBcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBzb2NrZXQgPSBJTy5pbygnL3RvZG9zJylcbiAgICAgICAgc29ja2V0Lm9uKCd0b2RvcycsIHRvZG9zID0+IHtcbiAgICAgICAgICAgIHNldFRvZG9zKFxuICAgICAgICAgICAgICAgIHR5cGVvZiBjb21wbGV0ZWQgPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgPyB0b2Rvc1xuICAgICAgICAgICAgICAgIDogdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5jb21wbGV0ZWQgPT09IGNvbXBsZXRlZClcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgICAgc2V0U29ja2V0KHNvY2tldClcbiAgICAgICAgY29uc29sZS5sb2coXCJwa29cIilcbiAgICAgICAgcmV0dXJuICgpID0+IHNvY2tldC5jbG9zZSgpXG4gICAgfSwgW3Byb3BzLnBhZ2VdKVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDx0aXRsZT57dGl0bGV9PC90aXRsZT5cbiAgICAgICAgICAgIDwvSGVhZD5cbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICDmlrDjgZfjgYRUb0Rv44KS5YWl5YqbXG4gICAgICAgICAgICAgICAgPGlucHV0IG9uS2V5UHJlc3M9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleSAhPT0gJ0VudGVyJyB8fCAhdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJydcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2NyZWF0ZVRvZG8nLCB0aXRsZSlcbiAgICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIHt0b2Rvcy5tYXAoKHtpZCwgdGl0bGUsIGNvbXBsZXRlZH0pID0+IFxuICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgc3R5bGU9e2NvbXBsZXRlZCA/IHt0ZXh0RGVjb3JhdGlvbjogJ2xpbmUtdGhyb3VnaCd9IDoge319PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb21wbGV0ZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3VwZGF0ZUNvbXBsZXRlZCcsIGlkLCBlLnRhcmdldC5jaGVja2VkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzb2NrZXQuZW1pdCgnZGVsZXRlVG9kbycsIGlkKX0+5YmK6ZmkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8ZGl2PntwYWdlTGlua3N9PC9kaXY+XG4gICAgICAgIDwvPlxuICAgIClcbn0iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJMaW5rIiwiSGVhZCIsIklPIiwicGFnZXMiLCJpbmRleCIsInRpdGxlIiwiYWN0aXZlIiwiY29tcGxldGVkIiwicGFnZUxpbmtzIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsInBhZ2UiLCJtYXJnaW5SaWdodCIsIlRvZG9zIiwicHJvcHMiLCJ0b2RvcyIsInNldFRvZG9zIiwic29ja2V0Iiwic2V0U29ja2V0IiwiaW8iLCJvbiIsImZpbHRlciIsInRvZG8iLCJjb25zb2xlIiwibG9nIiwiY2xvc2UiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJrZXkiLCJlbWl0IiwiaWQiLCJ0ZXh0RGVjb3JhdGlvbiIsImNoZWNrZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Todos.js\n");

/***/ })

});